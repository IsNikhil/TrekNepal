'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SlidersHorizontal, Grid3X3, Map as MapIcon, Search, X, ChevronDown, Mountain } from 'lucide-react';
import TrailCard, { TrailCardModel } from '@/components/TrailCard';
import { ApiTrail, fetchTrails } from '@/lib/api';
import clsx from 'clsx';

// Dynamic import to avoid SSR issue with Leaflet
const TrailMap = dynamic(() => import('@/components/TrailMap'), { ssr: false });

type ViewMode = 'grid' | 'map' | 'split';
type Difficulty = 'easy' | 'moderate' | 'hard' | 'expert';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80';

function toTrailCardModel(trail: ApiTrail): TrailCardModel {
  return {
    id: trail.id,
    name: trail.name,
    region: trail.region,
    difficulty: trail.difficulty,
    lat: trail.lat,
    lng: trail.lng,
    distance: trail.distance_km,
    duration: `${trail.duration_days} days`,
    maxElevation: trail.max_elevation_m,
    rating: trail.rating,
    reviewCount: trail.review_count,
    image: FALLBACK_IMAGE,
    tags: trail.tags,
  };
}

const DIFFICULTY_OPTIONS: { value: Difficulty | 'all'; label: string; color: string }[] = [
  { value: 'all', label: 'All', color: 'border-gray-300 text-gray-700' },
  { value: 'easy', label: 'Easy', color: 'border-green-300 text-green-700 bg-green-50' },
  { value: 'moderate', label: 'Moderate', color: 'border-blue-300 text-blue-700 bg-blue-50' },
  { value: 'hard', label: 'Hard', color: 'border-orange-300 text-orange-700 bg-orange-50' },
  { value: 'expert', label: 'Expert', color: 'border-red-300 text-red-700 bg-red-50' },
];

const REGION_OPTIONS = ['All Regions', 'Khumbu / Solukhumbu', 'Annapurna / Gandaki', 'Langtang / Rasuwa', 'Gorkha / Mansiri', 'Mustang / Gandaki'];

const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'distance', label: 'Distance: Short → Long' },
  { value: 'elevation', label: 'Elevation: Low → High' },
  { value: 'reviews', label: 'Most Reviewed' },
];

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [region, setRegion] = useState('All Regions');
  const [sortBy, setSortBy] = useState('rating');
  const [maxDays, setMaxDays] = useState(30);
  const [showFilters, setShowFilters] = useState(false);
  const [total, setTotal] = useState(0);
  const [trails, setTrails] = useState<TrailCardModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTrails() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchTrails({
          limit: 100,
          offset: 0,
          q: query.trim() || undefined,
          difficulty: difficulty !== 'all' ? difficulty : undefined,
          region: region !== 'All Regions' ? region : undefined,
          max_days: maxDays < 30 ? maxDays : undefined,
          sort_by: sortBy as 'rating' | 'distance' | 'elevation' | 'reviews',
        });

        if (!cancelled) {
          setTotal(response.total);
          setTrails(response.trails.map(toTrailCardModel));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load trails');
          setTotal(0);
          setTrails([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTrails();
    return () => {
      cancelled = true;
    };
  }, [query, difficulty, region, maxDays, sortBy]);

  const clearFilters = () => {
    setQuery('');
    setDifficulty('all');
    setRegion('All Regions');
    setSortBy('rating');
    setMaxDays(30);
  };

  const hasActiveFilters = query || difficulty !== 'all' || region !== 'All Regions' || maxDays < 30;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">

      {/* ===== TOP BAR ===== */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center gap-3">

          {/* Search */}
          <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search trails, regions, tags..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
            {query && (
              <button onClick={() => setQuery('')}>
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Difficulty pills */}
          <div className="hidden sm:flex gap-1.5">
            {DIFFICULTY_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setDifficulty(opt.value)}
                className={clsx(
                  'text-xs font-medium px-3 py-1.5 rounded-full border transition-all',
                  difficulty === opt.value
                    ? opt.color + ' border-current'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Region select */}
          <div className="relative hidden md:block">
            <select
              value={region}
              onChange={e => setRegion(e.target.value)}
              className="appearance-none text-sm border border-gray-200 rounded-full px-4 py-2 pr-8 bg-white text-gray-700 focus:outline-none focus:border-trek-400 cursor-pointer"
            >
              {REGION_OPTIONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative hidden md:block">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none text-sm border border-gray-200 rounded-full px-4 py-2 pr-8 bg-white text-gray-700 focus:outline-none focus:border-trek-400 cursor-pointer"
            >
              {SORT_OPTIONS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={clsx(
              'md:hidden flex items-center gap-1.5 text-sm px-3 py-2 rounded-full border transition-all',
              showFilters ? 'bg-trek-600 text-white border-trek-600' : 'border-gray-200 text-gray-600'
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-orange-400" />}
          </button>

          {/* Clear */}
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-700 font-medium">
              Clear filters
            </button>
          )}

          {/* View mode toggle */}
          <div className="flex items-center bg-gray-100 rounded-full p-1 gap-0.5 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={clsx('p-1.5 rounded-full transition-all', viewMode === 'grid' ? 'bg-white shadow text-trek-600' : 'text-gray-500 hover:text-gray-700')}
              title="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={clsx('p-1.5 rounded-full transition-all', viewMode === 'split' ? 'bg-white shadow text-trek-600' : 'text-gray-500 hover:text-gray-700')}
              title="Split view"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={clsx('p-1.5 rounded-full transition-all', viewMode === 'map' ? 'bg-white shadow text-trek-600' : 'text-gray-500 hover:text-gray-700')}
              title="Map view"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile filter panel */}
        {showFilters && (
          <div className="md:hidden mt-3 border-t pt-3 flex flex-col gap-3">
            <div className="flex flex-wrap gap-1.5">
              {DIFFICULTY_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setDifficulty(opt.value)}
                  className={clsx(
                    'text-xs font-medium px-3 py-1.5 rounded-full border',
                    difficulty === opt.value ? opt.color : 'border-gray-200 text-gray-500'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <select
                value={region}
                onChange={e => setRegion(e.target.value)}
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
              >
                {REGION_OPTIONS.map(r => <option key={r}>{r}</option>)}
              </select>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
              >
                {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium">Max duration: {maxDays} days</label>
              <input
                type="range"
                min={3}
                max={30}
                value={maxDays}
                onChange={e => setMaxDays(Number(e.target.value))}
                className="w-full mt-1 accent-trek-600"
              />
            </div>
          </div>
        )}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-1 overflow-hidden">

        {/* Trail list */}
        {(viewMode === 'grid' || viewMode === 'split') && (
          <div className={clsx(
            'overflow-y-auto',
            viewMode === 'split' ? 'w-[480px] flex-shrink-0 border-r border-gray-100' : 'flex-1'
          )}>
            <div className="p-4">
              <p className="text-xs text-gray-500 font-medium mb-4">
                {total} trail{total !== 1 ? 's' : ''} found
              </p>
              <div className={clsx(
                'grid gap-4',
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
              )}>
                {loading ? (
                  <div className="col-span-full text-center py-16 text-gray-400">
                    <p className="font-medium">Loading trails...</p>
                  </div>
                ) : error ? (
                  <div className="col-span-full text-center py-16 text-red-500">
                    <p className="font-medium">Failed to load trails</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                ) : trails.length > 0 ? (
                  trails.map(trail => (
                    <TrailCard key={trail.id} trail={trail} variant={viewMode === 'split' ? 'compact' : 'default'} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16 text-gray-400">
                    <Mountain className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No trails match your filters</p>
                    <button onClick={clearFilters} className="mt-2 text-trek-600 text-sm hover:underline">Clear filters</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Map panel */}
        {(viewMode === 'map' || viewMode === 'split') && (
          <div className="flex-1 relative">
            <TrailMap trails={trails} height="100%" />
          </div>
        )}
      </div>
    </div>
  );
}

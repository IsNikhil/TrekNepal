import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft, Star, Clock, TrendingUp, ArrowUp, MapPin,
  Shield, Home, Ticket, CalendarCheck, Flag, ThumbsUp,
  AlertTriangle, Phone, ChevronRight,
} from 'lucide-react';
import { trails, difficultyColors, difficultyLabel } from '@/data/trails';
import clsx from 'clsx';

// SSR-disabled map and chart components
const TrailMap = dynamic(() => import('@/components/TrailMap'), { ssr: false });
const ElevationChart = dynamic(() => import('@/components/ElevationChart'), { ssr: false });

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return trails.map(t => ({ id: t.id }));
}

export default function TrailDetailPage({ params }: PageProps) {
  const trail = trails.find(t => t.id === params.id);
  if (!trail) notFound();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== HERO IMAGE HEADER ===== */}
      <div className="relative h-80 md:h-[420px] overflow-hidden">
        <Image
          src={trail.image}
          alt={trail.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        {/* Back link */}
        <Link
          href="/explore"
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur border border-white/30 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className={clsx(
                'text-xs font-bold px-3 py-1 rounded-full border bg-white/90',
                difficultyColors[trail.difficulty]
              )}>
                {difficultyLabel[trail.difficulty]}
              </span>
              {trail.tags.slice(0,3).map(tag => (
                <span key={tag} className="text-xs text-white/80 bg-white/15 px-2.5 py-1 rounded-full border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{trail.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-white/90">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{trail.region}, Nepal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* ===== QUICK STATS ROW ===== */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { icon: TrendingUp, label: 'Distance', value: `${trail.distance} km` },
            { icon: Clock, label: 'Duration', value: trail.duration },
            { icon: ArrowUp, label: 'Max Elevation', value: `${trail.maxElevation.toLocaleString()} m` },
            { icon: Flag, label: 'Elevation Gain', value: `+${trail.elevationGain.toLocaleString()} m` },
            { icon: Star, label: 'Rating', value: `${trail.rating} (${trail.reviewCount.toLocaleString()})` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="w-8 h-8 bg-trek-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon className="w-4 h-4 text-trek-600" />
              </div>
              <div className="text-xs text-gray-500 font-medium mb-0.5">{label}</div>
              <div className="font-bold text-gray-900 text-sm">{value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ===== LEFT COLUMN (2/3) ===== */}
          <div className="lg:col-span-2 space-y-8">

            {/* Description */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About this Trek</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{trail.longDescription}</p>
            </section>

            {/* Map */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Route Map</h2>
              <div className="rounded-xl overflow-hidden">
                <TrailMap trail={trail} height="380px" />
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                <span><span className="font-semibold text-trek-600">Start:</span> {trail.startPoint}</span>
                <span><span className="font-semibold text-earth-600">End:</span> {trail.endPoint}</span>
              </div>
            </section>

            {/* Elevation Profile */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Elevation Profile</h2>
              <p className="text-sm text-gray-500 mb-4">Max elevation: {trail.maxElevation.toLocaleString()}m | Gain: +{trail.elevationGain.toLocaleString()}m</p>
              <ElevationChart data={trail.elevationProfile} maxElevation={trail.maxElevation} />
            </section>

            {/* Highlights */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                <ThumbsUp className="w-5 h-5 inline mr-2 text-trek-600" />
                Trail Highlights
              </h2>
              <ul className="space-y-3">
                {trail.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-trek-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-trek-700 text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-sm leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Lodges */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                <Home className="w-5 h-5 inline mr-2 text-trek-600" />
                Tea Houses & Lodges
              </h2>
              <div className="space-y-3">
                {trail.lodges.map((lodge) => (
                  <div key={lodge.name} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{lodge.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{lodge.elevation.toLocaleString()}m elevation</div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {lodge.amenities.map(a => (
                        <span key={a} className="text-[10px] bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{a}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">
                  Trekker Reviews
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={clsx(
                        'w-4 h-4',
                        i <= Math.round(trail.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                      )} />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">{trail.rating}</span>
                  <span className="text-sm text-gray-400">({trail.reviewCount.toLocaleString()} reviews)</span>
                </div>
              </div>

              <div className="space-y-5">
                {trail.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-50 pb-5 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-trek-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-gray-900">{review.user}</span>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className={clsx('w-3 h-3', i <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200')} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mt-1.5">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full py-2.5 border-2 border-trek-200 text-trek-700 font-semibold rounded-xl hover:bg-trek-50 transition-colors text-sm">
                Write a Review
              </button>
            </section>
          </div>

          {/* ===== RIGHT SIDEBAR (1/3) ===== */}
          <div className="space-y-5">

            {/* CTA card */}
            <div className="bg-trek-600 text-white rounded-2xl p-5 sticky top-20">
              <h3 className="font-bold text-lg mb-1">Plan this Trek</h3>
              <p className="text-trek-100 text-sm mb-4">Save route, download offline maps, get permit info</p>
              <button className="w-full bg-white text-trek-700 font-bold py-3 rounded-xl hover:bg-trek-50 transition-colors mb-2">
                Save to My Treks
              </button>
              <button className="w-full border border-white/40 text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
                Download Offline Map
              </button>
            </div>

            {/* Permits */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-trek-600" />
                Required Permits
              </h3>
              <ul className="space-y-2">
                {trail.permits.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                    <ChevronRight className="w-4 h-4 text-trek-400 mt-0.5 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Season */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-trek-600" />
                Best Season
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((month) => {
                  const full = month === 'Jan' ? 'January' : month === 'Feb' ? 'February' : month === 'Mar' ? 'March' : month === 'Apr' ? 'April' : month === 'May' ? 'May' : month === 'Jun' ? 'June' : month === 'Jul' ? 'July' : month === 'Aug' ? 'August' : month === 'Sep' ? 'September' : month === 'Oct' ? 'October' : month === 'Nov' ? 'November' : 'December';
                  const isGood = trail.bestSeason.includes(full);
                  return (
                    <span
                      key={month}
                      className={clsx(
                        'text-xs px-2 py-1 rounded-full font-medium',
                        isGood
                          ? 'bg-trek-100 text-trek-700 border border-trek-200'
                          : 'bg-gray-50 text-gray-400 border border-gray-100'
                      )}
                    >
                      {month}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Emergency / Safety */}
            <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
              <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Emergency Information
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">Nearest Hospital</div>
                  <div className="text-red-900">{trail.emergency.nearestHospital}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">Helicopter Landing Zones</div>
                  <div className="flex flex-wrap gap-1.5">
                    {trail.emergency.helicopterLandingZones.map(z => (
                      <span key={z} className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">{z}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-red-100">
                  <div className="flex items-center gap-2 text-red-900 font-medium">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs">{trail.emergency.emergencyContact}</span>
                  </div>
                </div>
              </div>
              <Link href="/safety" className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-800">
                <AlertTriangle className="w-3.5 h-3.5" />
                Full Safety Guide
              </Link>
            </div>

            {/* Similar trails */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Similar Treks</h3>
              <div className="space-y-3">
                {trails
                  .filter(t => t.id !== trail.id && t.difficulty === trail.difficulty)
                  .slice(0, 2)
                  .map(t => (
                    <Link key={t.id} href={`/trails/${t.id}`} className="flex items-center gap-3 group">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <Image src={t.image} alt={t.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900 truncate group-hover:text-trek-600">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.duration} · {t.distance}km</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-trek-500" />
                    </Link>
                  ))}
                <Link href="/explore" className="text-sm text-trek-600 font-medium hover:underline flex items-center gap-1 mt-1">
                  View all similar <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

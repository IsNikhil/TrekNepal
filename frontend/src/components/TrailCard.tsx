import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, TrendingUp, ArrowUp, MapPin } from 'lucide-react';
import { Trail, difficultyColors, difficultyLabel } from '@/data/trails';
import clsx from 'clsx';

interface Props {
  trail: Trail;
  variant?: 'default' | 'compact';
}

export default function TrailCard({ trail, variant = 'default' }: Props) {
  const isCompact = variant === 'compact';

  return (
    <Link href={`/trails/${trail.id}`} className="trail-card group block">
      {/* Image */}
      <div className={clsx('relative overflow-hidden', isCompact ? 'h-40' : 'h-52')}>
        <Image
          src={trail.image}
          alt={trail.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Difficulty badge */}
        <div className="absolute top-3 left-3">
          <span className={clsx(
            'text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm bg-white/90',
            difficultyColors[trail.difficulty]
          )}>
            {difficultyLabel[trail.difficulty]}
          </span>
        </div>
        {/* Rating overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          {trail.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
          <MapPin className="w-3 h-3" />
          {trail.region}
        </div>

        {/* Name */}
        <h3 className={clsx(
          'font-bold text-gray-900 group-hover:text-trek-700 transition-colors leading-snug mb-3',
          isCompact ? 'text-sm' : 'text-base'
        )}>
          {trail.name}
        </h3>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-trek-500" />
            {trail.duration}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-trek-500" />
            {trail.distance} km
          </span>
          <span className="flex items-center gap-1">
            <ArrowUp className="w-3.5 h-3.5 text-trek-500" />
            {trail.maxElevation.toLocaleString()}m
          </span>
        </div>

        {/* Reviews */}
        {!isCompact && (
          <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star
                  key={i}
                  className={clsx('w-3.5 h-3.5', i <= Math.round(trail.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200')}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({trail.reviewCount.toLocaleString()})</span>
            </div>
            <div className="flex gap-1.5 flex-wrap justify-end">
              {trail.tags.slice(0,2).map(tag => (
                <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

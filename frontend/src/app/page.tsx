import Link from 'next/link';
import Image from 'next/image';
import {
  Mountain, Search, Shield, Users, Star, ArrowRight,
  Zap, Map, Wind, Smartphone,
} from 'lucide-react';
import TrailCard from '@/components/TrailCard';
import { trails } from '@/data/trails';

const featuredTrails = trails.slice(0, 3);
const stats = [
  { label: 'Trekking Routes', value: '120+' },
  { label: 'Verified Reviews', value: '15,000+' },
  { label: 'Active Trekkers', value: '50,000+' },
  { label: 'Mountain Peaks', value: '1,310' },
];

const features = [
  {
    icon: Map,
    title: 'Interactive Topo Maps',
    desc: 'OpenTopoMap integration with offline tile support. Know exactly where you are, always.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Shield,
    title: 'Safety Hub & SOS',
    desc: 'One-tap emergency alert with GPS, altitude warnings, AMS checklist, and helicopter contacts.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Wind,
    title: 'Weather Intelligence',
    desc: 'Hyperlocal forecasts cached for offline use. Know conditions at every camp before you go.',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Zap,
    title: 'AI Sherpa Guide',
    desc: 'LLM-powered trekking assistant with local knowledge, multi-language support, and real-time coaching.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Users,
    title: 'Community Reports',
    desc: 'Live trail conditions from fellow trekkers: landslides, snow, lodge closures, and hazard zones.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Smartphone,
    title: 'Offline First',
    desc: 'Download maps, lodges, emergency contacts, and route data. Works without any signal.',
    color: 'bg-trek-50 text-trek-600',
  },
];

const regions = [
  { name: 'Everest Region', count: 12, img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80', id: 'everest' },
  { name: 'Annapurna Region', count: 18, img: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=400&q=80', id: 'annapurna' },
  { name: 'Langtang Region', count: 8, img: 'https://images.unsplash.com/photo-1571985887039-1e5ebcdfc3e5?w=400&q=80', id: 'langtang' },
  { name: 'Mustang Region', count: 6, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', id: 'mustang' },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80"
            alt="Himalayan mountains Nepal"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Mountain className="w-4 h-4 text-trek-300" />
            Nepal's #1 Trekking Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            Your Himalayan
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-trek-300 to-trek-500">
              Adventure Awaits
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore 120+ verified trekking routes across Nepal — with offline maps, real-time safety alerts,
            and an AI guide trained on Himalayan expertise.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
            <div className="flex-1 flex items-center gap-3 bg-white rounded-full px-5 py-3.5 shadow-xl">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search trails, regions, peaks..."
                className="flex-1 outline-none text-gray-700 text-sm bg-transparent"
              />
            </div>
            <Link href="/explore" className="btn-primary text-sm flex items-center justify-center gap-2 !rounded-full">
              Explore Trails
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {['Everest Base Camp', 'Annapurna Circuit', 'Poon Hill', 'Manaslu Circuit'].map((name) => (
              <Link
                key={name}
                href={`/trails/${name.toLowerCase().replace(/ /g, '-').replace(/circuit|base camp|sunrise trek/g, '').trim().replace(/ +/g, '-')}`}
                className="bg-white/15 backdrop-blur hover:bg-white/25 text-white border border-white/20 rounded-full px-4 py-1.5 transition-all"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-trek-600 py-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold">{value}</div>
                <div className="text-trek-200 text-sm font-medium mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED TRAILS ===== */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-trek-600 font-semibold text-sm uppercase tracking-wide mb-2">Top Rated</p>
            <h2 className="section-title">Iconic Nepal Treks</h2>
            <p className="text-gray-500 mt-2 max-w-xl">
              Verified routes with GPS data, lodge information, permit guides, and thousands of community reviews.
            </p>
          </div>
          <Link href="/explore" className="btn-outline flex items-center gap-2 self-start md:self-auto whitespace-nowrap">
            View all trails
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrails.map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </div>
      </section>

      {/* ===== REGIONS ===== */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-trek-600 font-semibold text-sm uppercase tracking-wide mb-2">Discover Nepal</p>
            <h2 className="section-title">Explore by Region</h2>
            <p className="text-gray-500 mt-2">From the Khumbu to Mustang — every corner of Nepal has a story.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regions.map(({ name, count, img }) => (
              <Link
                key={name}
                href="/explore"
                className="group relative h-52 rounded-2xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={img}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="font-bold text-base leading-tight">{name}</div>
                  <div className="text-xs text-gray-300 mt-0.5">{count} routes</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-trek-600 font-semibold text-sm uppercase tracking-wide mb-2">Why TrekNepal</p>
          <h2 className="section-title">Built for the Himalayas</h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Every feature is designed for Nepal's unique terrain, altitude, and connectivity challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-trek-600 font-semibold text-sm uppercase tracking-wide mb-2">Trekker Stories</p>
            <h2 className="section-title">Trusted by the Community</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trails.slice(0, 3).flatMap(t => t.reviews.slice(0,1)).map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-trek-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{review.user}</div>
                    <div className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{review.comment.slice(0, 120)}...&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-trek-700 via-trek-600 to-trek-800" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white, transparent 60%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <Mountain className="w-16 h-16 mx-auto mb-6 text-trek-200" />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Ready to Start Your Trek?
          </h2>
          <p className="text-trek-100 text-lg mb-8 max-w-xl mx-auto">
            Join 50,000+ trekkers who plan, navigate, and share their Himalayan adventures on TrekNepal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore" className="bg-white text-trek-700 font-bold px-8 py-4 rounded-full hover:bg-trek-50 transition-colors shadow-lg">
              Explore Trails
            </Link>
            <Link href="/signup" className="border-2 border-white/60 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

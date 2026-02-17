import Link from 'next/link';
import { Mountain, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-trek-600 rounded-xl flex items-center justify-center">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TrekNepal</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Nepal's most accurate and intelligent trekking companion. Safety-first, community-powered.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-trek-600 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-trek-600 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-trek-600 flex items-center justify-center transition-colors">
                <Github className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {['Everest Region', 'Annapurna Region', 'Langtang Region', 'Mustang Region', 'Manaslu Region'].map(r => (
                <li key={r}><Link href="/explore" className="hover:text-white transition-colors">{r}</Link></li>
              ))}
            </ul>
          </div>

          {/* Plan */}
          <div>
            <h4 className="text-white font-semibold mb-4">Plan & Prepare</h4>
            <ul className="space-y-2 text-sm">
              {['Permit Guide', 'Best Season', 'Packing Lists', 'Altitude Safety', 'Tea House Guide', 'Budget Calculator'].map(r => (
                <li key={r}><Link href="/guides" className="hover:text-white transition-colors">{r}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Safety Hub', 'Partner with Us', 'For Agencies', 'Press', 'Careers'].map(r => (
                <li key={r}><a href="#" className="hover:text-white transition-colors">{r}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; 2026 TrekNepal. Made with care in Kathmandu.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

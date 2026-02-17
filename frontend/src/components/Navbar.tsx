'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mountain, Search, Menu, X, Shield, Map, Users, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/explore', label: 'Explore Trails', icon: Map },
    { href: '/safety', label: 'Safety Hub', icon: Shield },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/guides', label: 'Trail Guides', icon: BookOpen },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-trek-600 rounded-xl flex items-center justify-center group-hover:bg-trek-700 transition-colors">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Trek<span className="text-trek-600">Nepal</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-trek-600 hover:bg-trek-50 rounded-lg transition-all"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/explore"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-full hover:border-gray-300 transition-all"
            >
              <Search className="w-4 h-4" />
              Search trails
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="btn-primary text-sm !py-2 !px-5"
            >
              Sign up free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-trek-50 hover:text-trek-700"
              onClick={() => setMobileOpen(false)}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
          <div className="pt-3 flex gap-2">
            <Link href="/login" className="flex-1 text-center py-2 border border-gray-200 rounded-full text-sm font-medium">Log in</Link>
            <Link href="/signup" className="flex-1 text-center py-2 bg-trek-600 text-white rounded-full text-sm font-medium">Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

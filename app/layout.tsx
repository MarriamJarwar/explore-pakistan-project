'use client';

import React, { useState } from 'react';
import { Compass, Menu, X, Heart, MapPin, Phone, Mail } from 'lucide-react';
import './globals.css'; // Sahi path jo compiler ko error nahi dega aur styles load karega!

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col justify-between">
        
        {/* Global Navigation Bar */}
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-emerald-600 p-2 rounded-xl text-white">
                <Compass className="w-5 h-5 animate-pulse" />
              </div>
              <span className="font-black text-xl tracking-tight text-slate-950">
                Explore<span className="text-emerald-600">Pakistan</span>
              </span>
            </div>

            {/* Desktop Menu Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-semibold text-emerald-700 hover:text-emerald-600 transition-colors">
                Home
              </a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
                Destinations
              </a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
                About Us
              </a>
              <a href="#" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
                Contact
              </a>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95">
                Book a Trip
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Links */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-slate-100 px-6 py-4 flex flex-col gap-4">
              <a href="#" className="text-sm font-bold text-emerald-700">Home</a>
              <a href="#" className="text-sm font-bold text-slate-600 hover:text-emerald-600">Destinations</a>
              <a href="#" className="text-sm font-bold text-slate-600 hover:text-emerald-600">About Us</a>
              <a href="#" className="text-sm font-bold text-slate-600 hover:text-emerald-600">Contact</a>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md mt-2">
                Book a Trip
              </button>
            </div>
          )}
        </nav>

        {/* Main Content Area */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Column 1: Intro */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="font-black text-lg text-white tracking-tight">
                  Explore<span className="text-emerald-400">Pakistan</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">
                Pakistan ke haseen tareen maqamaat ko dunya ke samne pesh karne aur aapke safar ko asan banane ke liye aik chota sa koshish.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Safar Plan Karein</h4>
              <ul className="flex flex-col gap-2.5 text-xs">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Northern Areas</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Historical Places</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Travel Guides</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">AI Chatbot Assistant</a></li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Contact Details</h4>
              <ul className="flex flex-col gap-3 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>University Campus, Pakistan</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>support@explorepakistan.pk</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>+92 300 1234567</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Subscribe Karein</h4>
              <p className="text-xs text-slate-400 mb-3">Naye travel packages aur discounts ki updates hasil karein.</p>
              <div className="flex gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
                <input 
                  type="email" 
                  placeholder="Email address..." 
                  className="bg-transparent text-xs text-slate-300 px-2.5 py-1.5 outline-none border-none w-full"
                  disabled
                />
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-md transition-colors shrink-0">
                  Join
                </button>
              </div>
            </div>

          </div>

          {/* Bottom copyright line */}
          <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-slate-900 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Explore Pakistan Travel Portal. All Rights Reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for AI Class Project under Ma'am Mahnoor.
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}
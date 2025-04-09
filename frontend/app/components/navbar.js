"use client";
import Link from "next/link";
import { useState } from 'react';

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false);

    return (
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo/Brand */}
            <div className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
              StockSim
            </div>
            
            {/* Desktop Navigation - hidden on mobile */}
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/stock" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Stock
              </Link>
              <Link 
                href="/portfolio" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Portfolio
              </Link>
            </div>
  
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
  
          {/* Mobile Navigation - shown when toggled */}
          {isOpen && (
            <div className="md:hidden mt-2 pb-3 space-y-2">
              <Link 
                href="/" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/stock" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Stock
              </Link>
              <Link 
                href="/portfolio" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>
            </div>
          )}
        </div>
      </nav>
    );
  }
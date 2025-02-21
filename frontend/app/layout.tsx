"use client"

import type React from "react"

import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Home, BarChart2, User, Menu, X } from "lucide-react"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StockSim - Stock Trading Simulation Platform",
  description: "Simulate buying and selling stocks in a risk-free environment",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-navy-blue min-h-screen font-sans`}>
        <header className="bg-royal-red text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold flex items-center">
              <BarChart2 className="mr-2" />
              StockSim
            </Link>
            <div className="hidden md:flex space-x-4">
              <NavLinks />
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
          {isMenuOpen && (
            <div className="md:hidden mt-4">
              <NavLinks mobile />
            </div>
          )}
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-royal-red text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            &copy; 2023 StockSim. All rights reserved. This is a simulation platform.
          </div>
        </footer>
      </body>
    </html>
  )
}

function NavLinks({ mobile = false }) {
  return (
    <ul className={`${mobile ? "flex flex-col space-y-2" : "flex space-x-4"}`}>
      <li>
        <Link href="/" className="hover:text-navy-blue flex items-center">
          <Home className="mr-1" size={18} />
          Home
        </Link>
      </li>
      <li>
        <Link href="/stocks" className="hover:text-navy-blue flex items-center">
          <BarChart2 className="mr-1" size={18} />
          Stocks
        </Link>
      </li>
      <li>
        <Link href="/portfolio" className="hover:text-navy-blue flex items-center">
          <User className="mr-1" size={18} />
          Portfolio
        </Link>
      </li>
    </ul>
  )
}



import './globals.css'
"use client";

import "./globals.css";
import Link from "next/link";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gradient-soft text-gray-900">
        <header className="backdrop-blur-md bg-white/70 shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

            <Link href="/" className="text-2xl font-bold text-indigo-600">
              JobBridge
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
              <Link href="/jobs" className="hover:text-indigo-600 transition">
                Jobs
              </Link>
              <Link href="/recruiter/dashboard" className="hover:text-indigo-600 transition">
                Recruiter
              </Link>
              <Link href="/login" className="hover:text-indigo-600 transition">
                Login
              </Link>
            </nav>

            <button
              className="md:hidden text-gray-700 text-3xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden bg-white shadow-md">
              <nav className="flex flex-col p-4 space-y-4 text-gray-700 font-medium">
                <Link href="/jobs" className="hover:text-indigo-600">
                  Jobs
                </Link>
                <Link href="/recruiter/dashboard" className="hover:text-indigo-600">
                  Recruiter
                </Link>
                <Link href="/login" className="hover:text-indigo-600">
                  Login
                </Link>
              </nav>
            </div>
          )}
        </header>

        <main className="min-h-[calc(100vh-72px)] px-4">
          {children}
        </main>
      </body>
    </html>
  );
}

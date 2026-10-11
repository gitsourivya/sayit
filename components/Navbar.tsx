'use client';

import React from 'react';

interface NavbarProps {
  onOpenHowItWorks: () => void;
  onOpenAbout: () => void;
}

export function Navbar({ onOpenHowItWorks, onOpenAbout }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#E7DDD2]/80 bg-[#FAF7F2]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Wordmark */}
        <a
          href="#"
          className="group flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B85C6E] rounded-md"
          aria-label="SayIt Homepage"
        >
          <span className="font-serif text-2xl font-bold tracking-tight text-[#291624] transition-colors group-hover:text-[#8C3C4D]">
            sayit<span className="text-[#B85C6E]">.</span>
          </span>
          <span className="hidden text-xs uppercase tracking-widest font-medium text-[#957F91] sm:inline-block pl-2 border-l border-[#E7DDD2]">
            AI Communication
          </span>
        </a>

        {/* Navigation & actions */}
        <nav className="flex items-center gap-2 sm:gap-6" aria-label="Main Navigation">
          <button
            type="button"
            onClick={onOpenHowItWorks}
            className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[#6B5467] transition-all hover:bg-[#F3EBE3] hover:text-[#291624] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B85C6E]"
          >
            How it works
          </button>

          <button
            type="button"
            onClick={onOpenAbout}
            className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[#6B5467] transition-all hover:bg-[#F3EBE3] hover:text-[#291624] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B85C6E]"
          >
            About
          </button>

          <div className="hidden items-center gap-1.5 rounded-full border border-[#E9CED4] bg-[#F8EEF0] px-3 py-1 text-xs font-medium text-[#8C3C4D] md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C6E] animate-pulse" />
            <span>Private & Thoughtful</span>
          </div>
        </nav>
      </div>
    </header>
  );
}

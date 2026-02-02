"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ className = "" }: { className?: string }) {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const router = useRouter();

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    router.push(`/jobs?keyword=${encodeURIComponent(q)}&location=${encodeURIComponent(loc)}`);
  }

  return (
    <form onSubmit={submit} className={`max-w-4xl mx-auto ${className}`}>
      <div className="flex gap-2 items-center">
        <input
          aria-label="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Job title or skill"
          className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-200"
        />
        <input
          aria-label="location"
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          placeholder="Location"
          className="w-48 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-200"
        />
        <button type="submit" className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Search
        </button>
      </div>
      <p className="text-center text-xs text-gray-500 mt-2">Try: React, Backend, UI Designer</p>
    </form>
  );
}

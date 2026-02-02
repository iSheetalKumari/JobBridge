"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    router.push(`/jobs?keyword=${keyword}&location=${location}`);
  };

  return (
    <div>

      {/* HERO SECTION */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Find Your Dream Job Today
          </h1>
          <p className="mt-4 text-lg md:text-xl text-indigo-200">
            Explore thousands of job opportunities from top companies.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-10 bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-4 md:items-center">
            <input
              type="text"
              placeholder="Job title, keywords..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
            />

            <button
              onClick={handleSearch}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
            >
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Jobs</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((job) => (
              <div
                key={job}
                className="bg-white shadow-md p-6 rounded-xl border hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">Frontend Developer</h3>
                <p className="text-gray-500 mt-1">Google • Bangalore</p>

                <p className="text-gray-700 mt-4">
                  Work on modern frontend technologies while building scalable
                  user interfaces.
                </p>

                <Link
                  href="/jobs"
                  className="text-indigo-600 font-semibold mt-4 inline-block"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Software Development",
              "Design",
              "Marketing",
              "Finance",
              "HR",
              "Management",
              "Operations",
              "Data Science",
            ].map((category) => (
              <div
                key={category}
                className="bg-white shadow-sm border rounded-xl p-6 text-center hover:shadow-md cursor-pointer transition"
              >
                <p className="text-gray-800 font-medium">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

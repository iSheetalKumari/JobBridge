"use client";
import { useState } from "react";
import JobRows from "./JobRows";

type Job = any;

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/jobs/featured');
      if (!res.ok) throw new Error((await res.text()) || 'Failed to load');
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err: any) {
      console.error('FeaturedJobs fetch error', err);
      setError('Unable to load jobs at this time.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {!jobs && !loading && !error && (
        <div className="text-center">
          <button onClick={load} className="bg-blue-600 text-white px-6 py-3 rounded-md shadow">Show Featured Opportunities</button>
        </div>
      )}

      {loading && (
        <div className="text-center py-6">Loading…</div>
      )}

      {error && (
        <div className="text-center text-red-500 py-4">{error}</div>
      )}

      {jobs && jobs.length === 0 && (
        <div className="text-center py-6 text-gray-600">No featured jobs at the moment.</div>
      )}

      {jobs && jobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((j: Job) => (
            <JobRows key={j._id || j.id} job={j} />
          ))}
        </div>
      )}
    </div>
  );
}

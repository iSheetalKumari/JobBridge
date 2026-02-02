"use client";
import { useState } from "react";
import JobCard from "./JobCard";

const DUMMY = [
  { _id: "1", title: "Frontend Developer", companyName: "TechBridge", city: "Bengaluru", salary: "8-12 LPA", description: "Build responsive React apps.", featured: true },
  { _id: "2", title: "Backend Engineer", companyName: "CloudMatrix", city: "Hyderabad", salary: "10-16 LPA", description: "Node.js + MongoDB microservices.", featured: true },
  { _id: "3", title: "Data Analyst", companyName: "Insight Labs", city: "Pune", salary: "6-9 LPA", description: "SQL + Python + dashboards.", featured: true }
];

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs/featured").catch(()=>null);
      if (res && res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      } else {
        // fallback to dummy data for frontend preview
        setJobs(DUMMY);
      }
    } catch (err) {
      setJobs(DUMMY);
    } finally { setLoading(false); }
  }

  return (
    <div>
      {!jobs && !loading && <div className="text-center"><button onClick={load} className="px-6 py-3 bg-indigo-600 text-white rounded">Show Featured Opportunities</button></div>}
      {loading && <div className="text-center py-6">Loading…</div>}
      {jobs && jobs.length === 0 && <div className="text-center py-6 text-gray-600">No featured jobs at the moment.</div>}
      {jobs && jobs.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">{jobs.map(j => <JobCard key={j._id} job={j} />)}</div>}
    </div>
  );
}

"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import JobSearchFilters, { JobFilters } from "@/app/components/JobSearchFilters";
import JobList from "@/app/components/JobList";

interface Job {
  _id: string;
  title: string;
  companyName?: string;
  city?: string;
  state?: string;
  salary?: string;
  description?: string;
  type?: string;
  remote?: string;
}

function SearchJobsContent() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword) {
      performSearch({ keyword, location: "", jobType: "", remoteType: "", salaryMin: "", salaryMax: "" });
    }
  }, [searchParams]);

  async function performSearch(filters: JobFilters) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.keyword) params.append("keyword", filters.keyword);
      if (filters.location) params.append("location", filters.location);
      if (filters.jobType) params.append("type", filters.jobType);
      if (filters.remoteType) params.append("remote", filters.remoteType);
      if (filters.salaryMin) params.append("salaryMin", filters.salaryMin);
      if (filters.salaryMax) params.append("salaryMax", filters.salaryMax);

      const res = await fetch(`/api/jobs/search?${params}`);
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error("Failed to search jobs:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Find Your Next Job</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <JobSearchFilters onSearch={performSearch} />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-12">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No jobs found matching your criteria</p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-4">{jobs.length} jobs found</p>
              <JobList jobs={jobs} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchJobsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <SearchJobsContent />
    </Suspense>
  );
}

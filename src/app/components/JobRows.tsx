"use client";
import JobCard from "./JobCard";

interface JobData {
  _id?: string;
  id?: string;
  title?: string;
  jobTitle?: string;
  companyName?: string;
  orgName?: string;
  org?: string;
  location?: string;
  city?: string;
  state?: string;
  description?: string;
  salary?: string | number;
  featured?: boolean;
  jobIcon?: string;
  [key: string]: unknown;
}

export default function JobRows({ job }: { job: JobData }) {
  // transform job field names to match JobCard props if needed
  const jobData = {
    _id: job._id || job.id,
    title: job.title || job.jobTitle,
    companyName: job.companyName || job.orgName || job.org,
    location: job.location || `${job.city || ""}${job.city ? ", " : ""}${job.state || ""}`,
    salary: job.salary ? (typeof job.salary === "number" ? `₹${job.salary}` : job.salary) : job.salary,
    snippet: job.description?.slice(0, 140) ?? undefined,
    featured: job.featured,
    logo: job.jobIcon
  };

  return <JobCard job={jobData} />;
}

"use client";
import JobCard from "./JobCard";

export default function JobRows({ job }: any) {
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

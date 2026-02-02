import JobCard from "./JobCard";

export default function JobList({ jobs }: { jobs: any[] }) {
  if (!jobs || jobs.length === 0) {
    return <div className="p-6 text-center text-gray-500">No jobs found.</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map(j => <JobCard key={j._id || j.id} job={j} />)}
    </div>
  );
}

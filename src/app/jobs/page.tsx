import Link from "next/link";

const jobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TCS",
    location: "Bangalore",
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "Infosys",
    location: "Pune",
  },
  {
    id: "3",
    title: "React Developer",
    company: "Wipro",
    location: "Remote",
  },
];

export default function JobsPage({
  searchParams,
}: {
  searchParams: { keyword?: string; location?: string };
}) {
  const keyword = searchParams.keyword?.toLowerCase() || "";
  const location = searchParams.location?.toLowerCase() || "";

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(keyword) &&
      job.location.toLowerCase().includes(location)
  );

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Job Results</h1>

      {filteredJobs.length === 0 && (
        <p className="text-gray-500">No jobs found</p>
      )}

      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-4 hover:shadow"
          >
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p>{job.company}</p>
            <p className="text-sm text-gray-500">{job.location}</p>

            <Link
              href={`/jobs/${job.id}`}
              className="text-indigo-600 text-sm mt-2 inline-block"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

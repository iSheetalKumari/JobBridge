import Link from "next/link";
import connectToDatabase from "@/lib/mongo";
import { JobModel } from "@/models/Job";

export const dynamic = "force-dynamic";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string; location?: string }>;
}) {
  const params = await searchParams;
  const keyword = params.keyword?.toLowerCase() || "";
  const location = params.location?.toLowerCase() || "";

  try {
    await connectToDatabase();
    
    // Build filter query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = { active: true };
    
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { companyName: { $regex: keyword, $options: "i" } }
      ];
    }
    
    if (location) {
      filter.$or = filter.$or || [];
      filter.$or.push({ city: { $regex: location, $options: "i" } });
      filter.$or.push({ state: { $regex: location, $options: "i" } });
    }
    
    // Fetch jobs from database
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jobs = await JobModel.find(filter).sort({ createdAt: -1 }).lean() as any[];

    return (
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Job Opportunities</h1>

        {jobs.length === 0 && (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-600 mb-4">No jobs found matching your criteria</p>
            <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Back to Home
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {jobs.map((job: any) => (
            <div
              key={job._id}
              className="border rounded-lg p-4 hover:shadow-md transition bg-white"
            >
              <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
              <p className="text-gray-700 font-medium">{job.companyName}</p>
              <p className="text-sm text-gray-500">{job.city}, {job.state || job.country || "Remote"}</p>
              {job.salary && <p className="text-sm text-indigo-600 font-medium">Salary: {job.salary}</p>}
              {job.type && <p className="text-xs text-gray-500">Type: {job.type}</p>}              <Link
                href={`/show/${job._id}`}
                className="text-indigo-600 hover:text-indigo-700 text-sm mt-3 inline-block font-medium"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading jobs:", error);
    return (
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Job Opportunities</h1>
        <div className="bg-red-50 p-8 rounded-lg text-center">
          <p className="text-red-600 mb-4">Error loading jobs. Please try again later.</p>
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
}
  </div>
  );
}

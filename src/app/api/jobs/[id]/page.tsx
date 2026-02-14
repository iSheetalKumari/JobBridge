import connectToDatabase from "@/lib/mongo";
import { JobModel } from "@/models/Job";

export default async function JobPage({ params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const job = await JobModel.findById(params.id).lean();
    if (!job) return <div className="p-8">Job not found</div>;
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
        <p className="text-gray-600 mb-4">{job.companyName} • {job.city}{job.state?`, ${job.state}`:""}</p>
        <div className="prose mb-6">{job.description}</div>
        <a href={job.applyLink || "#"} className="bg-indigo-600 text-white px-4 py-2 rounded">Apply Now</a>
      </div>
    );
  } catch (err) {
    return <div className="p-8">Loading failed (DB not configured) — try jobs list for demo.</div>;
  }
}

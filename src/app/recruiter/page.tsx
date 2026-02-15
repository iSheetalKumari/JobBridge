import connectToDatabase from "@/lib/mongo";
import { JobModel } from "@/models/Job";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RecruiterDashboard() {
  await connectToDatabase();
  const jobs = await JobModel.find().sort({ createdAt: -1 }).lean();
  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
        <Link href="/recruiter/new" className="bg-indigo-600 text-white px-4 py-2 rounded">Post a Job</Link>
      </div>
      <div className="grid gap-3">
        {jobs.map((j: typeof jobs[number]) => (
          <div key={String(j._id)} className="border p-4 rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{j.title}</div>
              <div className="text-sm text-gray-600">{j.companyName || j.orgName}</div>
            </div>
            <div className="flex gap-2">
              <Link href={`/recruiter/edit/${j._id}`} className="px-3 py-1 border rounded">Edit</Link>
              <form action={`/api/jobs/${j._id}`} method="post">
                {/* implement delete API */}
                <button className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongo";
import { JobModel } from "@/models/Job";
import { ApplicationModel } from "@/models/application";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RecruiterDashboardEnhanced() {
  const auth = await withAuth();
  if (!auth.user) {
    redirect("/login");
  }

  await connectToDatabase();

  try {
    // Fetch recruiter's jobs (filter by userId)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jobs = await JobModel.find({ userId: auth.user.id }).sort({ createdAt: -1 }).lean() as any[];

    // Fetch applications for all recruiter's jobs
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jobIds = jobs.map((j: any) => j._id);
    const applications = (await ApplicationModel.find({ jobId: { $in: jobIds } })
      .sort({ createdAt: -1 })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .lean()) as any[];

    // Calculate stats
    const totalApplications = applications.length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reviewingCount = (applications as any[]).filter((a: any) => a.status === "reviewing").length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const offeredCount = (applications as any[]).filter((a: any) => a.status === "offered").length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const appliedCount = (applications as any[]).filter((a: any) => a.status === "applied").length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const interviewCount = (applications as any[]).filter((a: any) => a.status === "interview").length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rejectedCount = (applications as any[]).filter((a: any) => a.status === "rejected").length;

    const statusStats = {
      applied: appliedCount,
      reviewing: reviewingCount,
      interview: interviewCount,
      offered: offeredCount,
      rejected: rejectedCount
    };

    return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
          <Link href="/new-listing" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Post New Job
          </Link>
        </div>
        <p className="text-gray-600">Manage your job postings and applications</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Total Applications</p>
          <p className="text-3xl font-bold text-indigo-600">{totalApplications}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Applied</p>
          <p className="text-3xl font-bold text-blue-600">{statusStats.applied}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Reviewing</p>
          <p className="text-3xl font-bold text-yellow-600">{statusStats.reviewing}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Interviews</p>
          <p className="text-3xl font-bold text-purple-600">{statusStats.interview}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-sm mb-1">Offers</p>
          <p className="text-3xl font-bold text-green-600">{statusStats.offered}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jobs List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold mb-4">Your Job Postings</h3>
            <div className="space-y-3">
              {jobs.length === 0 ? (
                <p className="text-gray-500 text-sm">No jobs posted yet</p>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                jobs.map((job: any) => (
                  <div key={job._id} className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                    <p className="font-medium text-sm">{job.title}</p>
                    <p className="text-xs text-gray-600">{job.companyName}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {applications.filter((a: any) => a.jobId.toString() === job._id.toString()).length} applications
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold mb-4">Recent Applications</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {applications.length === 0 ? (
                <p className="text-gray-500 text-sm">No applications yet</p>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                applications.slice(0, 20).map((app: any) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const job = jobs.find((j: any) => j._id.toString() === app.jobId.toString());
                  return (
                    <div key={app._id} className="p-3 border rounded hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{job?.title}</p>
                          <p className="text-xs text-gray-600">Applicant ID: {app.userId}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          app.status === "offered" ? "bg-green-100 text-green-800" :
                          app.status === "interview" ? "bg-purple-100 text-purple-800" :
                          app.status === "reviewing" ? "bg-yellow-100 text-yellow-800" :
                          app.status === "rejected" ? "bg-red-100 text-red-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  } catch (error) {
    console.error("Error loading recruiter dashboard:", error);
    return (
      <div className="max-w-7xl mx-auto py-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-red-600">There was an error loading the recruiter dashboard. Please try again later.</p>
        </div>
      </div>
    );
  }
}

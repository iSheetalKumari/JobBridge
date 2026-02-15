import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import MyApplications from "@/app/components/MyApplications";

export const dynamic = "force-dynamic";

export default async function CandidateDashboard() {
  const auth = await withAuth();
  if (!auth.user) {
    redirect("/login");
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job Applications Dashboard</h1>
        <p className="text-gray-600">Track your job applications and view their status</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MyApplications />
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 h-fit">
          <h3 className="font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Profile Strength</p>
              <div className="bg-white rounded h-2 mt-1">
                <div className="bg-indigo-600 h-2 rounded" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Applications This Month</p>
              <p className="font-semibold text-lg mt-1">5</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Profile Views</p>
              <p className="font-semibold text-lg mt-1">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

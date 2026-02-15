"use client";
import { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";

interface Application {
  _id: string;
  jobId: string;
  userId: string;
  status: string;
  resumeUrl: string;
  coverLetter: string;
  createdAt: string;
}

export default function ApplicationsManagement() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState("");

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJob]);

  async function fetchApplications() {
    setLoading(true);
    try {
      const url = selectedJob ? `/api/recruiter/applications?jobId=${selectedJob}` : "/api/recruiter/applications";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateApplicationStatus(applicationId: string, newStatus: string) {
    try {
      const res = await fetch("/api/recruiter/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, status: newStatus })
      });
      if (res.ok) {
        setApplications(
          applications.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
      }
    } catch (error) {
      console.error("Failed to update application:", error);
      alert("Failed to update application status");
    }
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      applied: "bg-blue-100 text-blue-800",
      reviewing: "bg-yellow-100 text-yellow-800",
      interview: "bg-purple-100 text-purple-800",
      offered: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Applications</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Filter by Job</label>
          <Select.Root value={selectedJob} onValueChange={setSelectedJob}>
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="">All Jobs</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : applications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No applications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app._id} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold">Applicant: {app.userId}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Applied {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Select.Root value={app.status} onValueChange={(status) => updateApplicationStatus(app._id, status)}>
                  <Select.Trigger className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(app.status)}`} />
                  <Select.Content>
                    <Select.Item value="applied">Applied</Select.Item>
                    <Select.Item value="reviewing">Reviewing</Select.Item>
                    <Select.Item value="interview">Interview</Select.Item>
                    <Select.Item value="offered">Offered</Select.Item>
                    <Select.Item value="rejected">Rejected</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>

              {app.coverLetter && (
                <div className="mt-3 p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600 font-medium mb-1">Cover Letter:</p>
                  <p className="text-sm text-gray-700">{app.coverLetter.substring(0, 200)}...</p>
                </div>
              )}

              {app.resumeUrl && (
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline text-sm mt-2 inline-block"
                >
                  View Resume
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

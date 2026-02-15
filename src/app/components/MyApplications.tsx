"use client";
import { useEffect, useState } from "react";
import { Badge } from "@radix-ui/themes";

interface Application {
  _id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  status: string;
  createdAt: string;
}

export default function MyApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/applications/my-applications");
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
    fetchApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "offered":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">You haven&apos;t applied to any jobs yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>
      {applications.map((app) => (
        <div key={app._id} className="border rounded-lg p-4 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{app.jobTitle}</h3>
              <p className="text-gray-600">{app.companyName}</p>
              <p className="text-sm text-gray-500">
                Applied {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Badge className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(app.status)}`}>
              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";
import Link from "next/link";

export default function JobCard({ job }: { job: any }) {
  return (
    <article className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {job.jobIcon ? <img src={job.jobIcon} alt="logo" className="w-full h-full object-contain" /> : <span className="text-lg font-bold text-gray-600">{(job.companyName||job.title||"J").charAt(0)}</span>}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{job.companyName} • {job.city || job.state || job.country}</p>
            </div>
            <div className="text-sm text-gray-700">{job.salary || "Not disclosed"}</div>
          </div>

          {job.description && <p className="text-sm text-gray-600 mt-3 line-clamp-3">{job.description}</p>}

          <div className="mt-4 flex items-center gap-3">
            <Link href={`/jobs/${job._id || job.id || ""}`} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">View</Link>
            <button className="px-3 py-2 border rounded-lg text-sm">Save</button>
            {job.featured && <span className="ml-auto inline-block bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded">Featured</span>}
          </div>
        </div>
      </div>
    </article>
  );
}

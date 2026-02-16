import React from "react";
import { notFound } from "next/navigation";
import Jobs from "@/app/components/Jobs";
import { JobModel, Job } from "@/models/Job";
import { getWorkos } from "@/lib/workos";
import { addOrgAndUserData } from "@/lib/addOrgAndUserData";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { Types } from "mongoose";

// Props type
type PageProps = {
  params: { orgId: string };
};

// Type of raw job document from MongoDB
type RawJobDocument = Omit<Job, "_id"> & { _id: Types.ObjectId };

export default async function CompanyJobsPage({ params }: PageProps) {
  const { orgId } = params;

  try {
    // Authenticate user
    const { user } = await withAuth();

    if (!user) {
      return (
        <div className="container p-6">
          <h1 className="text-xl font-bold">Access denied</h1>
          <p>Please sign in to view company jobs.</p>
        </div>
      );
    }

    const workos = getWorkos();

    // Fetch organization and jobs
    const [organization, jobsRaw] = await Promise.all([
      workos.organizations.getOrganization(orgId),
      JobModel.find({ orgId })
        .sort({ createdAt: -1 })
        .limit(20)
        .lean<RawJobDocument>(), // Specify the MongoDB document type
    ]);

    if (!organization) return notFound();

    const memberships = await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
      organizationId: orgId,
    });

    if (!memberships.data.length) return notFound();

    // Map RawJobDocument -> Job
    const jobs: Job[] = jobsRaw.map((jobDoc) => {
      return {
        ...jobDoc,
        _id: jobDoc._id.toString(), // Convert ObjectId to string
      };
    });

    // Enrich jobs with org/user data
    const enrichedJobs = await addOrgAndUserData(jobs, user);

    return (
      <main>
        <div className="container">
          <h1 className="text-2xl font-bold my-6">{organization.name} Jobs</h1>
        </div>

        {enrichedJobs.length === 0 ? (
          <div className="container">
            <p className="my-4">No jobs posted yet for {organization.name}.</p>
          </div>
        ) : (
          <Jobs jobs={enrichedJobs} header={`Jobs posted by ${organization.name}`} />
        )}
      </main>
    );
  } catch (error) {
    console.error("Error loading company jobs:", error);
    return (
      <div className="container">
        <h1 className="text-xl font-bold">Something went wrong.</h1>
      </div>
    );
  }
}

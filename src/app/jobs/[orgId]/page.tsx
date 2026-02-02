import React from "react";
import { notFound } from "next/navigation";

import Jobs from "@/app/components/Jobs";
import { JobModel, Job } from "@/models/Job";
import { getWorkos } from "@/lib/workos";
import { addOrgAndUserData } from "@/lib/addOrgAndUserData";

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function CompanyJobsPage({ params }: PageProps) {
  const { orgId } = params;

  try {
    const workos = getWorkos();

    /* ---------------- AUTHENTICATION ---------------- */
    const { user } = await workos.userManagement.getUser();

    if (!user) {
      return (
        <div className="container">
          <h1 className="text-xl my-6">Access denied</h1>
          <p>Please sign in to view company jobs.</p>
        </div>
      );
    }

    /* ---------------- ORGANIZATION ---------------- */
    const organization = await workos.organizations.getOrganization(orgId);
    if (!organization) return notFound();

    /* ---------------- AUTHORIZATION ---------------- */
    const memberships =
      await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
        organizationId: orgId,
      });

    if (memberships.data.length === 0) {
      return notFound(); // user is not part of this org
    }

    /* ---------------- JOBS FETCH ---------------- */
    const jobsRaw = await JobModel.find({ orgId })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    const jobs: Job[] = jobsRaw ?? [];

    const enrichedJobs = await addOrgAndUserData(jobs, user);

    /* ---------------- UI ---------------- */
    return (
      <div>
        <div className="container">
          <h1 className="text-xl my-6">{organization.name} Jobs</h1>
        </div>

        {enrichedJobs.length === 0 ? (
          <div className="container">
            <p className="my-4">
              No jobs posted yet for {organization.name}.
            </p>
          </div>
        ) : (
          <Jobs
            jobs={enrichedJobs}
            header={`Jobs posted by ${organization.name}`}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading company jobs:", error);

    return (
      <div className="container">
        <h1 className="text-xl my-6">Something went wrong</h1>
        <p>Unable to load jobs right now. Please try again later.</p>
      </div>
    );
  }
}

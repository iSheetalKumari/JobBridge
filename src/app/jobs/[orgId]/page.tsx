import React from "react";
import { notFound } from "next/navigation";
import Jobs from "@/app/components/Jobs";
import { JobModel, Job } from "@/models/Job";
import { getWorkos } from "@/lib/workos";
import { addOrgAndUserData } from "@/lib/addOrgAndUserData";
import { getUser } from "@workos-inc/authkit-nextjs";

type PageProps = {
  params: Promise<{ orgId: string }>;
};

export default async function CompanyJobsPage({ params }: PageProps) {
  const { orgId } = await params;

  try {
    const { user } = await getUser();

    if (!user) {
      return (
        <div className="container p-6">
          <h1 className="text-xl font-bold">Access denied</h1>
          <p>Please sign in to view company jobs.</p>
        </div>
      );
    }

    const workos = getWorkos();

    // Fetching data
    const [organization, jobsRaw] = await Promise.all([
      workos.organizations.getOrganization(orgId),
      JobModel.find({ orgId }).sort({ createdAt: -1 }).limit(20).lean()
    ]);

    if (!organization) return notFound();

    const memberships = await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
      organizationId: orgId,
    });

    if (memberships.data.length === 0) return notFound();

    /* --- THE FIX FOR THE ERROR --- */
    // We treat the raw data as 'any' first to avoid the _id red line, 
    // then convert it to the Job type.
    const jobs = (jobsRaw || []).map((job: any) => ({
      ...job,
      _id: job._id.toString(),
    })) as unknown as Job[];

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
    console.error(error);
    return <div className="container">Something went wrong.</div>;
  }
}
import Jobs from "@/app/components/Jobs";
import {addOrgAndUserData, JobModel, Job} from "@/models/Job";
import {withAuth} from "@workos-inc/authkit-nextjs";
import getWorkos from "@/lib/workos";
import {notFound} from "next/navigation";
// Link removed — CTA lives in `Jobs` component now
import React from "react";

type PageProps = {
  params: {
    orgId: string;
  }
};

export default async function CompanyJobsPage({params}:PageProps) {
  const orgId = params.orgId;

  if (!process.env.WORKOS_API_KEY) {
    console.error("Missing WORKOS_API_KEY");
    return (
      <div className="container">
        <h1 className="text-xl my-6">Configuration error</h1>
        <p>Server is not configured correctly. Missing WorkOS API key.</p>
      </div>
    );
  }

  try {
    const workos = getWorkos();

    const [org, jobsRaw, authResult] = await Promise.all([
      workos.organizations.getOrganization(orgId),
      // use .lean() so we get plain JS objects rather than Mongoose documents
      JobModel.find({ orgId }).lean(),
      withAuth(),
    ]);

    if (!org) return notFound();

    const user = authResult?.user ?? null;

    // serialize and enrich jobs with org/user data
    let jobsDocs = (jobsRaw as unknown as Job[]) || [];
    jobsDocs = await addOrgAndUserData(jobsDocs, user);

    // Basic auth check: require a signed-in user to view org jobs
    if (!user) {
      return (
        <div className="container">
          <h1 className="text-xl my-6">Access denied</h1>
          <p>Please sign in to view jobs for {org.name}.</p>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          <h1 className="text-xl my-6">{org.name} Jobs</h1>
        </div>

        {Array.isArray(jobsDocs) && jobsDocs.length === 0 ? (
          <div className="container">
            <p className="my-4">No jobs posted yet for {org.name}.</p>
          </div>
        ) : (
          <Jobs jobs={jobsDocs} header={"Jobs posted by " + org.name} />
        )}
      </div>
    );
  } catch (err) {
    console.error("Error loading company jobs:", err);
    return (
      <div className="container">
        <h1 className="text-xl my-6">Something went wrong</h1>
        <p>Unable to load jobs at this time. Try again later.</p>
      </div>
    );
  }
}

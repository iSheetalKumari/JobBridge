import { Job } from "@/models/Job";

/**
 * Adds computed fields to job objects
 */
export function addOrgAndUserData(
  jobs: Job[],
  user: { id?: string } | null
) {
  return jobs.map((job) => ({
    ...job,
    isOwner: Boolean(user?.id && job.userId === user.id),
  }));
}

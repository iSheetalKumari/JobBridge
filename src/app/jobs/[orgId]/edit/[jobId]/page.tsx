import JobForm from "@/app/components/JobForm";
import {JobModel} from "@/models/Job";
import {withAuth} from "@workos-inc/authkit-nextjs";
import getWorkos from "@/lib/workos";
import connectToDatabase from "@/lib/mongo";

type PageProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export default async function EditJobPage(pageProps:PageProps) {
  const { jobId } = await pageProps.params;
  await connectToDatabase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jobDoc = await JobModel.findById(jobId).lean() as any;
  if (!jobDoc) {
    return 'Not found';
  }
  const {user} = await withAuth();
  const workos = getWorkos();
  if (!user) {
    return 'You need to login';
  }
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: jobDoc.orgId,
  });
  if (oms.data.length === 0) {
    return 'Access denied';
  }
  return (
    <div>
      <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc} />
    </div>
  );
}
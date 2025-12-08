import JobForm from "@/app/components/JobForm";
import {JobModel} from "@/models/Job";
import {withAuth} from "@workos-inc/authkit-nextjs";
import getWorkos from "@/lib/workos";
import connectToDatabase from "@/lib/mongo";

type PageProps = {
  params: {
    jobId: string;
  };
};

export default async function EditJobPage(pageProps:PageProps) {
  const jobId = pageProps.params.jobId;
  await connectToDatabase();
  const jobDoc = await JobModel.findById(jobId).lean();
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
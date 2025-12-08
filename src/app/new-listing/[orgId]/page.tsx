import JobForm from "@/app/components/JobForm";
import {withAuth} from "@workos-inc/authkit-nextjs";
import getWorkos from "@/lib/workos";

type PageProps = {
  params: {
    orgId: string;
  }
};

export default async function NewListingForOrgPage(props:PageProps) {
  const {user} = await withAuth();
  const workos = getWorkos();
  if (!user) {
    return 'Please log in';
  }
  const orgId = props.params.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({userId:user.id,organizationId:orgId});
  const hasAccess = oms.data.length > 0;
  if (!hasAccess) {
    return 'no access'
  }

  return (
    <JobForm orgId={orgId} />
  );
}
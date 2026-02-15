"use server";

import getWorkos from "@/lib/workos";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const workos = getWorkos();

export async function createCompany(companyName: string, userId:string) {
  try {
    const org = await workos.organizations.createOrganization({name: companyName});
    await workos.userManagement.createOrganizationMembership({
      userId,
      organizationId: org.id,
      roleSlug: 'admin',
    });
    revalidatePath('/new-listing');
    redirect('/new-listing');
  } catch (error) {
    console.error('Error creating company:', error);
    throw error;
    return;
  }
}
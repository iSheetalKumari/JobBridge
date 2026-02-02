import { NextResponse } from "next/server";
import { workos } from "@/lib/workos";

export async function GET() {
  const url = workos.userManagement.getAuthorizationUrl({
    clientId: process.env.WORKOS_CLIENT_ID!,
    redirectUri: process.env.NEXT_PUBLIC_AUTHKIT_REDIRECT_URI!,
  });

  return NextResponse.redirect(url);
}

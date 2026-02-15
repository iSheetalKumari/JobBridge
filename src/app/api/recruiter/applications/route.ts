import { NextResponse } from "next/server";
import { withAuth } from "@workos-inc/authkit-nextjs";
import connectToDatabase from "@/lib/mongo";
import { ApplicationModel } from "@/models/application";

export async function GET(req: Request) {
  try {
    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const url = new URL(req.url);
    const jobId = url.searchParams.get("jobId");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (jobId) {
      query.jobId = jobId;
    }

    const applications = await ApplicationModel.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { applicationId, status } = await req.json();

    if (!["applied", "reviewing", "interview", "offered", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const application = await ApplicationModel.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}

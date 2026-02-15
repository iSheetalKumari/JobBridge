import { NextResponse } from "next/server";
import { withAuth } from "@workos-inc/authkit-nextjs";
import connectToDatabase from "@/lib/mongo";
import { ApplicationModel } from "@/models/application";
import { JobModel } from "@/models/Job";

export async function GET() {
  try {
    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const applications = await ApplicationModel.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .lean();

    // Get job details for each application
    const applicationsWithJobDetails = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      applications.map(async (app: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const job = await JobModel.findById(app.jobId).lean() as any;
        return {
          ...app,
          jobTitle: job?.title,
          companyName: job?.companyName
        };
      })
    );

    return NextResponse.json({ applications: applicationsWithJobDetails }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

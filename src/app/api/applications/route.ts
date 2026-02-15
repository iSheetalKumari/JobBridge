import { NextResponse } from "next/server";
import { withAuth } from "@workos-inc/authkit-nextjs";
import connectToDatabase from "@/lib/mongo";
import { ApplicationModel } from "@/models/application";

export async function GET(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
  try {
    const { jobId } = await params;
    await connectToDatabase();
    
    const applications = await ApplicationModel.find({ jobId })
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { jobId, resumeUrl, coverLetter } = await req.json();

    // Check if already applied
    const existing = await ApplicationModel.findOne({ jobId, userId: user.id });
    if (existing) {
      return NextResponse.json({ error: "Already applied for this job" }, { status: 400 });
    }

    const application = await ApplicationModel.create({
      jobId,
      userId: user.id,
      resumeUrl,
      coverLetter,
      status: "applied"
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

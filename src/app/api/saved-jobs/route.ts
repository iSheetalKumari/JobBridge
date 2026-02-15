import { NextResponse } from "next/server";
import { withAuth } from "@workos-inc/authkit-nextjs";
import connectToDatabase from "@/lib/mongo";
import { SavedJobModel } from "@/models/SavedJob";

export async function GET() {
  try {
    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const savedJobs = await SavedJobModel.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ savedJobs }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch saved jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { jobId } = await req.json();

    // Check if already saved
    const existing = await SavedJobModel.findOne({ userId: user.id, jobId });
    if (existing) {
      return NextResponse.json({ error: "Job already saved" }, { status: 400 });
    }

    const savedJob = await SavedJobModel.create({
      userId: user.id,
      jobId
    });

    return NextResponse.json({ savedJob }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save job" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { jobId } = await req.json();

    await SavedJobModel.deleteOne({ userId: user.id, jobId });

    return NextResponse.json({ message: "Job unsaved" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to unsave job" }, { status: 500 });
  }
}

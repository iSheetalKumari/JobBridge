import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import { JobModel } from "@/models/job";

export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await JobModel.find({ featured: true, active: true }).sort({ createdAt: -1 }).limit(9).lean();
    return NextResponse.json({ jobs }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unable to load featured jobs" }, { status: 500 });
  }
}

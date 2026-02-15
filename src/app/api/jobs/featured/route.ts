import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import { JobModel } from "@/models/Job";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch featured jobs
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jobs = await JobModel.find({ featured: true }).limit(6).lean() as any[];
    
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured jobs:", error);
    return NextResponse.json({ error: "Failed to fetch featured jobs" }, { status: 500 });
  }
}

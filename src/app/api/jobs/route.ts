import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import { JobModel } from "@/models/Job";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || "";
    const location = url.searchParams.get("location") || "";
    const page = Number(url.searchParams.get("page") || "1");
    const perPage = 12;

    const filter: any = { active: true };
    if (q) filter.title = { $regex: q, $options: "i" };
    if (location) filter.$or = [
      { city: { $regex: location, $options: "i" } },
      { state: { $regex: location, $options: "i" } },
      { country: { $regex: location, $options: "i" } },
    ];

    const total = await JobModel.countDocuments(filter);
    const jobs = await JobModel.find(filter).skip((page - 1) * perPage).limit(perPage).lean();

    return NextResponse.json({ jobs, total }, { status: 200 });
  } catch (err) {
    console.error("jobs GET error:", err);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const job = await JobModel.create(body);
    return NextResponse.json({ job }, { status: 201 });
  } catch (err) {
    console.error("jobs POST error:", err);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

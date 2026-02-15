import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import { JobModel } from "@/models/Job";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const keyword = url.searchParams.get("keyword");
    const location = url.searchParams.get("location");
    const jobType = url.searchParams.get("type");
    const remote = url.searchParams.get("remote");
    const salaryMin = url.searchParams.get("salaryMin");
    const salaryMax = url.searchParams.get("salaryMax");

    await connectToDatabase();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { active: true };

    // Keyword search (title, description, company name)
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { companyName: { $regex: keyword, $options: "i" } }
      ];
    }

    // Location search
    if (location) {
      query.$or = [
        ...(query.$or || []),
        { city: { $regex: location, $options: "i" } },
        { state: { $regex: location, $options: "i" } },
        { country: { $regex: location, $options: "i" } }
      ];
    }

    // Job type filter
    if (jobType) {
      query.type = jobType;
    }

    // Remote type filter
    if (remote) {
      query.remote = remote;
    }

    // Salary range filter
    if (salaryMin || salaryMax) {
      query.salary = {};
      if (salaryMin) {
        query.salary.$gte = parseInt(salaryMin);
      }
      if (salaryMax) {
        query.salary.$lte = parseInt(salaryMax);
      }
    }

    const jobs = await JobModel.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to search jobs" }, { status: 500 });
  }
}

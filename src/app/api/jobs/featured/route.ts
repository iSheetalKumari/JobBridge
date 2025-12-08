import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongo';
import { JobModel } from '@/models/job';

export async function GET() {
  try {
    await connectToDatabase();
  } catch (err) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const jobs = await JobModel.find().limit(6).lean();
    return NextResponse.json({ jobs });
  } catch (err) {
    console.error('API /jobs/featured error', err);
    return NextResponse.json({ error: 'Failed to load jobs' }, { status: 500 });
  }
}

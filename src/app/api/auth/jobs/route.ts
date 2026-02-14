import {JobModel} from "@/models/Job";
import connectToDatabase from "@/lib/mongo";
import {NextRequest} from "next/server";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  await connectToDatabase();
  await JobModel.deleteOne({
    _id: id,
  });
  return Response.json(true);
}
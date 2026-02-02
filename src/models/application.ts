import { Schema, model, models } from "mongoose";

const ApplicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  resumeUrl: String,
  coverLetter: String,
  status: { type: String, enum: ["applied","reviewing","interview","offered","rejected"], default: "applied" }
}, { timestamps: true });

export const ApplicationModel = models.Application || model("Application", ApplicationSchema);

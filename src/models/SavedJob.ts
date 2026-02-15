import { Schema, model, models } from "mongoose";

export interface SavedJob {
  _id: string;
  userId: string;
  jobId: string;
  createdAt: string;
}

const SavedJobSchema = new Schema<SavedJob>(
  {
    userId: { type: String, required: true },
    jobId: { type: String, required: true },
  },
  { timestamps: true }
);

SavedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });

export const SavedJobModel = models.SavedJob || model<SavedJob>("SavedJob", SavedJobSchema);

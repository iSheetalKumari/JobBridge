import { Schema, model, models } from "mongoose";

export interface Job {
  title: string;
  description?: string;
  companyName?: string;
  city?: string;
  state?: string;
  country?: string;
  type?: string;
  remote?: string;
  salary?: string;
  jobIcon?: string;
  orgId?: string;
  createdBy?: string;
  featured?: boolean;
  active?: boolean;
}

const JobSchema = new Schema<Job>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    companyName: { type: String, required: false },
    city: String,
    state: String,
    country: String,
    type: String,
    remote: String,
    salary: String,
    jobIcon: String,
    orgId: { type: Schema.Types.ObjectId, ref: "Company" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const JobModel = models.Job || model("Job", JobSchema);

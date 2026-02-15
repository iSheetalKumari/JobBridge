import { Schema, model, models } from "mongoose";

export interface Job {
  _id: string;      
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
  contactPhoto?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  orgId?: string;
  createdBy?: string;
  featured?: boolean;
  active?: boolean;
  userId: string;
  createdAt: string; 
  updatedAt: string;
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
    contactPhoto: String,
    contactName: String,
    contactPhone: String,
    contactEmail: String,
    // Note: Changed to String if you're storing WorkOS Org IDs 
    // or keep as ObjectId if referencing a Mongo Collection
    orgId: { type: String }, 
    createdBy: { type: String }, 
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const JobModel = models.Job || model("Job", JobSchema);
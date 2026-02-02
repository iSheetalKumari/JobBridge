import { Schema, model, models } from "mongoose";

const CompanySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  website: String,
  logoUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export const CompanyModel = models.Company || model("Company", CompanySchema);
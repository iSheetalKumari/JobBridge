import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  role: { type: String, enum: ["candidate", "recruiter", "admin"], default: "candidate" },
  workosId: String, // if using WorkOS
  resumeUrl: String,
  stripeCustomerId: String,
  createdAt: { type: Date, default: Date.now }
});

export const UserModel = models.User || model("User", UserSchema);
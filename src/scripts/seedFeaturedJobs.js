import mongoose from "mongoose";
import Job from "../src/models/job";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Job.insertMany([
    {
      title: "Frontend Developer",
      company: "TechBridge Innovations",
      description: "React.js developer role",
      location: "Bangalore",
      jobType: "Full Time",
      salaryRange: "6-10 LPA",
      experience: "1-2 years",
      workMode: "Hybrid",
      role: "Frontend Engineer",
      skills: ["React", "Tailwind", "JavaScript"],
      applyLink: "https://example.com/apply",
      featured: true,
    },
    {
      title: "Backend Developer",
      company: "CloudMatrix Pvt Ltd",
      description: "Node.js backend role",
      location: "Hyderabad",
      jobType: "Full Time",
      salaryRange: "8-12 LPA",
      experience: "2+ years",
      workMode: "Remote",
      role: "Backend Engineer",
      skills: ["Node.js", "MongoDB"],
      applyLink: "https://example.com/apply",
      featured: true,
    }
  ]);

  console.log("Featured Jobs Seeded Successfully!");
  process.exit();
}

seed();

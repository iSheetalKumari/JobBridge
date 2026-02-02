"use client";
import JobForm from "@/app/components/JobForm";
import { useRouter } from "next/navigation";

export default function NewJob() {
  const router = useRouter();
  async function onCreate(formData: any) {
    const res = await fetch("/api/jobs", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(formData) });
    if (res.ok) router.push("/recruiter/dashboard");
    else alert("Failed to post");
  }
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl mb-4">Post a new job</h1>
      <JobForm onSubmit={onCreate} />
    </div>
  );
}

"use client";
import JobForm from "@/app/components/JobForm";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function NewJobContent() {
  const searchParams = useSearchParams();
  const orgId = searchParams.get("orgId");

  if (!orgId) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl mb-4">Please select an organization first</h1>
        <p>Go to <Link href="/new-listing" className="text-blue-600 underline">new-listing</Link> to select an organization</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl mb-4">Post a new job</h1>
      <JobForm orgId={orgId} />
    </div>
  );
}

export default function NewJob() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto py-8">Loading...</div>}>
      <NewJobContent />
    </Suspense>
  );
}

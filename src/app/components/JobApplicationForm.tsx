"use client";
import { useState } from "react";
import { Button, TextArea, TextField } from "@radix-ui/themes";

interface JobApplicationFormProps {
  jobId: string;
  onSuccess?: () => void;
}

export default function JobApplicationForm({ jobId, onSuccess }: JobApplicationFormProps) {
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, resumeUrl, coverLetter })
      });

      if (res.ok) {
        setSubmitted(true);
        setResumeUrl("");
        setCoverLetter("");
        onSuccess?.();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to submit application");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit application");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Application Submitted!</h3>
        <p className="text-green-700">We&apos;ve received your application. The recruiter will review it shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
      <h3 className="text-lg font-semibold">Apply for this Job</h3>

      <div>
        <label className="block text-sm font-medium mb-2">Resume URL</label>
        <TextField.Root
          placeholder="https://example.com/resume.pdf"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cover Letter</label>
        <TextArea
          placeholder="Tell us why you&apos;re interested in this position..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows={5}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}

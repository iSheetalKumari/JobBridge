"use client";
import { useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SaveJobButtonProps {
  jobId: string;
  isSaved?: boolean;
  onSave?: () => void;
}

export default function SaveJobButton({ jobId, isSaved = false, onSave }: SaveJobButtonProps) {
  const [saved, setSaved] = useState(isSaved);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      if (saved) {
        await fetch("/api/saved-jobs", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId })
        });
      } else {
        await fetch("/api/saved-jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId })
        });
      }
      setSaved(!saved);
      onSave?.();
    } catch (error) {
      console.error("Failed to save job:", error);
      alert("Failed to save job");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded transition ${
        saved
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <FontAwesomeIcon icon={faHeart} />
      {saved ? "Saved" : "Save Job"}
    </button>
  );
}

import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import { Button, TextField, TextArea, Theme } from "@radix-ui/themes";

export const dynamic = "force-dynamic";

export default async function CandidateProfile() {
  const auth = await withAuth();
  if (!auth.user) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-600 mt-2">Complete your profile to get discovered by recruiters</p>
      </div>

      <Theme>
        <form className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <TextField.Root
                placeholder="John"
                defaultValue={auth.user.firstName || ""}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <TextField.Root
                placeholder="Doe"
                defaultValue={auth.user.lastName || ""}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <TextField.Root
              placeholder="john@example.com"
              value={auth.user.email || ""}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Professional Summary</label>
            <TextArea
              placeholder="Tell us about yourself, your skills, and experience..."
              rows={5}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Resume URL</label>
            <TextField.Root
              placeholder="https://example.com/resume.pdf"
              type="url"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
              <TextField.Root
                placeholder="https://linkedin.com/in/yourprofile"
                type="url"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Portfolio URL</label>
              <TextField.Root
                placeholder="https://yourportfolio.com"
                type="url"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Skills</label>
            <TextArea
              placeholder="React, TypeScript, Node.js, MongoDB..."
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
              Save Profile
            </Button>
            <Button variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </Theme>

      {/* Profile Strength Indicator */}
      <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Profile Strength</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Basic Information</span>
            <span className="text-sm font-medium text-green-600">✓ Complete</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Professional Summary</span>
            <span className="text-sm font-medium text-yellow-600">Pending</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Resume Upload</span>
            <span className="text-sm font-medium text-yellow-600">Pending</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Skills</span>
            <span className="text-sm font-medium text-yellow-600">Pending</span>
          </div>
        </div>
        <div className="mt-4 bg-white rounded h-2">
          <div className="bg-indigo-600 h-2 rounded" style={{ width: "40%" }}></div>
        </div>
        <p className="text-sm text-indigo-700 mt-2">40% Complete</p>
      </div>
    </div>
  );
}

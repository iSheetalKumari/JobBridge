"use client";

import { useState } from "react";
import Link from "next/link";
import { handleSignOut } from "../actions";

interface User {
  firstName?: string | null;
  email?: string | null;
}

export default function HeaderMenu({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
      >
        {user.firstName || "Account"}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-md p-2">
          <Link
            href="/dashboard"
            className="block px-4 py-2 hover:bg-gray-100 text-sm"
          >
            Dashboard
          </Link>

          <form action={handleSignOut}>
            <button
              type="submit"
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Sign Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

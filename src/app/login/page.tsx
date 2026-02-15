"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  useEffect(() => {
    // Redirect to WorkOS login endpoint
    const clientId = process.env.NEXT_PUBLIC_WORKOS_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_AUTHKIT_REDIRECT_URI;
    
    if (clientId && redirectUri) {
      const loginUrl = `https://api.workos.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
      // Store the redirect URL so we can redirect after auth
      window.location.href = loginUrl;
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Redirecting to Login</h1>
        <p className="text-gray-600 mb-4">You are being redirected to the login page...</p>
        <p className="text-sm text-gray-500">If you are not redirected, please check your browser console for errors.</p>
        <div className="mt-6">
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

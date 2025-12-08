// app/components/Header.jsx
import { withAuth, getSignInUrl, getSignUpUrl } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';
import HeaderMenu from './HeaderMenu';

export default async function Header() {
  let user = null;
  let signInUrl = '/login';
  let signUpUrl = '/signup';

  try {
    const auth = await withAuth();
    user = auth.user;
    signInUrl = await getSignInUrl();
    try {
      signUpUrl = await getSignUpUrl();
    } catch (e) {
      /* non-fatal */
    }
  } catch (error) {
    // Not authenticated or middleware not configured for this path
    console.debug('Auth not available in Header');
  }

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">JobBridge</Link>
          <nav className="hidden sm:flex gap-6 text-sm text-gray-700">
            <Link href="/" className="hover:text-blue-600 font-medium transition">Home</Link>
            <Link href="/jobs" className="hover:text-blue-600 font-medium transition">Browse Jobs</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <Link href={signInUrl} className="text-sm text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100 transition">Login</Link>
          ) : null}
          <HeaderMenu user={user} signInUrl={signInUrl} signUpUrl={signUpUrl} />
        </div>
      </div>
    </header>
  );
}

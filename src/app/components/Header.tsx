import { withAuth, getSignInUrl, getSignUpUrl } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';
import HeaderMenu from './HeaderMenu';

export default async function Header() {
  let user = null;
  let signInUrl = '/login';

  try {
    const auth = await withAuth();
    user = auth.user;
    signInUrl = await getSignInUrl();
    try {
      await getSignUpUrl();
    } catch {
      console.debug('Sign-up URL unavailable');
    }
  } catch {
    console.debug('Auth not available in Header');
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LEFT SIDE LOGO + NAV */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-extrabold text-blue-600">
            JobBridge
          </Link>

          <nav className="hidden md:flex gap-8 text-gray-700 text-sm">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/jobs" className="hover:text-blue-600 transition">Browse Jobs</Link>
            <Link href="/new-listing" className="hover:text-blue-600 transition">Post Job</Link>
          </nav>
        </div>

        {/* RIGHT SIDE LOGIN / USER MENU */}
        <div className="flex items-center gap-4">
          {!user ? (
            <Link
              href={signInUrl}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <HeaderMenu user={user} />
          )}
        </div>
      </div>
    </header>
  );
}

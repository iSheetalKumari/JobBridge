// app/page.tsx (or app/home/page.tsx depending on your routing)
import Link from 'next/link';
import {
  getSignUpUrl,
  withAuth,
} from '@workos-inc/authkit-nextjs';

import { handleSignOut } from './actions'

export default async function HomePage() {
  const { user } = await withAuth();

  let signUpUrl;
  try {
    signUpUrl = await getSignUpUrl();
  } catch (error) {
    console.error('Error getting signup URL:', error);
    signUpUrl = '/error';
  }

  if (!user) {
    return (
      <>
        <a href="/login"></a>
        <Link href={signUpUrl}></Link>
      </>
    );
  }

  return (
    <>
      <form action={handleSignOut}>
        <p>Welcome back{user.firstName && `, ${user.firstName}`}</p>
        <button type="submit">Sign out</button>
      </form>
    </>
  );
}

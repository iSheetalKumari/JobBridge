import Link from 'next/link';
import {
  getSignUpUrl,
  withAuth,
} from '@workos-inc/authkit-nextjs';
import { handleSignOut } from './actions'
import { JobModel, addOrgAndUserData, Job } from '@/models/job';
import connectToDatabase from '@/lib/mongo';
import Jobs from '@/app/components/Jobs';
import FeaturedJobs from '@/app/components/FeaturedJobs';

export default async function HomePage() {
  let user = null;
  let signUpUrl = '/auth/callback';

  try {
    const auth = await withAuth();
    user = auth?.user ?? null;
    signUpUrl = await getSignUpUrl();
  } catch (error) {
    console.debug('Auth not available on homepage');
  }

  if (!user) {
    return (
      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Find Your Dream Job</h1>
            <p className="text-xl text-blue-100 mb-8">Connect with thousands of job opportunities from top companies.</p>
            {/* No center-login CTA; use header account menu instead */}
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Featured Opportunities</h2>
            <FeaturedJobs />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Welcome back{user.firstName && `, ${user.firstName}`}!</h2>
        <p className="text-gray-600 mb-6">Ready to explore new opportunities?</p>
        <form action={handleSignOut} className="inline">
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Recent Job Postings</h3>
        <RecentJobs userId={user.id} />
      </div>
    </div>
  );
}

// FeaturedJobs is a client component now (src/app/components/FeaturedJobs.tsx)

async function RecentJobs({ userId }: { userId: string }) {
  try {
    await connectToDatabase();
    const jobsRaw = await JobModel.find().sort({ createdAt: -1 }).limit(12).lean();
    const jobs = await addOrgAndUserData((jobsRaw as unknown as Job[]) || [], null);
    
    if (jobs.length === 0) {
      return <p className="text-gray-600">No jobs available yet.</p>;
    }

    return <Jobs jobs={jobs} header="Latest Job Postings" />;
  } catch (error) {
    console.error('Error loading recent jobs:', error);
    return <p className="text-red-500">Unable to load jobs at this time.</p>;
  }
}

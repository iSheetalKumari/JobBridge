import SearchBar from "@/app/components/SearchBar";
import FeaturedJobs from "@/app/components/FeaturedJobs";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Find Your Dream Job</h1>
        <p className="mt-3 text-gray-600">Connect with thousands of job opportunities from top companies.</p>

        <div className="mt-8">
          <SearchBar />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center">Featured Opportunities</h2>
        <div className="mt-6">
          <FeaturedJobs />
        </div>
      </section>
    </div>
  );
}

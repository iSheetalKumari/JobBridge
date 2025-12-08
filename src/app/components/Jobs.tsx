import JobRows from "./JobRows";
import Link from 'next/link';

type JobsProps = {
        jobs?: any[];
        header?: string;
};

export default function Jobs({ jobs = [], header = "Recent Jobs" }: JobsProps) {
        return (
                <div className="container mx-auto px-4">
                        <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">{header}</h2>
                        </div>

                        {jobs && jobs.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                                        <p className="text-gray-600 text-lg">No jobs available at the moment. Check back soon!</p>
                                </div>
                        ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {jobs.map((job: any) => (
                                                <JobRows key={job._id || job.id || Math.random()} job={job} />
                                        ))}
                                </div>
                        )}
                </div>
        );
}
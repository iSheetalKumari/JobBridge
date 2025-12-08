"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

type JobRowProps = {
        job?: any;
};

export default function JobRows({ job }: JobRowProps) {
        const [liked, setLiked] = useState(false);

        const company = job?.orgName || job?.company || "Spotify";
        const title = job?.title || "Product Designer";
        const meta = job ? `${job.remote || 'Remote'} · ${job.city || ''} ${job.country || ''} · ${job.type || 'Full-Time'}` : "Remote · Noida, India · Full-Time";
        const time = job?.createdAt ? new Date(job.createdAt).toLocaleString() : "2 hours ago";
        const imgSrc = job?.jobIcon || "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg";

        return (
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex flex-col gap-4 relative w-full border border-gray-100">
                        <div className="absolute top-4 right-4 cursor-pointer z-10 hover:scale-110 transition-transform" onClick={() => setLiked(!liked)}>
                                <FontAwesomeIcon
                                        icon={liked ? solidHeart : regularHeart}
                                        className={`w-5 h-5 ${liked ? "text-red-500" : "text-gray-300 hover:text-gray-400"}`}
                                />
                        </div>

                        <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                        <img
                                                className="w-16 h-16 object-contain rounded-md bg-gray-50 p-2"
                                                src={imgSrc}
                                                alt="company logo"
                                        />
                                </div>

                                <div className="flex flex-col flex-1">
                                        <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{company}</div>
                                        <h3 className="text-lg font-bold text-gray-900 mt-1 leading-tight">{title}</h3>
                                        <div className="text-sm text-gray-600 mt-2">{meta}</div>
                                </div>
                        </div>

                        <div className="text-sm text-gray-600 line-clamp-2 flex-grow">
                                {job?.description || 'No description available.'}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="text-xs text-gray-400">{time}</div>
                                <div className="flex gap-2">
                                        <a
                                                href={`/show/${job?._id || job?.id}`}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
                                        >
                                                View Job
                                        </a>
                                        <button
                                                onClick={() => setLiked(!liked)}
                                                className={`px-3 py-2 rounded-md text-sm font-medium transition ${liked ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}`}
                                        >
                                                {liked ? '❤ Saved' : '♡ Save'}
                                        </button>
                                </div>
                        </div>
                </div>
        );
}

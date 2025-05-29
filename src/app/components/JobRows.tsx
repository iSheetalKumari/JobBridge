"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function JobRows() {
    const [liked, setLiked] = useState(false);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex gap-4 relative max-w-2xl mx-auto my-4">
            <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setLiked(!liked)}>
                <FontAwesomeIcon
                    icon={liked ? solidHeart : regularHeart}
                    className={`w-5 h-5 ${liked ? "text-red-500" : "text-gray-400"}`}
                />
            </div>

            <div className="flex items-center">
                <img
                    className="w-12 h-12 object-contain"
                    src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
                    alt="Spotify Logo"
                />
            </div>

            <div className="flex flex-col w-full">
                <div className="text-gray-500 text-sm">Spotify</div>
                <div className="text-xl font-semibold text-gray-800 mb-1">Product Designer</div>
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Remote · Noida, India · Full-Time</span>
                    <span className="text-gray-400">2 hours ago</span>
                </div>
            </div>
        </div>
    );
}

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

const HistoryPage = () => {
  const navigate = useNavigate();
  const { history } = useSelector((state) => state.history);
  const { allVideos } = useSelector((state) => state.video);
  const { userInfo } = useSelector((state) => state.auth);

  // Check if allVideos is an array and has at least one element
  const watchedVideos = Array.isArray(allVideos) && allVideos.length > 0
    ? allVideos.filter((video) => history.includes(video._id))
    : []; // Default to empty array if allVideos is not an array or is empty

  return (
    <>
      {userInfo ? (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-6">Watch History</h2>

          {watchedVideos.length === 0 ? (
            <p className="text-gray-600">No videos watched yet.</p>
          ) : (
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-8">
              {watchedVideos.map((video) => (
                <div
                  key={video.videoId}
                  className="flex flex-col gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                  onClick={() => navigate(`/video/${video.videoId}`)}
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold">{video.title}</h3>
                  <p className="text-gray-600 text-sm">{video.views} views</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4 h-96 items-center flex-col justify-center">
          <h1 className="text-center font-bold text-blue-500 text-2xl">
            Please Login to View your watched history...
          </h1>
          <Link
            to={"/login"}
            className="text-blue-400 font-serif border-2 border-blue-500 px-4 rounded-2xl hover:scale-x-110 duration-200 transition-all hover:underline text-4xl"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default HistoryPage;

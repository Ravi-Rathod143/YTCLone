import { IoLogoYoutube } from "react-icons/io5";
import { FaRegEye, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setVideoId } from "../redux/videoSlice";
import React from "react";

const VideoCard = ({ video }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        dispatch(setVideoId(video._id));
        localStorage.setItem("vidId", video._id);
        navigate(`/video/${video.videoId}`);
      }}
      className="cursor-pointer group max-w-screen hover:-translate-y-1 duration-200 transition-all flex w-73 max-lg:w-60 max-md:w-80 max-sm:w-96 flex-col"
    >
      {/* Thumbnail */}
      <div>
        <img src={video.thumbnailUrl} className="h-56 p-1  group-hover:scale-105 duration-200 transition-all rounded-2xl" />
      </div>

      <div className="p-1 flex gap-2">
        {/* Channel Logo */}
        <div>
          <img
            src={`${video?.uploader?.avatar}`}
            className="rounded-full w-10"
          />
        </div>
        <div>
          {/* Title */}
          <div className="overflow-hidden font-bold">
            <p>{video.title}</p>
          </div>

          {/* Channel Name */}
          <div>{video?.channel?.channelName}</div>

          {/* Views */}
          <div className="flex justify-around items-center">
            <p className="flex gap-1.2 justify-center items-center">
              <FaRegEye /> {video?.views}
            </p>
            <p className="flex gap-1.2 justify-center items-center">
              <FaThumbsUp /> {video?.likes}
            </p>
            <p className="flex gap-1.2 justify-center items-center">
              <FaThumbsDown /> {video?.dislikes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
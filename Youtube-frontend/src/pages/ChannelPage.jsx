import { RiVideoUploadFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React,{ useState } from "react";
import { setVideoDetails, setVideoId } from "../redux/videoSlice";
import { useVideos } from "../hooks/useVideos";
import { enqueueSnackbar } from "notistack";
import { useChannel } from "../hooks/useChannel";

const ChannelPage = () => {
  const { channelDetails } = useSelector((state) => state.channel);
  const { userDetails, userInfo } = useSelector((state) => state.auth);
  const { deleteVideo } = useVideos();
  const { deleteChannel } = useChannel();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("Videos");

  return (
    <>
      {userInfo ? (
        <div className="flex flex-col mt-2 mx-8 max-md:mx-6 max-sm:mx-0">
          {userDetails?.channels?.length > 0 ? (
            <>
              {/* Banner Image */}
              <div
                className="h-52 w-full inset-0 bg-cover bg-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                style={{
                  backgroundImage: `url(${channelDetails?.channelBanner})`,
                }}
              ></div>

              {/* Channel Info Section */}
              <div className="flex mt-2 justify-between items-center p-4j max-md:p-2 max-md:flex-col">
                {/* Channel profile image and info */}
                <div className="flex items-center gap-4 max-md:flex-col">
                  {/* Channel Picture, Name and Subscribers */}
                  <img
                    src={`${channelDetails?.owner?.avatar}`}
                    alt="Channel"
                    className="rounded-full w-24 h-24"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {channelDetails?.channelName}
                    </h2>
                    <p className="text-gray-600">
                      Subscribers: {channelDetails?.subscribers}
                    </p>
                    <p className="text-gray-800">
                      {channelDetails?.description}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:mt-0">
                  <div className="flex gap-4">
                    {userDetails?._id !== channelDetails?.owner?._id && (
                      <button className="border border-black hover:scale-x-110 duration-150 transition-all cursor-pointer hover:bg-black hover:text-white hover:-translate-y-1.5 py-2 px-6 rounded-full">
                        Subscribe
                      </button>
                    )}
                    <div className="flex items-center justify-end">
                      <Link
                        to={"/create"}
                        className="border border-green-400 rounded-full hover:bg-green-600 hover:text-white hover:scale-x-110 hover:-translate-y-1.5 duration-150 transition-all px-4 py-2"
                      >
                        Create
                        {userDetails?.channels?.length > 0
                          ? "Another"
                          : "Your"}{" "}
                        channel
                      </Link>
                    </div>
                  </div>
                  {/* Edit or Delete your channel */}
                  {userDetails?._id === channelDetails?.owner?._id && (
                    <div className="flex gap-4">
                      <button
                        className="border border-blue-400 hover:scale-x-110 hover:-translate-y-1.5 duration-150 transition-all cursor-pointer hover:bg-blue-600 hover:text-white py-2 px-6 rounded-full "
                        onClick={() => {
                          navigate("/create", {
                            state: { oldChannelData: channelDetails },
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="border border-red-500 hover:scale-x-110 duration-150 hover:-translate-y-1.5 transition-all cursor-pointer hover:bg-red-600 hover:text-white py-2 px-6 rounded-full"
                        onClick={async () => {
                          const msg = await deleteChannel(channelDetails?._id);
                          enqueueSnackbar(msg, { variant: "success" });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-4 ml-12 mb-1">
                <button
                  className={`text-xl bg-slate-200 cursor-pointer rounded-lg px-2 py-1 hover:bg-slate-400 hover:-translate-y-1.5 duration-150 transition-all ${
                    isActive === "Videos"
                      ? "underline bg-slate-600 text-white"
                      : ""
                  }`}
                  onClick={() => setIsActive("Videos")}
                >
                  Videos
                </button>
                <button
                  className={`text-xl bg-slate-200 cursor-pointer rounded-lg px-2 py-1 hover:bg-slate-400  hover:-translate-y-1.5 duration-150 transition-all ${
                    isActive === "About"
                      ? "underline bg-slate-600 text-white"
                      : ""
                  }`}
                  onClick={() => setIsActive("About")}
                >
                  About
                </button>
              </div>
              <hr />

              {/* Videos Section */}
              {isActive === "Videos" && (
                <div className="p-4 max-md:p-2 grid grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                  {channelDetails?.videos?.map((video) => (
                    <Link
                      to={`/video/${video.videoId}`}
                      key={video.videoId}
                      className="relative group flex flex-col"
                    >
                      {/* Thumbnail */}
                      <div className="relative">
                        <img
                          src={video.thumbnailUrl}
                          className="rounded-xl h-56 object-cover group-hover:opacity-40 transition-all"
                          alt="thumbnail"
                        />
                      </div>

                      <div className="absolute top-2 left-1/4 opacity-0 max-md:opacity-100 group-hover:opacity-100 transition-opacity duration-300 flex gap-4 z-10">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(setVideoDetails(video));
                            dispatch(setVideoId(video._id));
                            navigate(`/updateVideo/${video.videoId}`);
                          }}
                          className="cursor-pointer text-white bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all hover:-translate-y-1.5"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            dispatch(setVideoId(video._id));
                            const res = await deleteVideo(video._id);
                            enqueueSnackbar(res, { variant: "success" });
                          }}
                          className="cursor-pointer text-white bg-red-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all hover:-translate-y-1.5"
                        >
                          Delete
                        </button>
                      </div>

                      {/* Title */}
                      <div className="mt-2 font-semibold">{video.title}</div>
                      {/* Views */}
                      <div className="text-gray-500 text-sm">
                        {video.views} views
                      </div>
                    </Link>
                  ))}
                  {/* Upload New Video */}
                  <Link
                    to={"/upload"}
                    className="border items-center justify-center flex rounded-lg border-blue-400 hover:scale-110 duration-200 transition-all group hover:bg-blue-400 cursor-pointer"
                  >
                    <RiVideoUploadFill className="text-9xl text-blue-400 group-hover:text-white" />
                  </Link>
                </div>
              )}
              {isActive === "About" && (
                <div className="flex mt-4 items-center justify-center">
                  <div className="flex  py-6 px-12 rounded-2xl bg-slate-200  flex-col">
                    <h2 className="text-center text-4xl font-semibold underline mb-2">
                      {channelDetails?.channelName}
                    </h2>
                    {/* Channel Description */}
                    <div>
                      <h2 className="text-lg font-bold">Description</h2>
                      <p className="text-gray-700 ml-4">
                        {channelDetails?.description}
                      </p>
                    </div>

                    {/* Channel Details */}
                    <div>
                      <h2 className="text-lg font-bold">Details</h2>
                      <div className="text-gray-700 ml-4">
                        <p>
                          <span className="font-semibold">
                            Email for Business Inquiries:
                          </span>{" "}
                          {channelDetails?.owner?.email}
                        </p>
                        <p>
                          <span className="font-semibold">Location:</span>{" "}
                          {channelDetails?.location}
                        </p>
                      </div>
                    </div>

                    {/* Channel Stats */}
                    <div>
                      <h2 className="text-lg font-bold">Stats</h2>
                      <div className="text-gray-700 ml-4">
                        <p>
                          <span className="font-semibold">Joined: </span>
                          {channelDetails?.joinedDate}
                        </p>
                        <p>
                          <span className="font-semibold">Total Videos: </span>
                          {channelDetails?.videos?.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="text-center font-bold justify-center items-center flex flex-col gap-2">
                <h1 className=" text-2xl">
                  You don't have a channel right now, Create One!!!
                </h1>
                <Link
                  to={"/create"}
                  className="underline hover:scale-110 w-fit hover:bg-blue-500 hover:text-white py-2 px-4  border rounded-full border-blue-500 duration-200 transition-all"
                >
                  Create Channel
                </Link>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex gap-4 h-96 items-center flex-col justify-center">
          <h1 className="text-center font-bold text-blue-500 text-2xl">
            Please Login to View videos...
          </h1>
          <Link
            to={"/login"}
            className="text-blue-400 font-serif border-2 border-blue-500 px-4  rounded-2xl hover:scale-x-110 duration-200 transition-all hover:underline text-4xl"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default ChannelPage;
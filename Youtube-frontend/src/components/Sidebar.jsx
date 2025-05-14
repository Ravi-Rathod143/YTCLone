import {
    MdHomeFilled,
    MdOutlineSubscriptions,
    MdHistory,
  } from "react-icons/md";
  import { SiYoutubeshorts } from "react-icons/si";
  import { FaUserCircle } from "react-icons/fa";
  import { Link } from "react-router-dom";
  import { enqueueSnackbar } from "notistack";
  import { useSelector } from "react-redux";
  import React from "react";


  const Sidebar = () => {
    const { channelDetails } = useSelector((state) => state?.channel);
    return (
      <div className="w-44 max-md:absolute shadow-lg rounded-xl shadow-black max-md:z-50 bg-white p-4 flex flex-col space-y-6 h-screen">
        {/* Home */}
        <Link
          to={"/"}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
        >
          <MdHomeFilled className="text-2xl" />
          <span className="text-md font-semibold">Home</span>
        </Link>
  
        {/* Shorts */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
          onClick={() =>
            enqueueSnackbar("Shorts Page Upcoming", { variant: "info" })
          }
        >
          <SiYoutubeshorts className="text-2xl" />
          <span className="text-md font-semibold">Shorts</span>
        </div>
  
        {/* Subscriptions */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
          onClick={() => {
            enqueueSnackbar(
              `Total Subscribers: ${channelDetails?.subscribers || 'NA'}`,
              {
                variant: "success",
              }
            );
          }}
        >
          <MdOutlineSubscriptions className="text-2xl" />
          <span className="text-md font-semibold">Subscriptions</span>
        </div>
  
        <hr className="border-gray-300" />
  
        {/* Your Videos */}
        <Link
          to={"/channel"}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
        >
          <FaUserCircle className="text-2xl" />
          <span className="text-md font-semibold">Your Videos</span>
        </Link>
  
        {/* History */}
        <Link
          to="/history"
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
        >
          <MdHistory className="text-2xl" />
          <span className="text-md font-semibold">History</span>
        </Link>
      </div>
    );
  };
  
  export default Sidebar;
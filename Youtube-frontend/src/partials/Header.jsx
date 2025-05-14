/* eslint-disable react-hooks/exhaustive-deps */
import Search from "../components/Search";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import React,{ useEffect } from "react";
import { IoLogOut } from "react-icons/io5";
import { enqueueSnackbar } from "notistack";
import { useChannel } from "../hooks/useChannel";
import { useVideos } from "../hooks/useVideos";

const Header = ({ showSidebar, setShowSidebar }) => {
  const { getUserDetails, logout } = useAuth();
  const { userInfo, userDetails } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useChannel();
  useVideos();

  useEffect(() => {
    const findData = async () => {
      if (!userInfo) return;
      await getUserDetails(userInfo);
    };

    findData();
  }, [userInfo]);

  return (
    <>
      <div className="flex justify-between max-lg:flex-col gap-2 max-lg:items-center mt-2 mx-2">
        <div className="flex space-x-4 items-center">
          {/* hamburger icon */}
          <div
            onClick={() => setShowSidebar(!showSidebar)}
            className="hover:-translate-y-1.5 duration-150 transition-all"
          >
            <GiHamburgerMenu className="text-3xl cursor-pointer" />{" "}
          </div>

          {/* youtube logo */}
          <Link
            to={"/"}
            className="flex hover:underline hover:-translate-y-1.25 duration-150 transition-all items-center gap-1 justify-center"
          >
            <img src="/Youtube-logo.png" className="w-10 h-8 rounded-xl" />
            <span className="font-bold text-xl">YouTube</span>
          </Link>
        </div>

        {/* Search component */}
        <Search />

        {/* User profile */}
        <div className="text-xl cursor-pointer">
          {!userInfo ? (
            <button
              className="cursor-pointer border-2 rounded-2xl hover:scale-x-110 duration-200 transition-all hover:bg-blue-400 hover:text-white border-blue-400 py-1 px-3"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          ) : (
            <div className="flex gap-2 justify-center items-center">
              <div
                className="flex gap-2 justify-center items-center pr-2 border-r-2"
                onClick={() =>
                  enqueueSnackbar("User Profile upcoming", { variant: "info" })
                }
              >
                {userDetails?.avatar ? (
                  <img
                    src={`${userDetails?.avatar}`}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <FaRegUserCircle className="text-4xl" />
                )}
                <h1>{userDetails?.username}</h1>
              </div>
              {userDetails && (
                <IoLogOut
                  className="text-4xl text-red-400 duration-200 transition-all hover:text-red-500 hover:-translate-y-1.5"
                  onClick={async () => {
                    const res = await logout();
                    enqueueSnackbar(res, { variant: "success" });
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
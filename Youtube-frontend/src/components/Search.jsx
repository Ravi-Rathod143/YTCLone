import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setSearchInput } from "../redux/videoSlice"; // Apna slice se action
import React from "react";

const Search = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex items-center border rounded-full">
        <input
          type="text"
          onChange={(e) => dispatch(setSearchInput(e.target.value))}
          className="w-64 sm:w-80 px-4 py-2 rounded-full rounded-r-none outline-none"
          placeholder="Search"
        />
        <button className="bg-slate-200 rounded-full rounded-l-none hover:bg-slate-300 cursor-pointer text-2xl py-2 px-4">
          <IoSearchSharp />
        </button>
      </div>
    </>
  );
};

export default Search;
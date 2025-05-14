import filterOptions from "../utils/DummyFilterOptions";
import React from "react";

const FilterButtons = ({ setSelectedCategory, selectedCategory }) => {
  return (
    <div className="flex gap-3  flex-wrap">
      {filterOptions.map((option) => (
        <button
          key={option}
          onClick={() => setSelectedCategory(option)}
          className={`py-1 px-4 cursor-pointer rounded-full text-sm ${
            selectedCategory === option
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
import { useSelector } from "react-redux";
import FilterButtons from "../components/FilterButtons";
import VideoCard from "../components/VideoCard";
import { useVideos } from "../hooks/useVideos";
import React, { useState } from "react";

const HomePage = () => {
  useVideos();
  const { allVideos, searchInput } = useSelector((state) => state.video);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVideos = Array.isArray(allVideos)
  ? allVideos.filter((video) => {
      const matchesCategory =
        selectedCategory === "All" ||
        (video.title && video.title.toLowerCase().includes(selectedCategory.toLowerCase()));  // Safe check here
      const matchesSearch = video.title && video.title.toLowerCase().includes(searchInput.toLowerCase()); // Safe check here

      return matchesCategory && matchesSearch;
    })
  : [];


//   const filteredVideos = (allVideos[0] || []).filter((video) => {
//     const matchesCategory =
//       selectedCategory === "All" ||
//       video.title.toLowerCase().includes(selectedCategory.toLowerCase());
//     const matchesSearch = video.title
//       .toLowerCase()
//       .includes(searchInput.toLowerCase());

//     return matchesCategory && matchesSearch;
//   });

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1400px] flex flex-col">
        <div className="overflow-x-auto whitespace-nowrap px-4 py-2 scrollbar-hide">
          <FilterButtons
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>

        <div className="grid px-4 py-4 grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
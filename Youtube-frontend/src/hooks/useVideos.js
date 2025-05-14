/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllVideos, setVideoDetails } from "../redux/videoSlice";

export const useVideos = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllVideo = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_ROUTES}/videos/`);
        dispatch(setAllVideos(res?.data));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    getAllVideo();
  }, []);

  const uploadVideo = async (videoData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_ROUTES}/videos/`,
        { videoData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res?.data?.message;
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const getOneVideo = async (videoId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_ROUTES}/videos/${videoId}`
      );
      dispatch(setVideoDetails(res?.data));
      localStorage.setItem("vidId", res?.data?._id);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  const updateVideo = async (vidId, updatedData) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_ROUTES}/videos/${vidId}`,
        { updatedData },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Fixed typo
          },
        }
      );
      return res?.data?.message;
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  const deleteVideo = async (vidId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_ROUTES}/videos/${vidId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res?.data?.message;
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const updateLikes = async (vidId) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_ROUTES}/videos/${vidId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setVideoDetails(res?.data?.updatedVideo)); // update local state
      return res?.data?.updatedVideo;
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  return {
    uploadVideo,
    getOneVideo,
    deleteVideo,
    updateVideo,
    updateLikes, // ✅ Exposed like function
  };
};










// /* eslint-disable react-hooks/exhaustive-deps */
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setAllVideos, setVideoDetails } from "../redux/videoSlice";

// export const useVideos = () => {
//   const token = localStorage.getItem("token");
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const getAllVideo = async () => {
//       const res = await axios.get(`${import.meta.env.VITE_API_ROUTES}/videos/`);
//       dispatch(setAllVideos(res?.data));
//     };

//     getAllVideo();
//   }, []);

//   const uploadVideo = async (videoData) => {
//     const res = await axios.post(
//       `${import.meta.env.VITE_API_ROUTES}/videos/`,
//       { videoData },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return res?.data?.message;
//   };

//   const getOneVideo = async (videoId) => {
//     const res = await axios.get(
//       `${import.meta.env.VITE_API_ROUTES}/videos/${videoId}`
//     );

//     dispatch(setVideoDetails(res?.data));
//     localStorage.setItem("vidId", res?.data?._id);
//   };

//   const updateVideo = async (vidId, updatedData) => {
//     const res = await axios.put(
//       `${import.meta.env.VITE_API_ROUTES}/videos/${vidId}`,
//       { updatedData },
//       {
//         headers: {
//           Authorization: `Bearere ${token}`,
//         },
//       }
//     );
//     return res?.data?.message;
//   };

//   const deleteVideo = async (vidId) => {
//     const res = await axios.delete(
//       `${import.meta.env.VITE_API_ROUTES}/videos/${vidId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return res?.data?.message;
//   };

//   return { uploadVideo, getOneVideo, deleteVideo, updateVideo };
// };
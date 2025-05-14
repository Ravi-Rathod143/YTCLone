import React,{ useState } from "react";
import { useVideos } from "../hooks/useVideos";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const UpdateVideoPage = () => {
  const { videoDetails, vidId } = useSelector((state) => state.video);

  const [title, setTitle] = useState(videoDetails.title);
  const [description, setDescription] = useState(videoDetails.description);
  const [videoId, setVideoId] = useState(videoDetails.videoId);
  const [thumbnailUrl, setThumbnailUrl] = useState(videoDetails.thumbnailUrl);
  const [error, setError] = useState("");

  const { updateVideo } = useVideos();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple Validation
    if (!title || !description || !videoId) {
      setError("Please fill all the required fields!");
      enqueueSnackbar(error, { variant: "error" });
      return;
    }

    try {
      const videoData = {
        title,
        description,
        videoId,
        thumbnailUrl,
      };

      const res = await updateVideo(vidId, videoData);
      enqueueSnackbar(res, { variant: "success" });
    } catch (err) {
      setError(err?.response?.data?.message);
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 underline text-blue-500">
        Update Video Details
      </h2>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        />

        <input
          type="text"
          placeholder="YouTube Video ID (e.g., dQw4w9WgXcQ)"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          placeholder="Thumbnail Image URL (optional)"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 cursor-pointer text-white py-3 rounded-lg font-bold hover:bg-blue-700 hover:scale-105 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateVideoPage;
import React,{ useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useChannel } from "../hooks/useChannel";
import { enqueueSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";

const CreateChannelPage = () => {
  const loc = useLocation();
  const oldChannelData = loc?.state?.oldChannelData;
  const editMode = !!oldChannelData;

  const [channelName, setChannelName] = useState(
    oldChannelData?.channelName || ""
  );
  const [description, setDescription] = useState(
    oldChannelData?.description || ""
  );
  const [location, setLocation] = useState(oldChannelData?.location || "");
  const [channelBanner, setChannelBanner] = useState(
    oldChannelData?.channelBanner || ""
  );
  const [error, setError] = useState("");

  const { createChannel, updateChannelInfo } = useChannel();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelName || !description || !channelBanner || !location) {
      setError("All fields are required!");
      enqueueSnackbar("All fields are required!", { variant: "error" });
      return;
    }

    try {
      const channelData = { channelName, description, location, channelBanner };

      if (editMode) {
        await updateChannelInfo(oldChannelData._id, channelData);
        enqueueSnackbar("Channel Updated Successfully", { variant: "success" });
        navigate("/channel");
      } else {
        const res = await createChannel(channelData);
        enqueueSnackbar(res, { variant: "success" });
        navigate("/channel");
      }
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Something went wrong");
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  return (
    <div className="border mt-4 w-full h-auto p-4 rounded-xl bg-gray-100">
      <h2 className="text-2xl font-bold m-4">How you'll appear</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl flex flex-col items-center mx-auto space-y-4"
      >
        <div>
          <FaUserCircle className="h-36 w-36 text-blue-600 rounded-full" />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          className="w-full p-3 rounded-lg border text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Write a short Description about your channel"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg border text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        />

        <input
          type="text"
          placeholder="Paste Banner Image URL"
          value={channelBanner}
          onChange={(e) => setChannelBanner(e.target.value)}
          className="w-full p-3 rounded-lg border text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 rounded-lg border text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="flex gap-8 justify-end mt-4">
          <button
            type="submit"
            className="py-3 px-10 cursor-pointer bg-blue-600 hover:bg-blue-800 hover:scale-x-105 transition text-white font-bold rounded-lg shadow-md"
          >
            {editMode ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChannelPage;
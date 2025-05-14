// video.controller.js

import Video from "../models/video.model.js";
import Channel from "../models/channel.model.js";

// export const uploadVideo = async (req, res) => {
//   const { title, thumbnailUrl, videoId, description, channelId } = req.body.videoData;
//   console.log("Uploader ID:", req.user?.id);
//   try {
//     // Check if videoId already exists
//     const existingVideo = await Video.findOne({ videoId });
//     if (existingVideo) {
//       return res.status(400).json({ message: "Video already exists." });
//     }
//     const uploaderId = req.user?.id;
//     // Creating new video
//     const newVideo = await Video.create({
//       title,
//       thumbnailUrl,
//       videoId,
//       description,
//       channel: channelId,
//       uploader: uploaderId,
//     });

//     // Add video to channel's videos list
//     await Channel.findByIdAndUpdate(channelId, {
//       $push: { videos: newVideo._id },
//     });

//     return res.status(201).json({ message: "Video Uploaded successfully", newVideo });
//   } catch (error) {
//     console.error("Upload video error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, thumbnailUrl, videoId, channelId } = req.body.videoData;

    const uploaderId = req.user?.id;
    if (!uploaderId) {
      return res.status(401).json({ message: "Unauthorized: uploader ID missing." });
    }

    const newVideo = new Video({
      title,
      description,
      thumbnailUrl,
      videoId,
      channel: channelId,
      uploader: uploaderId, 
    });

    const savedVideo = await newVideo.save();
    res.status(201).json({ message: "Video uploaded successfully", video: savedVideo });
  } catch (error) {
    console.error("Upload video error:", error);
    res.status(500).json({ message: "Failed to upload video" });
  }
};


export const getAllVideo = async (req, res) => {
  try {
    const foundVideos = await Video.find()
      .populate("channel", "channelName")
      .populate("uploader", ["username", "avatar"]);
    return res.status(200).json(foundVideos);
  } catch (error) {
    console.error("Get all videos error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOneVideo = async (req, res) => {
  try {
    const foundVideo = await Video.findOne({ videoId: req.params.id })
      .populate("channel", ["channelName", "subscribers"])
      .populate("uploader", ["username", "avatar"])
      .populate({
        path: "comments",
        select: "text user",
        options: { limit: 10 },
      });
    if (!foundVideo) return res.status(404).json({ message: "Video not found" });
    return res.status(200).json(foundVideo);
  } catch (error) {
    console.error("Get video by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const foundVideo = await Video.findById(req.params.id);
    if (!foundVideo) return res.status(404).json({ message: "Video not found" });

    if (foundVideo.uploader.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized to update" });
    }

    const updates = req.body;
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    return res.status(200).json({ message: "Video Updated", updatedVideo });
  } catch (error) {
    console.error("Update video error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const foundVideo = await Video.findOneAndDelete({
      _id: req.params.id,
      uploader: req.user.id,
    });

    if (!foundVideo) {
      return res.status(404).json({ message: "Video not found or Unauthorized" });
    }

    await Channel.findByIdAndUpdate(foundVideo.channel, {
      $pull: { videos: foundVideo._id },
    });

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Delete video error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

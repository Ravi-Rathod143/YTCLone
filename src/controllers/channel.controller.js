import Channel from "../models/channel.model.js";
import User from "../models/user.model.js";

// Create a new channel
export const createChannel = async (req, res) => {
  const { channelName, description, location, channelBanner } = req.body.channelData;

  try {
    // Check if the channel name already exists
    const existingChannel = await Channel.findOne({ channelName });
    if (existingChannel) {
      return res.status(400).json({ message: "Channel name already exists" });
    }

    // Create new channel
    const newChannel = await Channel.create({
      channelName,
      owner: req.user.id,
      description,
      location,
      joinedAt: new Date(),
      channelBanner,
    });

    // Add channel ID to the owner's user document
    await User.findByIdAndUpdate(req.user.id, {
      $push: { channels: newChannel._id },
    });

    return res.status(201).json({ message: "Channel Created", newChannel });
  } catch (error) {
    console.error("Error in createChannel:", error.stack);  // Full error logging
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get channel information by ID
export const getChannelInfo = async (req, res) => {
  try {
    const existingChannel = await Channel.findById(req.params.id)
      .populate("owner", "username email avatar")  // Populate owner details
      .populate("videos");  // Populate videos linked with the channel

    if (!existingChannel)
      return res.status(404).json({ message: "Channel not found" });

    return res.status(200).json(existingChannel);
  } catch (error) {
    console.error("Error in getChannelInfo:", error.stack);  // Full error logging
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update channel information
export const updateChannelInfo = async (req, res) => {
  try {
    const existingChannel = await Channel.findById(req.params.id);
    if (!existingChannel)
      return res.status(404).json({ message: "Channel not found" });

    // Ensure the user is authorized to update the channel
    if (existingChannel.owner.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized to update" });

    const updates = req.body.updatedData;

    // Update channel info
    const updatedChannel = await Channel.findByIdAndUpdate(req.params.id, updates, {
      new: true,  // Return updated document
    });

    return res.status(200).json(updatedChannel);
  } catch (error) {
    console.error("Error in updateChannelInfo:", error.stack);  // Full error logging
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete a channel
export const deleteChannel = async (req, res) => {
  try {
    const existingChannel = await Channel.findById(req.params.id);
    if (!existingChannel)
      return res.status(404).json({ message: "Channel not found" });

    // Ensure the user is authorized to delete the channel
    if (existingChannel.owner.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized to delete" });

    // Remove the channel from the database
    await existingChannel.deleteOne();

    // Remove the channel ID from the owner's user document
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { channels: existingChannel._id },
    });

    return res.json({ message: "Channel deleted successfully" });
  } catch (error) {
    console.error("Error in deleteChannel:", error.stack);  // Full error logging
    return res.status(500).json({ message: "Server Error" });
  }
};

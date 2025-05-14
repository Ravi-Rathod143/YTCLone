import mongoose from "mongoose";

const channelSchema = mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
      unique: true,  // Ensure channel name is unique
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
    location: {
      type: String,
      default: "",
      required: true,
    },
    joinedAt: {  // Renamed for consistency
      type: Date,
      default: Date.now,
    },
    channelBanner: {
      type: String,
      default: "",
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;

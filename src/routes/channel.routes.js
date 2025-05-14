import { Router } from "express";
import {
  createChannel,
  deleteChannel,
  getChannelInfo,
  updateChannelInfo,
} from "../controllers/channel.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const channelRouter = Router();

channelRouter.route("/").post(verifyToken, createChannel); // Create Channel
channelRouter.route("/:id").get(getChannelInfo); // Get channel Info
channelRouter.route("/:id").put(verifyToken, updateChannelInfo); // Update Channel info.
channelRouter.route("/:id").delete(verifyToken, deleteChannel); // Delte Channel

export default channelRouter;
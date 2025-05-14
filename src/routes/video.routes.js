import { Router } from "express";
import {
  deleteVideo,
  getAllVideo,
  getOneVideo,
  updateVideo,
  uploadVideo,
} from "../controllers/video.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const videoRouter = Router();

videoRouter.route("/").post(verifyToken, uploadVideo); // upload a video
videoRouter.route("/").get(getAllVideo); // get all videos
videoRouter.route("/:id").get(getOneVideo); // get one video using id
videoRouter.route("/:id").put(verifyToken, updateVideo); // update an existing video
videoRouter.route("/:id").delete(verifyToken, deleteVideo); // delete an existing video

export default videoRouter;
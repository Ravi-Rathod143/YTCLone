import { Router } from "express";
import {
  addAComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../controllers/comment.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const commentRouter = Router();

commentRouter.route("/:videoId").post(verifyToken, addAComment); // protected route only loggedin user can add comment
commentRouter.route("/:videoId").get(getAllComments); // Get all comments of a video
commentRouter.route("/:commentId").put(verifyToken, updateComment); // protected route only loggedin user can update their comment
commentRouter.route("/:commentId").delete(verifyToken, deleteComment); // protected route only loggedin user can delete comment

export default commentRouter;
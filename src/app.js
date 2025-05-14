import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import userRouter from "./routes/user.routes.js";
import channelRouter from "./routes/channel.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);

export default app;
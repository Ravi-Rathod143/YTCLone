import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect.js";
import generateToken from "./utils/generateToken.js";

import app from "./app.js";

const res=generateToken()
console.log("res=====>",res)
console.log("✅ MONGO_URI from env:", process.env.MONGO_URI); // ← Add this to check

app.get("/", (req, res) => res.send("Hello, Welcome!"));

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(` Server is listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("MongoDb Connection failed: ", err));



  // password = ravikantrathod143
  // username =  ravikantrathod143

//   ravikantrathod143
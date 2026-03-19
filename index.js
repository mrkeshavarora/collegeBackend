import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./src/Routes/userRouter.js";
import { ConnectDB } from "./src/DB/database.js";
import collegeRouter from "./src/Routes/collegeRouter.js";
import galleryRouter from "./src/Routes/galleryRouter.js";
import noticeRouter from "./src/Routes/noticeRouter.js";
import studentResourceRouter from "./src/Routes/studentResourceRouter.js";
import facultyRouter from "./src/Routes/facultyRouter.js";
import adminRouter from "./src/Routes/adminRouter.js";
import courseRouter from "./src/Routes/courseRouter.js";
import eventRouter from "./src/Routes/eventRouter.js";
import chatbotRouter from "./src/Routes/chatbotRouter.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port =  process.env.PORT || 3000;

app.use(express.json());
// Serve uploaded images as static files — accessible at /uploads/faculty/filename.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/user", userRouter);
app.use("/college", collegeRouter);
app.use("/studentresource", studentResourceRouter);
app.use("/notice", noticeRouter);
app.use("/gallery", galleryRouter);
app.use("/faculty", facultyRouter);
app.use("/event", eventRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);
app.use("/chatbot", chatbotRouter);

ConnectDB();
app.listen(port, () => {
  console.log("Server is running on http://localhost:3000");
});

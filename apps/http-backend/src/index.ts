import express, { Request, Response, Application } from "express";
import "dotenv/config";
import { connectDB } from "@repo/db";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import problemRoutes from "./routes/problem.routes";
import submissionRoutes from "./routes/submission.routes";
import languageRoutes from "./routes/language.routes";
import runCodeRoutes from "./routes/runCode.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import path from "path";

const app: Application = express();
const isProduction = process.env.NODE_ENV === "production";


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/problems", problemRoutes);
app.use("/submissions", submissionRoutes);
app.use("/languages", languageRoutes);
app.use("/runCode", runCodeRoutes);
app.use("/posts", postRoutes);



app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});



const start = async () => {
  try {
    await connectDB();
    // Worker depends on Mongo availability; start it only after DB is ready.
    require("./workers/result.worker");
  } catch (error) {
    if (isProduction) {
      console.error("Failed to start server", error);
      process.exit(1);
    }

  }

  app.listen(3001, () => {
    console.log("http://localhost:3001");
  });
};

start();
export default app;

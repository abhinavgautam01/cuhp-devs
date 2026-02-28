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
import "./workers/result.worker";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

const start = async () => {
  try {
    await connectDB();
    app.use("/auth", authRoutes);
    app.use("/user", userRoutes);
    app.use("/problems", problemRoutes);
    app.use("/submissions", submissionRoutes);
    app.use("/languages", languageRoutes);
    app.use("/runCode", runCodeRoutes);
    app.use("/posts", postRoutes);

    // Serve static files from public/uploads
    app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

    app.get("/", (req: Request, res: Response) => {
      // res.send is now type-checked!
      res.send("Hello World!");
    });

    app.listen(3001, () => {
      console.log("http://localhost:3001");
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

start();
export default app;

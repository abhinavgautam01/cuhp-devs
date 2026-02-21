import express, { Request, Response, Application } from "express";
import "dotenv/config";
import { connectDB } from "@repo/db/index.js";
import cookieParser from "cookie-parser";
import router from "./routes/auth.routes";
import cors from "cors";

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
    app.use("/auth", router);

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

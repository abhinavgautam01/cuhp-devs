import express, { Request, Response, Application } from 'express';
import 'dotenv/config';
import { connectDB } from "@repo/db/index.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
import router from './routes/auth.routes';
import userRouter from "./routes/user.routes";

const app: Application = express();

const CLIENT_ORIGIN = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
    cors({
        origin: CLIENT_ORIGIN,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", router);
app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(3001, () => {
            console.log("🚀 Server running on http://localhost:3001");
        });

        server.on('error', (error: any) => {
            if (error.code === 'EADDRINUSE') {
                console.error("❌ Port 3001 is already in use.");
            } else {
                console.error("❌ Server error:", error);
            }
            process.exit(1);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();

export default app;

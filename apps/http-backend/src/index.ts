import express, { Request, Response, Application } from 'express';
import 'dotenv/config';
import { connectDB } from "@repo/db/index.js";
import cookieParser from 'cookie-parser';
import router from './routes/auth.routes';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/auth", router);

app.get("/", (req: Request, res: Response) => {
    // res.send is now type-checked!
    res.send("Hello World!");
});

app.listen(3001, ()=>{
    console.log("http://localhost:3001")
})
export default app;
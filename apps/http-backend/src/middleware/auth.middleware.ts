import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/index.js";

export interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            console.warn("Auth check failed: No token cookie present");
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        try {
            const decoded = verifyToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

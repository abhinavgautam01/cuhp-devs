import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "@repo/db/index.js";
import { signToken } from "../utils";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, studentId, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if(!email.endsWith("@gmail.com")){
        return res.status(400).json({ message: "Email must be a valid Gmail address" });
    }

    if(password.length <8){
        return res.status(400).json({
            message: "Password must be at least 8 characters long"
        })
    }

    const query: any[] = [{ email }];
    if (studentId && studentId.trim() !== "") {
        query.push({ studentId });
    }
    const existingUser = await User.findOne({
        $or: query,
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // TODO: Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      studentId,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
       name: user.fullName,
        email: user.email,
        studentId: user.studentId,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken({
        id: user._id,
        email: user.email,
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days 
    })
    
    return res.status(200).json({
      message: "Signin successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        studentId: user.studentId,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
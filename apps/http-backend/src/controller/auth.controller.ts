import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "@repo/db";
import { signToken, verifyToken } from "../utils";
import { signinSchema, signupSchema } from "../validators/auth.schema"

export const signup = async (req: Request, res: Response) => {
  try {
    const parsed = signupSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { fullName, email, studentId, password } = parsed.data;

    if (password.length < 8) {
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


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      studentId: studentId?.trim() || undefined,
      password: hashedPassword,
    });

    const token = signToken({
      id: (user._id as any).toString(),
      email: user.email,
      fullName: user.fullName,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 4 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id.toString(),
        name: user.fullName,
        email: user.email,
        studentId: user.studentId,
        onboardingCompleted: user.onboardingCompleted,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const { identifier, password } = parsed.data;
    const loginIdentifier = identifier.trim();

    const user = await User.findOne({
      $or: [
        { email: loginIdentifier.toLowerCase() },
        { studentId: loginIdentifier },
      ],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken({
      id: (user._id as any).toString(),
      email: user.email,
      fullName: user.fullName,
    })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
    })

    return res.status(200).json({
      message: "Signin successful",
      user: {
        id: (user._id as any).toString().toString(),
        fullName: user.fullName,
        email: user.email,
        studentId: user.studentId,
        program: user.program,
        semester: user.semester,
        interests: user.interests,
        onboardingCompleted: user.onboardingCompleted,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (_: Request, res: Response) => {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logged out successfully",
  });
};

export const me = async (req: Request, res: Response) => {
  try {
    const token = req.cookies["token"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = verifyToken(token);

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User found",
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        studentId: user.studentId,
      },
    });

  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

import jwt from "jsonwebtoken";

export const authenticateSocket = (socket: any, next: any) => {
  const token = socket.handshake?.auth?.token;

  if (!token) {
    return next(new Error("Authentication required"));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    socket.data.user = user;
    next();
  } catch (err) {
    return next(new Error("Invalid token"));
  }
};
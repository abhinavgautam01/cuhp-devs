import jwt from "jsonwebtoken";

export const authenticateSocket = (socket: any, next: any) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    console.warn("Socket connection without token - allowing for now");
    // For now, allow connection but don't set user data
    socket.data.user = { id: "guest", email: "guest@example.com", fullName: "Guest" };
    return next();
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    socket.data.user = user;
    next();
  } catch {
    console.warn("Socket token verification failed - allowing as guest");
    socket.data.user = { id: "guest", email: "guest@example.com", fullName: "Guest" };
    next();
  }
};
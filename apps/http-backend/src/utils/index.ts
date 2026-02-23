import jwt, { SignOptions } from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}

const getJwtConfig = () => {
  const secret = process.env.JWT_SECRET;
  const expiresIn =
    (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "7d";

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return { secret, expiresIn };
};

export const signToken = (payload: JwtPayload): string => {
  const { secret, expiresIn } = getJwtConfig();

  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  const { secret } = getJwtConfig();

  return jwt.verify(token, secret) as JwtPayload;
};
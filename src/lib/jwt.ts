import jwt, { Secret } from "jsonwebtoken";

interface JWTPayload {
  user_id: number
}

export function createJWT(payload: JWTPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET as Secret, { expiresIn: 5 * 60 });
}
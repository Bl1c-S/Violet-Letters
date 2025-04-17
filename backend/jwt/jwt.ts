import { getSecretKey } from "@/backend/cryptonit";
import jwt from "jsonwebtoken";

export const createNewToken = async (data: object, lifetime: string) => {
  const secretKey = await getSecretKey("JWT_SECRET");
  const token: string = jwt.sign(data, secretKey, {
    expiresIn: lifetime,
    algorithm: "HS256",
  });
  console.log(`new token created \ntoken: ${token}\nlifetime: ${lifetime}`);
  return token;
};

export const validateToken = async (token: string) => {
  const secretKey = await getSecretKey("JWT_SECRET");
  try {
    const decoded = jwt.verify(token, secretKey);
    if (typeof decoded !== "string") {
      return decoded;
    }

    const data = JSON.parse(decoded);
    return data;
  } catch (err) {
    console.error("Ошибка верификации токена:", err);
    throw new Error("Ошибка верификации токена");
  }
};

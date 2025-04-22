import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const SECRET = await getSecretKey("BCRYPT_SECRET");
  const hash = await bcrypt.hash(password, "$2b$10$" + SECRET);
  return hash;
};

export const verifyPassword = async (password: string, hashDB: string) => {
  const inputHash = await hashPassword(password);
  return inputHash === hashDB;
};

export const getSecretKey = async (name: string) => {
  const SECRET = process.env[name];
  if (SECRET) return SECRET;
  else throw new Error(`Ошибка получение секретного ключа с именем ${name}`);
};
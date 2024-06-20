import {
  Letter,
  readFromFile,
  writeToFile,
} from "@/backend/database/dBManager";

let { lastId, lettersMap } = readFromFile();

export const updateLetter = (
  id: number,
  title: string,
  description: string,
): boolean => {
  const letter = lettersMap.get(id);
  if (!letter) {
    return false;
  }
  letter.title = title;
  letter.description = description;
  lettersMap.set(id, letter);
  writeToFile(lastId, lettersMap);
  return true;
};

export const addLetter = (title: string, description: string): void => {
  const id = ++lastId;
  const newLetter: Letter = { id, title, description };
  lettersMap.set(id, newLetter);
  writeToFile(lastId, lettersMap);
  console.log("server added letter");
};

export const getLetter = (id: number): Letter | undefined => {
  return lettersMap.get(id);
};

export const getAllLetters = (): Letter[] => {
  return Array.from(lettersMap.values());
};

export const removeLetter = (id: number): boolean => {
  const result = lettersMap.delete(id);
  if (result) {
    writeToFile(lastId, lettersMap);
  }
  return result;
};

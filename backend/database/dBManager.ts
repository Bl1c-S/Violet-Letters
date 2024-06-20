import fs from "fs";
import path from "path";

export type Letter = {
  id: number;
  title: string;
  description: string;
};

const filePath = path.join(__dirname, "letters.json");

interface LettersData {
  lastId: number;
  letters: Letter[];
}

export const readFromFile = (): {
  lastId: number;
  lettersMap: Map<number, Letter>;
} => {
  try {
    if (!fs.existsSync(filePath)) {
      return { lastId: 0, lettersMap: new Map() };
    }
    const fileData = fs.readFileSync(filePath, "utf-8");
    const { lastId, letters }: LettersData = JSON.parse(fileData);
    const lettersMap = new Map(letters.map((letter) => [letter.id, letter]));
    return { lastId, lettersMap };
  } catch (error) {
    console.error("Error reading from file:", error);
    return { lastId: 0, lettersMap: new Map() };
  }
};

export const writeToFile = (
  lastId: number,
  lettersMap: Map<number, Letter>,
): void => {
  try {
    const letters = Array.from(lettersMap.values());
    const data: LettersData = { lastId, letters };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to file:", error);
  }
};

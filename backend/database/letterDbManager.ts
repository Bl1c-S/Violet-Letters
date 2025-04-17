import { open } from "./database";

export type Letter = {
  user_id: string;
  id: string;
  title: string;
  description: string;
};

export const addLetter = async (letter: Letter) => {
  const db = await open();
  try {
    await new Promise<Letter>((resolve, reject) => {
      db.run(
        "INSERT INTO letters (user_id, id, title, description) VALUES (?, ?, ?, ?)",
        [letter.user_id, letter.id, letter.title, letter.description],
        function (err) {
          if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
              console.error("Письмо уже существует:", letter.id);
              reject(new Error("Письмо уже существует"));
            } else {
              console.error("Ошибка добавления письма:", err);
              reject("Ошибка добавления письма");
            }
          } else {
            console.log(`Успешное добавление письма: ${letter.title}`);
            resolve(letter);
          }
        },
      );
    });
  } catch (error) {
    console.error("Не обработаная ошибка добавления письма:", error);
    throw error;
  } finally {
    db.close();
  }
};

export const removeLetter = async (id: string): Promise<boolean> => {
  const db = await open();
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM letters WHERE id = ?`, [id], function (err) {
      if (err) {
        console.error("Ошибка при удалении письма:", err);
        reject(false);
      } else if (this.changes === 0) {
        console.warn(`Письмо с id ${id} не найдено.`);
        resolve(false);
      } else {
        console.log(`Письмо с id ${id} успешно удалено.`);
        resolve(true);
      }
    });
  });
};

export const updateLetter = async (letter: Letter): Promise<boolean> => {
  const db = await open();
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE letters 
       SET title = ?, description = ?
       WHERE id = ?`,
      [letter.title, letter.description, letter.id],
      function (err) {
        if (err) {
          console.error("Ошибка при обновлении письма:", err);
          reject(false);
        } else if (this.changes === 0) {
          console.warn(`Письмо с id ${letter.id} не найдено.`);
          resolve(false);
        } else {
          console.log(`Письмо с id ${letter.id} успешно обновлено.`);
          resolve(true);
        }
      },
    );
  });
};

export const getAllLetters = async (user_id: string): Promise<Letter[]> => {
  const ids: string[] = await getUserLetterIds(user_id);

  const letterPromises = ids.map((id) => getLetter(id));
  const letters = await Promise.all(letterPromises);

  const filteredLetters = letters.filter(
    (letter): letter is Letter => letter !== null,
  );
  console.log(`Получено ${filteredLetters.length} писем.`);
  return filteredLetters;
};

export const getLetter = async (id: string): Promise<Letter | null> => {
  const db = await open();
  return new Promise((resolve, reject) => {
    db.get<Letter>(`SELECT * FROM letters WHERE id = ?`, [id], (err, row) => {
      if (err) {
        console.error("Ошибка при получении письма:", err);
        reject(err);
      } else if (row) {
        resolve(row);
      } else {
        console.log(`Письмо с id {${id}} не найдено.`);
        resolve(null);
      }
    });
  });
};

const getUserLetterIds = async (userId: string): Promise<string[]> => {
  const db = await open();
  return new Promise((resolve, reject) => {
    db.all<Letter>(
      `SELECT id FROM letters WHERE user_id = ?`,
      [userId],
      (err, rows) => {
        if (err) {
          console.error("Ошибка при получении id писем:", err);
          reject(err);
        } else if (rows) {
          const letterIds: string[] = rows.map((row) => row.id);
          console.log(
            `Найдено ${letterIds.length} писем, для пользователя ${userId}`,
          );
          resolve(letterIds);
        } else {
          resolve([]);
        }
      },
    );
  });
};

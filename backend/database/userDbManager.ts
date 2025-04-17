import { open } from "./database";

export type User = {
  id: string;
  username: string;
  descript: string;
  avatarUrl: string;
};

export type DbUser = {
  id: string;
  username: string;
  descript: string;
  password: string;
  avatarUrl: string;
};

export const ParsToUser = (dbUser: DbUser): User => {
  return {
    id: dbUser.id,
    username: dbUser.username,
    descript: dbUser.descript,
    avatarUrl: dbUser.avatarUrl,
  };
};

export const getUser = async (username: string): Promise<DbUser | null> => {
  const db = await open();
  try {
    const user = await new Promise<DbUser | null>((resolve, reject) => {
      db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, row) => {
          if (err) {
            console.error("Ошибка поиска пользователя в дб:", err);
            reject(err);
          } else {
            resolve(row ? (row as DbUser) : null);
          }
        },
      );
    });

    console.log("Результат поиска:", user);
    return user;
  } catch (error) {
    console.error("Непредвиденая ошибка поиска пользователя:", error);
    return null;
  } finally {
    db.close();
  }
};

export const addUser = async (dbUser: DbUser): Promise<User | null> => {
  const db = await open();
  let user: User | null = null;
  try {
    await new Promise<User>((resolve, reject) => {
      db.run(
        "INSERT INTO users (id, username, descript, password, avatarUrl) VALUES (?, ?, ?, ?, ?)",
        [
          dbUser.id,
          dbUser.username,
          dbUser.descript,
          dbUser.password,
          dbUser.avatarUrl,
        ],
        function (err) {
          if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
              console.error("Пользователь уже существует:", dbUser.username);
              reject(new Error("Пользователь уже существует"));
            } else {
              console.error("Ошибка добавления пользователя:", err);
              reject("Ошибка добавления пользователя");
            }
          } else {
            console.log(`Успешное добавление пользователя: ${dbUser.username}`);
            user = ParsToUser(dbUser);
            resolve(user);
          }
        },
      );
    });
  } catch (error) {
    console.error("Не обработаная ошибка добавления пользователя:", error);
    throw error;
  } finally {
    db.close();
  }
  return user;
};

export const updateUser = async (dbUser: DbUser): Promise<User | null> => {
  const db = await open();
  let user: User | null = null;
  try {
    await new Promise<User>((resolve, reject) => {
      // Формируем динамический запрос, который обновляет пароль только если он не null
      const query = dbUser.password
        ? `UPDATE users 
           SET username = ?, descript = ?, password = ?, avatarUrl = ?
           WHERE id = ?`
        : `UPDATE users 
           SET username = ?, descript = ?, avatarUrl = ?
           WHERE id = ?`;

      const params = dbUser.password
        ? [
            dbUser.username,
            dbUser.descript,
            dbUser.password,
            dbUser.avatarUrl,
            dbUser.id,
          ]
        : [dbUser.username, dbUser.descript, dbUser.avatarUrl, dbUser.id];

      db.run(query, params, function (err) {
        if (err) {
          console.error("Ошибка обновления пользователя:", err);
          reject(new Error("Ошибка обновления пользователя"));
        } else if (this.changes === 0) {
          reject(new Error("Пользователь не найден"));
        } else {
          console.log(`Успешное обновление пользователя: ${dbUser.username}`);
          user = ParsToUser(dbUser);
          resolve(user);
        }
      });
    });
  } catch (error) {
    console.error("Не обработанная ошибка обновления пользователя:", error);
    throw error;
  } finally {
    db.close();
  }
  return user;
};

import Cookies from "js-cookie";

export const authorization = (basic_token: string, refresh_token: string) => {
  console.log("Успешный вход");
  Cookies.set(BASIC_TOKEN, basic_token, { expires: 1 / 24 });
  Cookies.set(REFRESH_TOKEN, refresh_token, { expires: 7 });
};

export const getBasicToken = () => {
  return Cookies.get(BASIC_TOKEN);
};
export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN);
};

export const BASIC_TOKEN = "basicToken";
export const REFRESH_TOKEN = "refreshToken";

export default authorization;

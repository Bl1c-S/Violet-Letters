import {
  getBasicToken,
  getRefreshToken,
} from "@/app/login/components/Authorization";
import { redirect } from "next/navigation";

export type RequestType = {
  url: string;
  method: string;
  token?: string;
};

export const requestAdapterWithRefreshStage = async (request: RequestType) => {
  try {
    return await fetchWithToken(request);
  } catch (err) {
    const refreshedToken = getRefreshToken();

    await requestAdapter({
      url: "/api/authorization/refresh",
      method: "GET",
      token: refreshedToken,
    });

    try {
      return await fetchWithToken({ ...request, token: getBasicToken() });
    } catch (err) {
      redirect("/api/login");
    }
  }
};

const fetchWithToken = async (request: RequestType) => {
  const token = request.token || getBasicToken();
  const data = await requestAdapter({ ...request, token });

  if (data === undefined) throw new Error("Request failed");
  return data;
};

export const requestAdapter = async ({ url, method, token }: RequestType) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(url, { method, headers });

  if (!response.ok) {
    try {
      const data = await response.json();

      if (data?.message)
        console.error(`status: ${data.status}; message: ${data.message}`);
      else requestError();
    } catch (err) {
      requestError(err);
    }
    return undefined;
  }

  return response.json();
};

const requestError = (err?: any) => {
  console.error(
    `status: 500; message: server request error ${err?.message || ""}`,
  );
};

import axios from "axios";
import { toast } from "react-toastify";

const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};
const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const apiProcessor = async ({
  url,
  method,
  payload,
  isPrivate,
  isAcessJWT = true,
  token: providedToken,
}) => {
  try {
    const headers = {};
    if (isPrivate) {
      const token = providedToken || (isAcessJWT ? getAccessToken() : getRefreshToken());
      if (isAcessJWT && !token) {
        console.error("Private request missing access token", { url, method });
        return { status: "error", message: "Missing access token" };
      }
      headers.authorization = `Bearer ${token}`;
    }
    const responsePending = axios({
      url,
      method,
      data: payload,
      headers,
    });
    const { data } = await responsePending;
    
    // toast.success removed individually by components if needed
    // toast.error kept in catch or specifically handled? 
    // User asked to remove "unnecessary", global promise is definitely unnecessary.
    // Success on every fetch is also annoying.
    
    return data;
    return data;
  } catch (error) {
    console.error("ERROR:", error.response?.data);
    console.error("STATUS:", error.response?.status);
    console.error("MESSAGE:", error.message);
    const message = error.response?.data?.message || error.message;
    const payload = error.response?.data?.payload ?? null;
    toast.error(message);
    return { status: "error", message, payload };
  }
};

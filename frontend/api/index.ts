import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
export const Domain = "http://127.0.0.1:8000";
export const gameapp = "game99-game-app/";
export const platform = "game99-platform-app/";
export const payapp = "game99-pay-app/";
export const lotteryapp = "game99-lottery-app/";

var Post = "POST";
var Get = "GET";

const axiosInstance = axios.create({
  // withCredentials: true,
  // maxRedirects: 10,
});

export const api = async (
  param: string,
  params2: string,
  method: string,
  data?: any
): Promise<any> => {
  const url = Domain + param + params2;
  let Content = "";
  let json = true;
  if (data instanceof FormData) {
    Content = "multipart/form-data";
    json = false;
  } else {
    Content = "application/json;charset=UTF-8";
    json = true;
  }
  try {
    const axiosConfig: AxiosRequestConfig = {
      method: method,
      url: url,
      data: json === true ? JSON.stringify(data) : data,
      // withCredentials: true,
    };

    const response: AxiosResponse = await axiosInstance(axiosConfig);

    if (response.status !== 200) {
      throw new Error("Request failed");
    }

    if (
      params2 === "login" ||
      params2 === "register" ||
      params2 === "continueWithOtp"
    ) {
      if (response.data.code === 200) {
      } else {
        return response;
      }
      return response;
    } else if (response.data.code === 401) {
      sessionStorage.removeItem("token");
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return null;
  }
};

export function Register(data: any) {
  return api(platform, "register", Post, data);
}

export function login(data: any) {
  return api(platform, "login", Post, data);
}

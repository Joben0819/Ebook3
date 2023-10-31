import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
export const Domain = "http://127.0.0.1:8000";

var Post = "POST";
var Get = "GET";

const axiosInstance = axios.create({
  // withCredentials: true,
  // maxRedirects: 10,
});

export const api = async (
  param: string,
  method: string,
  data: any
): Promise<any> => {
  const url = Domain + param;
  var globalHeaders = {
    "front-host": url,
    dev: 2,
    version: 2,
    "Content-Type": "application/json;charset=UTF-8",
  };
  try {
    const axiosConfig: AxiosRequestConfig = {
      method: method,
      url: url,
      headers: {
        "front-host": globalHeaders["front-host"],
        dev: globalHeaders.dev.toString(),
        version: globalHeaders.version.toString(),
        "Content-Type": globalHeaders["Content-Type"],
      },
      data: JSON.stringify(data),
      // withCredentials: true,
    };

    const response: AxiosResponse = await axiosInstance(axiosConfig);

    if (response.status !== 200) {
      throw new Error("Request failed");
    }

    return response;
  } catch (error) {
    return null;
  }
};

export function Registered(data: any) {
  return api("/register", Post, data);
}

export function login(data: any) {
  return api("/login", Post, data);
}

export function Books(data: any) {
  return api("/get_data/", Get, data);
}

export function Createfolder(data: any) {
  return api("/create_folder", Post, data);
}

export function ReadFile(data: any) {
  return api("/read_file", Post, data);
}

export function CreateFile(data: any) {
  return api("/create_text_file", Post, data);
}

export function AddedBooks(data: any) {
  return api("/Added_books", Post, data);
}

export function AddBook(data: any) {
  return api("/add_book", Post, data);
}

export function RemoveBook(data: any) {
  return api("/remove_book", Post, data);
}

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  Login,
  Register,
  Book,
  Upload,
  ReadFiled,
  CreateFiled,
  AddedBook,
  AddBooks,
  RemovedBook,
  OnRead,
  OnDone,
  OnWriter,
  Authors,
  Stories,
  Rate,
} from "./type";
import { useNavigate } from "react-router-dom";
// import { useRouter } from "next/router";
// import React from "react";
// import { setResponse } from "@/reducers/gameData";

let local = 1;
export const Domain =
  local === 1 ? "http://52.90.85.88:8080" : "http://127.0.0.1:8000";

var Post = "POST";
var Get = "GET";

// var Url401 = window.location.href + "/?code=401";

const axiosInstance = axios.create({
  withCredentials: true,
  // maxRedirects: 10,
});

export const api = async (
  param: string,
  method: string,
  data: any
): Promise<any> => {
  // const router = useNavigate();
  let Content = "";
  let json = true;
  if (data instanceof FormData) {
    Content = "multipart/form-data";
    json = false;
  } else {
    Content = "application/json;charset=UTF-8";
    json = true;
  }
  const url = Domain + param;
  var globalHeaders = {
    "front-host": url,
    id: Number(sessionStorage.getItem("id")),
    token: sessionStorage.getItem("token"),
    "Content-Type": Content,
  };
  // try {
  const axiosConfig: AxiosRequestConfig = {
    method: method,
    url: url,
    headers: {
      "front-host": globalHeaders["front-host"],
      token: globalHeaders["token"],
      id: globalHeaders["id"],
      "Content-Type": globalHeaders["Content-Type"],
    },
    data: json === true ? JSON.stringify(data) : data,
    // withCredentials: true,
  };
  try {
    const response: AxiosResponse = await axiosInstance(axiosConfig);
    console.log(response.status, "api");
    if (response.status != 200) {
      console.log("here");
      throw new Error("Request failed");
    }

    return response;
  } catch (error) {
    if (window.location.origin + "/?code=401" !== window.location.href) {
      window.location.href = "/?code=401";
    }
    console.log("error occured", window.location.href);
  }
  // } catch (error) {
  //   return null;
  // }
};

export function Registered(data: Login) {
  return api("/register", Post, data);
}

export function login(data: Register) {
  return api("/login", Post, data);
}

export function Books(data: Book) {
  return api("/get_data/", Get, data);
}

export function UploadFile(data: Upload) {
  var formData = new FormData();
  formData.append("filename", data.filename);
  formData.append("file", data.file ?? "");
  formData.append("Author1", data.Author1);
  formData.append("Id", data.Id);
  return api("/UploadFile", Post, formData);
}

// export function ReadFile(data: ReadFiled) {
//   return api("/read_file", Post, data);
// }

export function CreateFile(data: CreateFiled) {
  return api("/create_text_file", Post, data);
}

export function AddedBooks(data: AddedBook) {
  return api("/Added_books/", Post, data);
}

export function AddBook(data: AddBooks) {
  return api("/add_book", Post, data);
}

export function RemoveBook(data: RemovedBook) {
  return api("/remove_book", Post, data);
}

export function Onread(data: OnRead) {
  return api("/mark_as_onread", Post, data);
}

export function Done(data: OnDone) {
  return api("/mark_as_done", Post, data);
}

export function Writers(data: OnWriter) {
  return api("/writer", Post, data);
}

export function Authored(data: Authors) {
  return api("/author", Post, data);
}

export function BookSheleves(data: Stories) {
  return api("/YourBook", Post, data);
}

export function Onrate(data: Rate) {
  return api("/Onrating", Post, data);
}

export function AccountInfo(data: {}) {
  return api("/AccountInfo/", Post, data);
}

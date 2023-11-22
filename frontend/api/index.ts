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
} from "./type";

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
    // dev: 2,
    // version: 2,
    "Content-Type": Content,
  };
  try {
    const axiosConfig: AxiosRequestConfig = {
      method: method,
      url: url,
      headers: {
        "front-host": globalHeaders["front-host"],
        // dev: globalHeaders.dev.toString(),
        // version: globalHeaders.version.toString(),
        "Content-Type": globalHeaders["Content-Type"],
      },
      data: json === true ? JSON.stringify(data) : data,
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
  return api("/UploadFile", Post, formData);
}

// export function ReadFile(data: ReadFiled) {
//   return api("/read_file", Post, data);
// }

export function CreateFile(data: CreateFiled) {
  return api("/create_text_file", Post, data);
}

export function AddedBooks(data: AddedBook) {
  return api("/Added_books", Post, data);
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

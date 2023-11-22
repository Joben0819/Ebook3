export type Login = {
  name: string;
  password: string;
};

export type Register = {
  name: string;
  password: string;
};

export type Upload = {
  filename: string;
  file: File | null;
  Author1: string;
};

export type ReadFiled = {
  num: string;
  Book: string;
};

export type CreateFiled = {
  file_name: string;
  text_content: string;
  Book: string;
};

export type AddedBook = {
  name: string;
  id: number;
};

export type AddBooks = {
  id: number;
  book: string;
  image: string;
  name: string;
  idx: number;
};

export type RemovedBook = {
  id: number;
  book: string;
  name: string;
};

export type OnRead = {
  id: number;
  book: string;
  image: string;
  name: string;
  idx: number;
  inread: number;
};

export type OnWriter = {
  id: number;
  Fullname: string;
  Phonenumber: string;
  username: string;
  address: string;
};

export type Authors = {
  username: string;
};

export type OnDone = {
  id: number;
  book: string;
};

export type Stories = {
  id: number;
  book: string;
};

export type Book = {};

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
  Unique: string;
  Author1: string;
  Id: any;
};

export type ReadFiled = {
  num: string;
  Book: string;
};

export type CreateFiled = {
  file_name: string;
  text_content: string;
  Book: string;
  Unique: string;
};

export type AddedBook = {
  name: string;
  id: string;
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

export type Rating = {
  id: number;
  book: string;
  username: string;
};

export type OnRead = {
  id: number;
  book: string;
  image: string;
  name: string;
  idx: number;
  inread: number;
  author: string;
};

export type OnWriter = {
  id: number;
};

export type Authors = {
  username: string;
};

export type Rate = {
  id: number;
  username: string;
  book: string;
  reader: number;
};

export type Read = {
  id: number;
  book: string;
  idx: number;
};

export type Unfavorite = {
  book: string;
  id: number;
  name: string;
};

export type Favorite = {
  book: string;
  id: number;
  name: string;
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

"use client";
import React, { useEffect } from "react";
import Booked from "@/assets/Books/book.png";
import Read from "@/assets/Books/openbook.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { text } from "@/utils/helpers";
import { RootState } from "@/store";
import {
  setModal,
  AddBooked,
  setChapter,
  setResponse,
  setAddedBook,
} from "@/reducers/gameData";
import { useDispatch, useSelector } from "react-redux";

function index(props: any) {
  const { Modal, Response } = useSelector((state: RootState) => state.gameData);
  const dispatch = useDispatch();
  const router = useRouter();
  const route = () => {
    if (Response.length !== 0) {
      router.push("/Library");
    } else {
      dispatch(setModal(1));
    }
  };
  const route2 = () => {
    router.push("/");
  };
  // console.log(Response, "Response");
  return (
    <div className="flex w-full pl-10 gap-5 h-[10%] items-center">
      {sessionStorage.getItem("data") && (
        <div
          className="w-20 flex items-center gap-2 "
          style={{ cursor: "pointer" }}
          onClick={() => {
            sessionStorage.clear(),
              dispatch(setModal(1)),
              //@ts-ignore
              dispatch(AddBooked("", 0));
            dispatch(setChapter([]));
            dispatch(setResponse([]));
            dispatch(setAddedBook([]));
          }}
        >
          <div className="w-4 relative h-5">
            <Image
              src={Booked}
              alt="book"
              sizes="(max-width: 100vw) 100vw"
              priority={true}
              fill
            />
          </div>{" "}
          Logout
        </div>
      )}
      <div
        className="w-20 flex items-center gap-2 "
        style={{ cursor: "pointer" }}
        onClick={route2}
      >
        <div className="w-4 relative h-5">
          <Image
            src={Booked}
            alt="book"
            sizes="(max-width: 100vw) 100vw"
            priority={true}
            fill
          />
        </div>{" "}
        Books
      </div>
      <div
        className="w-20 flex items-center gap-2 "
        style={{ cursor: "pointer" }}
        onClick={route}
      >
        <div className="w-4 relative h-5">
          <Image
            src={Read}
            alt="book"
            sizes="(max-width: 100vw) 100vw"
            priority={true}
            fill
          />
        </div>
        Library
      </div>
      <input type="text" placeholder="Search" id="search" />
    </div>
  );
}

export default index;

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
  setNavbar2,
  Authoreds,
} from "@/reducers/gameData";
import { useDispatch, useSelector } from "react-redux";

function index(props: any) {
  const { Modal, Response, Navbar2 } = useSelector(
    (state: RootState) => state.gameData
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const route = () => {
    dispatch(setNavbar2(2));
    if (Response.length !== 0) {
      router.push("/Library");
    } else {
      dispatch(setModal(1));
    }
  };
  const route2 = () => {
    dispatch(setNavbar2(1));
    router.push("/");
  };
  sessionStorage.setItem("href", window.location.pathname);
  console.log(Response, "Response");
  return (
    <div className="flex w-full justify-center gap-5 h-[10%] items-center">
      {Response.length !== 0 && (
        <div
          className="w-20 flex items-center gap-2 cursor-pointer "
          onClick={() => {
            sessionStorage.clear(),
              dispatch(setModal(1)),
              //@ts-ignore
              dispatch(AddBooked("", 0));
            dispatch(setChapter([]));
            dispatch(setResponse([]));
            dispatch(setAddedBook([]));
            //@ts-ignore
            dispatch(Authoreds(""));
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
          </div>
          <span style={{ fontFamily: "ui-monospace" }}>Logout</span>
        </div>
      )}
      <div
        className="w-20 flex items-center gap-2 cursor-pointer"
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
        </div>
        <span
          style={{
            color: Navbar2 == 1 ? "rgb(167,25,75)" : "rgb(172,172,172)",
            fontFamily: "ui-monospace",
          }}
        >
          Books
        </span>
      </div>
      <div
        className="w-20 flex items-center gap-2 cursor-pointer"
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
        <span
          style={{
            color: Navbar2 == 2 ? "rgb(167,25,75)" : "rgb(172,172,172)",
            fontFamily: "ui-monospace",
          }}
        >
          Profile
        </span>
      </div>
      <input className="w-[20%]" type="text" placeholder="Search" id="search" />
    </div>
  );
}

export default index;

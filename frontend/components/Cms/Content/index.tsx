"use client";
import React from "react";
import Books from "./component/Books/index";
import Contents from "./component/Content";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function Content() {
  const { Navbar } = useSelector((state: RootState) => state.gameData);
  return (
    <div className="bg-black-500 w-3/4 flex">
      {Navbar === 1 ? <Books /> : Navbar === 2 ? <Contents /> : ""}
    </div>
  );
}

export default Content;

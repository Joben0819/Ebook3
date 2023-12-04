"use client";
import React, { useState, useEffect } from "react";
import Login from "./Login/Login";
import { RootState } from "@/store";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "@/reducers/gameData";

export default function Modal() {
  const [data, setdata] = useState(1);
  const { Modal, Response } = useSelector((state: RootState) => state.gameData);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   window.onload = function () {
  //     if (Modal === 3) {
  //       dispatch(setModal(1));
  //     } else if (Response) {
  //       dispatch(setModal(3));
  //     }
  //     // console.log("Page has finished loading!");
  //   };
  // }, [Modal]);
  console.log(Modal, data, "here");
  useEffect(() => {
    if (Response.length === 0) {
      dispatch(setModal(1));
    } else {
      dispatch(setModal(3));
    }
  }, [Response]);

  return <>{Modal === 1 ? <Login /> : Modal === 2 ? <Register /> : ""}</>;
}

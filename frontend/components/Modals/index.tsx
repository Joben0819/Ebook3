"use client";
import React, { useState, useEffect } from "react";
import Login from "./Login/Login";
import { RootState } from "@/store";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "@/reducers/gameData";

export default function Modal() {
  const [data, setdata] = useState(1);
  const { Modal } = useSelector((state: RootState) => state.gameData);
  const dispatch = useDispatch();
  useEffect(() => {
    window.onload = function () {
      if (Modal === 3) {
        dispatch(setModal(1));
      }
      console.log("Page has finished loading!");
    };
  }, [Modal]);
  console.log(Modal, "here");
  useEffect(() => {
    if (Modal === 1) {
      setdata(1);
    } else if (Modal === 2) {
      setdata(2);
    }
  }, [data]);

  return <>{Modal === 1 ? <Login /> : Modal === 2 ? <Register /> : ""}</>;
}

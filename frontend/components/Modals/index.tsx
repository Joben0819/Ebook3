"use client";
import React, { useState, useEffect } from "react";
import Login from "./Login/Login";
import { RootState } from "@/store";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { setExit, setModal, UserInform } from "@/reducers/gameData";

export default function Modal() {
  const { Modal, Response, UserInfo, exit } = useSelector(
    (state: RootState) => state.gameData
  );
  const dispatch = useDispatch();
  const search1 = new URLSearchParams(window.location.search);
  console.log(Modal <= 2, Modal, UserInfo.data.length === 0);
  useEffect(() => {
    //@ts-ignore
    dispatch(UserInform({}));
    UserInfo;
    setTimeout(() => {
      if (UserInfo.data.length === 0) {
        dispatch(setModal(1));
      } else {
        dispatch(setModal(3));
      }
    }, 1000);
  }, [Modal]);
  useEffect(() => {
    dispatch(setExit(true));
  }, []);

  console.log(exit, "exit");
  return (
    <>
      {exit === true && window.location.pathname === "/" && Modal === 1 ? (
        <Login />
      ) : Modal === 2 ? (
        <Register />
      ) : (
        ""
      )}
    </>
  );
}

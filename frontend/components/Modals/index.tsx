"use client";
import React, { useState, useEffect } from "react";
import Login from "./Login/Login";
import { RootState } from "@/store";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "@/reducers/gameData";

export default function Modal() {
  const { Modal, Response } = useSelector((state: RootState) => state.gameData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Response) {
      dispatch(setModal(3));
    } else {
      dispatch(setModal(1));
    }
  }, [Response]);

  return <>{Modal === 1 ? <Login /> : Modal === 2 ? <Register /> : ""}</>;
}

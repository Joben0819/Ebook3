'use client'
import React from "react";
import Header from "./Header/index";
import Body from "./Body/index";
import { useRouter } from 'next/navigation';
function index() {
  const route = useRouter()
  return (
    <>
      <Header />
      <Body />
    </>
  );
}

export default index;

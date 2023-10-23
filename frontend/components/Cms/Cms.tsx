"use client";
import Navbar from "./Navbar";
import Content from "./Content";

function index() {
  console.log(window.location.pathname);
  return (
    <div className=" flex w-full h-full ">
      <Navbar />
      <Content />
    </div>
  );
}

export default index;

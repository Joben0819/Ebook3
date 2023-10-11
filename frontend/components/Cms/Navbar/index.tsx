"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNavbar } from "@/reducers/gameData";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
function Navbar() {
  const [first, setfirst] = useState(1);
  const dispatch = useDispatch();
  const { Navbar } = useSelector((state: RootState) => state.gameData);
  useEffect(() => {
    if (first === 1) {
      dispatch(setNavbar(1));
    } else if (first === 2) {
      dispatch(setNavbar(2));
    }
  }, [first]);
  // console.log(Navbar);
  return (
    <div className="decoration-stone-800 w-3/12 bg-green-400">
      <h1 className="text-base text-black ">Dashboard</h1>

      <div
        style={{ color: first === 1 ? "blue" : "" }}
        onClick={() => {
          setfirst(1);
        }}
      >
        Books
      </div>
      <div
        style={{ color: first === 2 ? "blue" : "" }}
        onClick={() => {
          setfirst(2);
        }}
      >
        Content
      </div>
    </div>
  );
}

export default Navbar;

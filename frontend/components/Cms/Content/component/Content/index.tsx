import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

function index() {
  const [data, setdata] = useState([]);
  const [modal, setmodal] = useState(false);
  const [book, setbook] = useState("");
  const [content, setcontent] = useState("");
  const [filename, setfilename] = useState("");

  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/read_file/", {
        num: 1,
        Book: "Dracula",
      })
      .then((res) => {
        // setdata(res.data)
        console.log(res);
      });
  }, []);
  return (
    <>
      <div className="w-full bg-cyan-700">
        <div className="flex justify-center">
          <input type="text" placeholder="Book" />
          <input type="text" placeholder="Chapter" />
          <button>chapter</button>
          <button
            onClick={() => {
              setmodal(true);
            }}
          >
            + Add
          </button>
        </div>
      </div>
      {modal === true ? (
        <div>
          <input type="text" />
          <input type="text" />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default index;

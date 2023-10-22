"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Books, Createfolder } from "@/api";
function index() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    Books({}).then((res) => {
      // console.log(res.data);
      setdata(res.data);
    });
  }, []);
  function Added() {
    const title = document.getElementById("title") as HTMLInputElement | null;
    const image = document.getElementById("image") as HTMLInputElement | null;
    const ids = document.getElementById("id") as HTMLInputElement | null;

    if (title !== null && image !== null && ids !== null) {
      const val1 = title.value;
      const val2 = image.value;
      const val3 = Number(ids.value);
      console.log(val1, val2, val3, "here");
      Createfolder({
        id: val3,
        title: val1,
        base64img: val2,
        status: false,
      }).then((res) => {});
    }
  }
  return (
    <div className="w-full bg-white" style={{ padding: "1rem 1rem 0rem" }}>
      <div>
        <input type="text" id="title" placeholder="Title" />
        <input type="text" id="image" placeholder="image" />
        <input type="number" id="id" placeholder="id" />

        <button onClick={() => Added()}> +Add</button>
      </div>
      <div className="h-5/6 flex gap-4 mt-4">
        {data.map((index: any) => {
          return (
            <div className="w-1/5 h-2/5 relative" key={index.id}>
              <Image src={index.base64img} alt={"book"} fill />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default index;

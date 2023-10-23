"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Books, Createfolder } from "@/api";
function index() {
  const [data, setdata] = useState<any>([]);
  const [id, setid] = useState(0);
  useEffect(() => {
    Books({}).then((res) => {
      // console.log(res.data, "here");
      setdata(res.data);
    });
  }, []);
  function Added() {
    const title = document.getElementById("title") as HTMLInputElement | null;
    const image = document.getElementById("image") as HTMLInputElement | null;

    if (title !== null && image !== null) {
      const val1 = title.value;
      const val2 = image.value;
      console.log(val1, val2, "here");
      Createfolder({
        id: data.length ? data.length + 1 : 1,
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

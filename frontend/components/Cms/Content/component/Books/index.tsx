"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Books, UploadFile } from "@/api";
function index() {
  const [data, setdata] = useState<any>([]);
  const [id, setid] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  useEffect(() => {
    Books({}).then((res) => {
      // console.log(res.data, "here");
      setdata(res.data);
    });
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  function Added() {
    const title = document.getElementById("title") as HTMLInputElement | null;
    // const image = document.getElementById("image") as HTMLInputElement | null;
    if (title !== null && selectedFile) {
      const val1 = title.value;
      console.log("Title:", title.value);
      console.log("Selected File:", selectedFile);
      UploadFile({ filename: val1, file: selectedFile }).then((res) =>
        console.log(res)
      );
    }
    if (title) title.value = "";
    setSelectedFile(null);
  }
  return (
    <div className="w-full bg-white" style={{ padding: "1rem 1rem 0rem" }}>
      <div>
        <input type="text" id="title" placeholder="Title" />
        <input
          type="file"
          id="image"
          placeholder="image"
          onChange={handleFileChange}
        />
        <button onClick={() => Added()}> +Add</button>
      </div>
      <div className="h-5/6 flex gap-4 mt-4">
        {data.map((index: any) => {
          return (
            <div className="w-1/5 h-2/5 relative" key={index.id}>
              <Image src={index.image} alt={"book"} fill />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default index;

"use client";
import React from "react";
import { useState } from "react";
import { Books, UploadFile } from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function index() {
  const [form, setform] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, settitle] = useState("");

  const { Author } = useSelector((state: RootState) => state.gameData);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  function Added() {
    const imageInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement | null;
    const val1 = title;
    console.log("Title:", title);
    console.log("Selected File:", selectedFile);
    UploadFile({
      filename: val1,
      file: selectedFile,
      Author1: Author.toString(),
    }).then((res) => {
      if (res.data.detail === "Added") {
        if (imageInput) {
          if (imageInput.type === "file") {
            imageInput.value = "";
          }
        }
        settitle("");
        alert(res.data.detail);
        setform(false);
      } else {
        console.log(res.data.detail);
      }

      console.log(res.data.detail);
    });
  }
  console.log(Author);

  return (
    <div className="p-[2rem] h-[100%] relative">
      <button
        className="bg-blue-200 p-[10px]"
        onClick={() => {
          setform(true);
        }}
      >
        Add Book
      </button>
      {form && (
        <div
          className="h-[100%] w-[100%] absolute flex justify-center items-center"
          style={{
            backgroundColor: "rgba(.5, .5, .5, .3)",
            top: "0",
            left: "0",
          }}
        >
          <div className="flex gap-[1rem] flex-col">
            <div>
              <button
                className=" p-[1rem] bg-green-200"
                type="submit"
                onClick={() => {
                  if (title !== "" && selectedFile !== null) {
                    Added();
                  } else {
                    title === ""
                      ? alert("No Tile")
                      : selectedFile === null
                      ? alert("No picture")
                      : alert(" no data");
                  }
                }}
              >
                Add Book+
              </button>
            </div>
            <div className="flex  w-[100%] items-baseline">
              <input
                type="text"
                className="w-[50%] h-[3rem]"
                placeholder="book"
                onChange={(e) => settitle(e.target.value)}
                value={title}
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="w-[50%] h-[3rem]"
                id="image-input"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default index;

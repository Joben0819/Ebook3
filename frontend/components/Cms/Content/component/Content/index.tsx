import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { CreateFile, ReadFile, Books } from "@/api";

function index() {
  const [data, setdata] = useState("");
  const [modal, setmodal] = useState(false);
  const [book, setbook] = useState<any>([]);
  const [title, settitle] = useState("");
  const [chapt, setchapt] = useState<string>("0");

  function Added() {
    const books = document.getElementById("books") as HTMLInputElement | null;
    const textfile = document.getElementById(
      "textfile"
    ) as HTMLInputElement | null;
    const chapter = document.getElementById(
      "chapter"
    ) as HTMLInputElement | null;

    if (books !== null && textfile !== null && chapter !== null) {
      const val1 = books.value;
      const val2 = textfile.value;
      const val3 = chapter.value;
      // console.log(val1, val2, val3, "here");
      CreateFile({
        file_name: val3,
        Book: val1,
        text_content: val2,
      }).then((res) => {
        if (res.data.status === true) {
          setmodal(false);
        } else {
          alert(res.data.Message);
        }
      });
    }
  }
  useEffect(() => {
    ReadFile({
      num: `${chapt}`,
      Book: title,
    }).then((res) => {
      setdata(res.data.message);
    });
    Books({}).then((res) => {
      setbook(res.data);
    });
  }, [chapt, title]);
  const filteredData = book.filter((item: any) => item.title === title);
  console.log(title, chapt);
  return (
    <>
      <div className="w-full bg-cyan-700">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Book"
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          {/* <input type="dropdown" placeholder="Chapter" /> */}
          {filteredData.map((item: any, index: string) => {
            // console.log(item.chapter);
            return (
              <div key={index} className="flex w-1/4 justify-between">
                {item?.chapter?.map((data: any, idx: any) => {
                  return (
                    <div key={idx} onClick={() => setchapt(data)}>
                      {data}
                    </div>
                  );
                })}
              </div>
            );
          })}

          <button
            onClick={() => {
              setmodal(true);
            }}
          >
            + Add
          </button>
          <button>chapter</button>
        </div>
        <div className="flex h-5/6">{data}</div>
      </div>
      {modal === true ? (
        <div
          className="absolute h-full flex items-center w-9/12 justify-center"
          style={{ backgroundColor: "rgba(.5, .5, .5, .3)" }}
        >
          <input type="text" className="h-14" placeholder="books" id="books" />
          <input
            type="text"
            className="h-14"
            placeholder="text"
            id="textfile"
          />
          <input
            type="text"
            className="h-14"
            placeholder="Chapter"
            id="chapter"
          />
          <button onClick={() => Added()}>Added</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default index;

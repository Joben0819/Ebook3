import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { CreateFile, Books } from "@/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/";

function index() {
  const [data, setdata] = useState("");
  const [modal, setmodal] = useState(false);
  const [book, setbook] = useState<any>([]);
  const [title, settitle] = useState("");
  const [chapt, setchapt] = useState<string>("");
  const [title2, settitle2] = useState<string>("");
  const [position, setPosition] = React.useState("0");
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
        if (res.data.status === "Added") {
          setmodal(false);
        } else {
          alert(res.data.Message);
        }
      });
    }
  }
  useEffect(() => {
    Books({}).then((res) => {
      setbook(res.data);
    });
  }, [chapt, title]);
  const filteredData = book.filter((item: any) => item.filename === title);

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
          <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                {filteredData?.map((item: any, index: string) => {
                  return (
                    <div key={item.id}>
                      {item?.chapter?.map((data: any, idx: any) => {
                        return (
                          <DropdownMenuRadioItem
                            value={idx}
                            key={idx}
                            onClick={() => {
                              setchapt(data.content), settitle2(data.title);
                            }}
                          >
                            {data.title}
                          </DropdownMenuRadioItem>
                        );
                      })}
                    </div>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={() => {
              setmodal(true);
            }}
          >
            + Add
          </button>
        </div>
        <div className="flex h-5/6 flex-col items-center overflow-y-auto p-5 leading-loose">
          <h1 className="text-xl font-bold"> {title2}</h1>
          {chapt}
        </div>
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

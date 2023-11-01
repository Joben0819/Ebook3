"use client";
import React, { useState, useEffect } from "react";
import { AddedBooks, Books, RemoveBook } from "@/api";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setChapter, AddBooked } from "@/reducers/gameData";
import { useRouter } from "next/navigation";
import Bookstore from "@/assets/Books/Library.png";
import { RootState } from "@/store";

export default function index() {
  const sample = [
    {
      image: "https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg",
      title: "Dracula",
    },
    {
      image:
        "https://www.gutenberg.org/cache/epub/47960/pg47960.cover.medium.jpg",
      title: "Romeo and Juliet",
    },
    {
      image:
        "https://www.gutenberg.org/cache/epub/10830/pg10830.cover.medium.jpg",
      title: "Cinderella",
    },
    {
      image: "https://www.gutenberg.org/cache/epub/15/pg15.cover.medium.jpg",
      title: "Moby Dick",
    },
    {
      image:
        "https://www.gutenberg.org/cache/epub/29447/pg29447.cover.medium.jpg",
      title: "Perez the mouse",
    },
  ];
  const [part, separt] = useState<any | null>("");
  const [added, setadded] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { Response, AddedBook } = useSelector(
    (state: RootState) => state.gameData
  );

  useEffect(() => {
    const inputElement = document.getElementById(
      "search"
    ) as HTMLInputElement | null;
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (inputElement) {
          separt(inputElement?.value);
        }
      }
    };
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyPress);
    }

    //@ts-ignore
    dispatch(AddBooked(Response.name, Response.id));

    Books({}).then((res) => {
      // console.log(res.data, "here");
      setdata(res.data);
    });

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, []);

  const filteredProducts =
    AddedBook &&
    AddedBook.filter((product: any, index: number) => product.status === 1);

  function Removed(datas: string, index: number) {
    console.log(Response.id, data, Response.name, "here");
    // const books = data.filter(
    //   (item: any) => item.title === AddedBook[index].book
    // );
    RemoveBook({ id: Response.id, book: datas, name: Response.name }).then(
      (res) => {
        sessionStorage.removeItem(`${index}-id`);

        //@ts-ignore
        dispatch(AddBooked(Response.name, Response.id));
        alert("wala");
      }
    );
    // console.log(index, "here");
  }
  console.log(Response);
  return (
    <>
      <div className="h-full flex items-center flex-col gap-12">
        <div className="w-full" style={{ textAlign: "center" }}>
          Library
        </div>
        <div className="w-full h-full flex gap-y-8 flex-wrap gap-20 justify-center">
          {filteredProducts &&
            filteredProducts.map((data: any, index: number) => {
              return (
                <div
                  className="w-44 relative h-52 flex items-center flex-col group/item hover:bg-slate-100 ..."
                  key={index}
                >
                  {/* {AddedBook[Number(sessionStorage.getItem(`${index}-id`))]
                  ?.book === data.title ? (
                  <> */}
                  <div className="relative w-11/12 relative h-48">
                    <Image
                      src={data.image ? data.image : Bookstore}
                      alt={data.title}
                      sizes="(max-width: 100vw) 100vw"
                      priority={true}
                      fill
                    />
                  </div>
                  {data.title}
                  <div
                    className="group/edit invisible absolute w-full flex-col h-full flex justify-center items-center group-hover/item:visible ..."
                    style={{ backgroundColor: "rgba(.5, .5, .5, .3)" }}
                  >
                    <span
                      className="group-hover/edit:text-gray-700 ..."
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => {
                        Removed(data.book, data.idx);
                      }}
                    >
                      Removed
                    </span>
                    <span
                      className="group-hover/edit:text-gray-700 ..."
                      style={{ cursor: "pointer", color: "#fff" }}
                      onClick={() => {
                        router.push(`/read?Book=${data.title}&data=0`),
                          dispatch(setChapter(data.chapter));
                      }}
                    >
                      Read
                    </span>
                  </div>
                  {/* </>
                ) : (
                  ""
                )} */}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

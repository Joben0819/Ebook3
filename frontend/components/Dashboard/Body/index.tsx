"use client";
import React, { useEffect, useState } from "react";
import Bookstore from "@/assets/Books/Library.png";
import Image from "next/image";
import { Books, AddedBooks } from "@/api";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setChapter } from "@/reducers/gameData";
import { RootState } from "@/store";

function index() {
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
  const router = useRouter();
  const [part, separt] = useState<any | null>("");
  const [added, setadded] = useState<any>([]);
  const [data, setdata] = useState<any>([]);
  const dispatch = useDispatch();
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

    Books({}).then((res) => {
      // console.log(res.data, "here");
      setdata(res.data);
    });

    AddedBooks({ name: "Kathleen", id: 2 }).then((res) =>
      setadded(res.data[0].Books)
    );

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, []);
  const filteredProducts =
    part?.length === 0
      ? data
      : data.filter((product: any) => product.title === part);

  // console.log(added[0]?.book, Response, "Response");

  return (
    <div className="flex w-full items-center h-[90] flex-col gap-12">
      <div className="flex-col flex w-full items-center">
        <div className="w-14 relative h-16 flex">
          <Image
            src={Bookstore}
            alt="1"
            sizes="(max-width: 100vw) 100vw"
            priority={true}
            quality={100}
            fill
          />
        </div>
        <h3 className="text-center">Books</h3>
      </div>
      <div className="w-full h-full flex gap-y-8 flex-wrap gap-20 justify-center">
        {filteredProducts.map((data: any, index: number) => {
          return (
            <div
              className="w-44 h-52 relative flex items-center flex-col group/item hover:bg-slate-100 ..."
              key={index}
            >
              {AddedBook[index]?.book === data.title ? (
                <div className="absolute right-[10px] z-[1] top-[0] rounded-[10px] bg-green-500 h-[20px] w-[20px]"></div>
              ) : (
                ""
              )}
              <div className="relative w-11/12 relative h-48">
                <Image
                  src={data.base64img ? data.base64img : Bookstore}
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
                  style={{
                    cursor: "pointer",
                    color:
                      AddedBook[index]?.book === data.title ? "blue" : "#fff",
                  }}
                  onClick={() => {
                    //@ts-ignore
                    dispatch(AddBooked(Response.name, Response.id));
                  }}
                >
                  Favorite
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default index;

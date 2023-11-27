"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Books, Onread, Done, Onrate } from "@/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Book } from "@/reducers/gameData";

function index() {
  const searchParams = useSearchParams();
  const params = searchParams.get("Book") || "";
  const dex = searchParams.get("index");
  const number = searchParams.get("data") || 0;
  const router = useRouter();
  const dispatch = useDispatch();
  const { Chapter, Response, Bookshelf } = useSelector(
    (state: RootState) => state.gameData || []
  );

  const FilteredBook = Bookshelf.filter(
    (data: any) => data.filename === Chapter
  );

  useEffect(() => {
    const hgt = document.getElementById("story") as HTMLElement;
    function handleScroll() {
      const distanceToBottom =
        document.documentElement.scrollHeight - window.innerHeight;

      if (distanceToBottom === Math.round(window.scrollY)) {
        if (
          Number(number) === FilteredBook[0].chapter?.length - 1 &&
          Response.length !== 0
        ) {
          Done({ id: Response.id, book: FilteredBook[0].filename });
          console.log("DONE");
        }
      }
    }
    if (Number(hgt?.clientHeight) > 500) {
      // document.addEventListener("DOMContentLoaded", function () {
      window.addEventListener("scroll", handleScroll);
      // });
      console.log("tall");
    } else {
      if (
        Number(number) === FilteredBook[0].chapter?.length - 1 &&
        Response.length !== 0
      ) {
        Done({ id: Response.id, book: FilteredBook[0].filename });
        console.log("Done2");
      }
      console.log("small");
    }

    // console.log(document.documentElement.scrollHeight - window.innerHeight);

    //@ts-ignore
    dispatch(Book());

    // const innerhgt = hgt?.clientHeight;
    console.log(hgt?.clientHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [number, Chapter]);

  // console.log(
  //   Bookshelf.filter((data: any) => data.filename === Chapter)[0]?.chapter[
  //     number
  //   ]?.title,

  //   "here2"
  // );
  const Href = sessionStorage.getItem("href");

  console;
  console.log(FilteredBook[0].chapter[Number(number)]?.title);
  return (
    <>
      <Button
        onClick={() => router.push(`${Href}`)}
        className="ml-[2rem] cursor-pointer"
        id="element"
      >
        Back
      </Button>
      <div className="text-center p-[3rem]">
        <h1 className="text-[1.5rem]">
          {FilteredBook[0].chapter[Number(number)]?.title}
        </h1>
        <div id="story">{FilteredBook[0].chapter[Number(number)]?.content}</div>

        <div className="flex w-full justify-between ">
          <Button
            variant={Number(number) === 0 ? "secondary" : "default"}
            onClick={() => {
              if (Number(number) === 0) {
                ("");
              } else {
                Onread({
                  id: Response.id,
                  book: FilteredBook[0].filename,
                  image: FilteredBook[0].image,
                  name: Response.name,
                  idx: Number(dex),
                  inread: Number(number) - 1,
                  author: FilteredBook[0].author,
                });
                router.push(
                  `/read?Book=${params}&data=${Number(number) - 1}&index=${dex}`
                );
              }
            }}
          >
            Prev
          </Button>
          <Button
            variant={
              Number(number) === FilteredBook[0].chapter?.length - 1
                ? "secondary"
                : "default"
            }
            onClick={() => {
              if (Number(number) === FilteredBook[0].chapter?.length - 1) {
                ("");
              } else {
                if (Response.length !== 0) {
                  Onread({
                    id: Response.id,
                    book: FilteredBook[0].filename,
                    image: FilteredBook[0].image,
                    name: Response.name,
                    idx: Number(dex),
                    inread: Number(number) + 1,
                    author: FilteredBook[0].author,
                  });
                  Onrate({
                    id: FilteredBook[0].id,
                    username: FilteredBook[0].author,
                    book: FilteredBook[0].filename,
                    reader: Response.id,
                  });
                }
                router.push(
                  `/read?Book=${params}&data=${Number(number) + 1}&index=${dex}`
                );
              }
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default index;

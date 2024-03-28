"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Books, Onread, Done, Onrate, Reading } from "@/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Book } from "@/reducers/gameData";

function Read() {
  const searchParams = useSearchParams();
  const params: string = searchParams.get("Book") || "";
  const dex: number = Number(searchParams.get("id")) || 0;
  const number: number = Number(searchParams.get("Chapter")) || 0;
  const [data, setdata] = useState({
    title: "",
    content: "",
    status: false,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { Chapter, Response, Bookshelf } = useSelector(
    (state: RootState) => state.gameData || []
  );

  // const FilteredBook = Bookshelf.filter(
  //   (data: any) => data.filename === params
  // );

  useEffect(() => {
    const hgt = document.getElementById("story") as HTMLElement;
    // function handleScroll() {
    //   const distanceToBottom =
    //     document.documentElement.scrollHeight - window.innerHeight;

    //   if (distanceToBottom === Math.round(window.scrollY)) {
    //     if (
    //       Number(number) === FilteredBook[0].chapter?.length - 1 &&
    //       Response.length !== 0
    //     ) {
    //       Done({ id: Response.id, book: FilteredBook[0].filename });
    //       console.log("DONE");
    //     }
    //   }
    // }
    // if (Number(hgt?.clientHeight) > 500) {
    //   // document.addEventListener("DOMContentLoaded", function () {
    //   window.addEventListener("scroll", handleScroll);
    //   // });
    //   console.log("tall");
    // } else {
    //   if (
    //     Number(number) === FilteredBook[0]?.chapter?.length - 1 &&
    //     Response.length !== 0
    //   ) {
    //     Done({ id: Response.id, book: FilteredBook[0].filename });
    //     console.log("Done2");
    //   }
    //   console.log("small");
    // }

    // console.log(document.documentElement.scrollHeight - window.innerHeight);

    // //@ts-ignore
    // dispatch(Book());

    Reading({ id: 0, book: params, idx: number }).then((res) => {
      console.log(res?.data, "length");
      if (res?.data?.Chapter?.length !== 0) {
        setdata({
          title: res?.data?.Chapters?.Title,
          content: res?.data?.Chapters?.content,
          status: res?.data?.data,
        });
        console.log(res?.data?.Chapters);
      } else {
        setdata({
          title: "No Chapter",
          content: "No Content",
          status: res?.data?.data,
        });
      }
    });
    // const innerhgt = hgt?.clientHeight;
    console.log(hgt?.clientHeight, "here clientHeight");

    return () => {
      // window.removeEventListener("scroll", handleScroll);
    };
  }, [number]);

  return (
    <>
      <Button
        onClick={() => {
          window.location.href = "/";
        }}
        className="ml-[2rem] cursor-pointer"
        id="element"
      >
        Back
      </Button>
      <div className="text-center p-[3rem]">
        <h1 className="text-[1.5rem]">{data.title}</h1>
        <div id="story">{data.content}</div>

        <div className="flex w-full justify-between">
          <Button
            variant={Number(number) === 0 ? "secondary" : "default"}
            onClick={() => {
              if (Number(number) !== 0) {
                // } else {
                // Onread({
                //   id: Response.id,
                //   book: FilteredBook[0].filename,
                //   image: FilteredBook[0].image,
                //   name: Response.name,
                //   idx: Number(dex),
                //   inread: Number(number) - 1,
                //   author: FilteredBook[0].author,
                // });
                router.push(
                  `/read?Chapter=${number - 1}&Book=${params}&id=${dex}`
                );
              }
            }}
          >
            Prev
          </Button>
          <Button
            variant={data.title === "No Chapter" ? "secondary" : "default"}
            onClick={() => {
              if (data.title !== "No Chapter") {
                router.push(
                  `/read?Chapter=${number + 1}&Book=${params}&id=${dex}`
                );
              }
              // else {
              // if (Response.length !== 0) {
              //   Onread({
              //     id: Response.id,
              //     book: FilteredBook[0].filename,
              //     image: FilteredBook[0].image,
              //     name: Response.name,
              //     idx: Number(dex),
              //     inread: Number(number) + 1,
              //     author: FilteredBook[0].author,
              //   });
              //   Onrate({
              //     id: FilteredBook[0].id,
              //     username: FilteredBook[0].author,
              //     book: FilteredBook[0].filename,
              //     reader: Response.id,
              //   });
              // }
              // router.push(
              //   `/read?Book=${params}&data=${Number(number) + 1}&index=${dex}`
              // );
              // }
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default Read;

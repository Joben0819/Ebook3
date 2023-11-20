"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Books, Onread, Done } from "@/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function index() {
  // const [data, setdata] = useState<any>([]);
  // const [text, settext] = useState("");
  const searchParams = useSearchParams();
  const params = searchParams.get("Book") || "";
  const dex = searchParams.get("index");
  const number = searchParams.get("data") || 0;
  const router = useRouter();
  // console.log(Number(number), "here");
  const { Chapter, Response } = useSelector(
    (state: RootState) => state.gameData || []
  );

  useEffect(() => {
    // ReadFile({
    //   num: Chapter.chapter[Number(number)],
    //   Book: params,
    // }).then((res) => settext(res.data.message));
    // Books({}).then((res) => setdata(res.data));

    const hgt = document.getElementById("story") as HTMLElement;
    const innerhgt = hgt?.clientHeight;
    // console.log(hgt?.clientHeight, "this");

    function handleScroll() {
      const distanceToBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);

      const threshold = 1000;
      if (distanceToBottom < threshold) {
        if (
          Number(number) === Chapter.chapter?.length - 1 &&
          Response.length !== 0
        ) {
          Done({ id: Response.id, book: Chapter.filename });
          console.log("Done");
        }
      }
      // console.log("here");
    }
    if (Number(innerhgt) > window.innerHeight) {
      window.addEventListener("scroll", handleScroll);
    } else {
      if (
        Number(number) === Chapter.chapter?.length - 1 &&
        Response.length !== 0
      ) {
        Done({ id: Response.id, book: Chapter.filename });
        console.log("Done2");
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [number, Chapter]);

  console.log(Response, Chapter);
  const Href = sessionStorage.getItem("href");
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
          {Chapter.chapter[Number(number)]?.title}
        </h1>
        <div id="story">{Chapter.chapter[Number(number)]?.content}</div>

        <div className="flex w-full justify-between ">
          <Button
            variant={Number(number) === 0 ? "secondary" : "default"}
            onClick={() => {
              if (Number(number) === 0) {
                ("");
              } else {
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
              Number(number) === Chapter.chapter?.length - 1
                ? "secondary"
                : "default"
            }
            onClick={() => {
              if (Number(number) === Chapter.chapter?.length - 1) {
                ("");
              } else {
                if (Response.length !== 0) {
                  Onread({
                    id: Response.id,
                    book: Chapter.filename,
                    image: Chapter.image,
                    name: Response.name,
                    idx: Number(dex),
                    inread: Number(number) + 1,
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

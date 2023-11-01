"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ReadFile, Books, Onread, Done } from "@/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function index() {
  const [data, setdata] = useState<any>([]);
  const [text, settext] = useState("");
  const searchParams = useSearchParams();
  const params = searchParams.get("Book");
  const dex = searchParams.get("index");
  const number = !searchParams.get("data") ? 0 : searchParams.get("data");
  const router = useRouter();
  // console.log(Number(number), "here");
  const { Chapter, Response } = useSelector(
    (state: RootState) => state.gameData || []
  );

  useEffect(() => {
    ReadFile({
      Book: params,
      num: Chapter.chapter[Number(number)],
    }).then((res) => settext(res.data.message));
    Books({}).then((res) => setdata(res.data));
  }, [number]);
  const filteredProducts = data.filter(
    (product: any) => product.title === params
  );
  const MapProducts = filteredProducts.map(
    (product: any) => product.chapter[Number(number)]
  );
  // console.log(
  //   // Chapter?.chapter?.length - 1,
  //   // Number(number),
  //   Chapter,
  //   "there's"
  // );

  useEffect(() => {
    function handleScroll() {
      const distanceToBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);

      const threshold = 100;

      if (distanceToBottom < threshold) {
        if (
          Number(number) === Chapter.chapter?.length - 1 &&
          Response.length !== 0
        ) {
          Done({ id: Response.id, book: Chapter.title });
          console.log("Done");
        } else {
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [number, Chapter]);

  return (
    <>
      <div
        onClick={() => router.push(`/`)}
        className="ml-[2rem] cursor-pointer"
        id="element"
      >
        Back
      </div>
      <div className="text-center p-[3rem]">
        <h1 className="text-[1.5rem]">{Chapter.chapter[Number(number)]}</h1>
        {text}
        <div className="flex w-full justify-between ">
          <Button
            variant={Number(number) === 0 ? "secondary" : ""}
            onClick={() => {
              if (Number(number) === 0) {
                ("");
              } else {
                router.push(`/read?Book=${params}&data=${Number(number) - 1}`);
              }
            }}
          >
            Prev
          </Button>
          <Button
            variant={
              Number(number) === Chapter.chapter?.length - 1 ? "secondary" : ""
            }
            onClick={() => {
              if (Number(number) === Chapter.chapter?.length - 1) {
                ("");
              } else {
                if (Response.length !== 0) {
                  Onread({
                    id: Response.id,
                    book: Chapter.title,
                    image: Chapter.base64img,
                    name: Response.name,
                    idx: dex,
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

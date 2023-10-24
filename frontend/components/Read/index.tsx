"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ReadFile, Books } from "@/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function index() {
  const [data, setdata] = useState<any>([]);
  const [text, settext] = useState("");
  const searchParams = useSearchParams();
  const params = searchParams.get("Book");
  const number = !searchParams.get("data") ? 0 : searchParams.get("data");
  const router = useRouter();
  console.log(Number(number), "here");
  const { Chapter } = useSelector((state: RootState) => state.gameData);

  useEffect(() => {
    ReadFile({
      Book: params,
      num: Chapter[Number(number)],
    }).then((res) => settext(res.data.message));
    Books({}).then((res) => setdata(res.data));
  }, [number]);
  const filteredProducts = data.filter(
    (product: any) => product.title === params
  );
  const MapProducts = filteredProducts.map(
    (product: any) => product.chapter[Number(number)]
  );
  console.log(Chapter.length - 1, Number(number), "there's");

  return (
    <div className="text-center p-[3rem]">
      <h1 className="text-[1.5rem]">{Chapter[Number(number)]}</h1>
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
          variant={Number(number) === Chapter?.length - 1 ? "secondary" : ""}
          onClick={() => {
            if (Number(number) === Chapter?.length - 1) {
              ("");
            } else {
              router.push(`/read?Book=${params}&data=${Number(number) + 1}`);
            }
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default index;

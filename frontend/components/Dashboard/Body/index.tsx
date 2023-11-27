"use client";
import React, { useEffect, useState } from "react";
import Bookstore from "@/assets/Books/Library.png";
import Image from "next/image";
import { Books, AddBook, RemoveBook, Authored } from "@/api";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setChapter, AddBooked, setModal } from "@/reducers/gameData";
import { RootState } from "@/store";
import { Item } from "@radix-ui/react-dropdown-menu";
import { useGetDataMutation } from "@/api-rtk";

function index() {
  const router = useRouter();
  const [part, separt] = useState<string | null>("");
  const [data1, setdata] = useState<any>([]);
  const dispatch = useDispatch();
  const { Response, AddedBook } = useSelector(
    (state: RootState) => state.gameData
  );
  // const { data: activity_events = [], isLoading: isLoadingEvents } =
  //   useGetDataMutation({});
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
      setdata(res.data);
    });
    if (Response?.length !== 0) {
      //@ts-ignore
      dispatch(AddBooked(Response?.name, Response?.id));
    }
    // Authored({ username: "Joben" }).then((res) => {
    //   console.log(res, "author");
    // });
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, []);
  const filteredProducts = part
    ? data1.filter((product: any) => product.filename === part)
    : data1;

  function Added(data: string, image: string, index: number) {
    AddBook({
      id: Response.id,
      book: data,
      name: Response.name,
      image: !image ? "" : image,
      idx: index,
    }).then((res) => {
      if (res.data.detail === "Added") {
        //@ts-ignore
        dispatch(AddBooked(Response.name, Response.id));
        alert(res.data.detail);
      } else {
        alert(res.data.detail);
        //@ts-ignore
        dispatch(AddBooked(Response.name, Response.id));
      }
    });
  }

  function Removed(data: string, index: number) {
    RemoveBook({ id: Response.id, book: data, name: Response.name }).then(
      (res) => {
        sessionStorage.removeItem(`Library-${data}`);
        //@ts-ignore
        dispatch(AddBooked(Response.name, Response.id));
        alert(data);
      }
    );
  }

  function Addition(title: string, data: number) {
    AddedBook &&
      AddedBook.forEach((item: any, idx: any) => {
        sessionStorage.setItem(`title-${item.book}`, idx);
        sessionStorage.setItem(`count-favorite`, AddedBook.length);
      });
  }

  const InDex = (data: string) => {
    const a = sessionStorage.getItem(`title-${data}`);
    if (a) {
      return a;
    } else {
      return "";
    }
  };

  // console.log(data1?.detail, AddedBook);
  // const example1 = AddedBook.filter((items: any, idx2: number) =>
  //   items.inread !== 0 ? idx2 : idx2
  // );

  // const fetchData = async () => {
  //   try {
  //     //  const resultAction = await dispatch(getData());
  //     //  const result = unwrapResult(resultAction);
  //     console.log("Fetched Footer Data:");
  //   } catch (error) {
  //     console.error("Error fetching Footer Data:", error);
  //   }
  //   console.log("server-side");
  // };
  // console.log(AddedBook, "here");
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
        {data1?.detail === "wala" ? (
          <span>No Books</span>
        ) : filteredProducts.length === 0 && AddedBook ? (
          "Loading"
        ) : (
          filteredProducts.map((data: any, index: number) => {
            Addition(data.filename, index);
            return (
              <div
                className="w-44 relative flex items-center flex-col group/item hover:bg-slate-100 ..."
                key={index}
              >
                {AddedBook && AddedBook[InDex(data.filename)]?.status === 1 ? (
                  <div className="absolute right-[10px] z-[1] top-[0] rounded-[10px] bg-green-500 h-[20px] w-[20px]" />
                ) : (
                  ""
                )}
                <div className="relative w-11/12 relative h-48">
                  <Image
                    src={data.image ? data.image : Bookstore}
                    alt={data.filename}
                    sizes="(max-width: 100vw) 100vw"
                    priority={true}
                    fill
                  />
                </div>
                <p
                  className="w-full text-center text-[1.3rem] border-b-2"
                  style={{
                    color: "rgb(167,25,75)",
                    fontFamily: "ui-monospace",
                  }}
                >
                  {data.filename}
                </p>
                <div
                  className="text-[.8rem] flex justify-between w-full"
                  style={{ color: "rgb(172,172,172)" }}
                >
                  <span>By:{data.author}</span>
                  <span>Reader: 10</span>
                </div>

                <div
                  className="group/edit invisible absolute w-full flex-col h-full flex justify-center items-center group-hover/item:visible ..."
                  style={{ backgroundColor: "rgba(.5, .5, .5, .3)" }}
                >
                  {AddedBook &&
                  AddedBook[InDex(data.filename)]?.status === 1 ? (
                    <span
                      className="group-hover/edit:text-gray-700 ..."
                      style={{
                        cursor: "pointer",
                        color: "blue",
                      }}
                      onClick={() => {
                        Removed(data.filename, index);
                      }}
                    >
                      Removed
                    </span>
                  ) : (
                    <span
                      className="group-hover/edit:text-gray-700 ..."
                      style={{
                        cursor: "pointer",
                        color: "#fff",
                      }}
                      onClick={() => {
                        if (Response.length !== 0) {
                          Added(data.filename, data.image, index);
                        } else {
                        }
                      }}
                    >
                      Favorite
                    </span>
                  )}
                  <span
                    className="group-hover/edit:text-gray-700 ..."
                    style={{ cursor: "pointer", color: "#fff" }}
                    onClick={() => {
                      if (data.chapter) {
                        router.push(
                          `/read?Book=${data.filename}&data=${
                            (AddedBook &&
                              AddedBook[InDex(data.filename)]?.inread) ||
                            0
                          }&index=${index}`
                        );
                        dispatch(setChapter(data.filename));
                      } else {
                        alert("No Story Yet");
                      }
                    }}
                  >
                    {AddedBook && AddedBook.length !== 0 ? (
                      AddedBook &&
                      AddedBook[InDex(data.filename)]?.Done === true &&
                      AddedBook[InDex(data.filename)]?.onread === false ? (
                        <>Done</>
                      ) : AddedBook &&
                        AddedBook[InDex(data.filename)]?.Done === false &&
                        AddedBook[InDex(data.filename)]?.onread === false ? (
                        <>Read</>
                      ) : AddedBook &&
                        AddedBook[InDex(data.filename)]?.Done === false &&
                        AddedBook[InDex(data.filename)]?.onread === true ? (
                        <>Onread</>
                      ) : (
                        ""
                      )
                    ) : (
                      <>Read</>
                    )}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default index;

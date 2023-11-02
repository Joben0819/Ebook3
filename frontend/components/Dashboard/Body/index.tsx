"use client";
import React, { useEffect, useState } from "react";
import Bookstore from "@/assets/Books/Library.png";
import Image from "next/image";
import { Books, AddedBooks, AddBook, RemoveBook } from "@/api";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setChapter, AddBooked, setModal } from "@/reducers/gameData";
import { RootState } from "@/store";
import { Item } from "@radix-ui/react-dropdown-menu";

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
  const [added, setadded] = useState<any>("");
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
      setdata(res.data);
    });
    if (Response.length !== 0) {
      //@ts-ignore
      dispatch(AddBooked(Response.name, Response.id));
    }

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

  // const addedbooked = ;

  console.log(
    // AddedBook &&
    //   AddedBook[Number(sessionStorage.getItem(`${1}-readonly`))]?.Done,
    // sessionStorage.getItem(`${1}-readonly`)
    //   ? Number(sessionStorage.getItem(`${1}-readonly`))
    //   : "",
    Response.length === 0 ? 2 : AddedBook,
    "Response"
  );

  function Added(data: string, image: string, index: number) {
    // console.log(Response.id, data, Response.name, image, "here");
    AddBook({
      id: Response.id,
      book: data,
      name: Response.name,
      image: !image ? "" : image,
      idx: index,
    }).then((res) => {
      console.log(res);
      if (res.data.detail === "Added") {
        //@ts-ignore
        dispatch(AddBooked(Response.name, Response.id));
        alert(res.data.detail);
      } else {
        alert(res.data.detail);
      }
    });
  }

  function Removed(data: string, index: number) {
    // console.log(Response.id, data, Response.name, "here");
    RemoveBook({ id: Response.id, book: data, name: Response.name }).then(
      (res) => {
        sessionStorage.removeItem(`${index}-id`);
        //@ts-ignore
        dispatch(AddBooked(Response.name, Response.id));
        alert(data);
      }
    );
  }

  function Addition(title: string, data: number) {
    AddedBook &&
      AddedBook.forEach((item: any, idx: any) => {
        if (item.book === title) {
          if (item.status === 1) {
            sessionStorage.setItem(`${data}-id`, idx.toString());
            sessionStorage.setItem(`${data}-id`, idx.toString());
            sessionStorage.setItem(`title-${item.book}`, idx);
            if (item.inread) {
              sessionStorage.setItem(`${item.book}`, item.inread.toString());
            }
            console.log(item), "read";
          } else {
            sessionStorage.setItem(`${data}-readonly`, idx.toString());
            if (item.inread) {
              sessionStorage.setItem(`${item.book}`, item.inread.toString());
            }
            console.log(item, "read");
          }
        }
      });
  }

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
          Addition(data.title, index);
          return (
            <div
              className="w-44 h-52 relative flex items-center flex-col group/item hover:bg-slate-100 ..."
              key={index}
            >
              {AddedBook &&
              AddedBook[
                sessionStorage.getItem(`${index}-id`)
                  ? Number(sessionStorage.getItem(`${index}-id`))
                  : ""
              ]?.status === 1 ? (
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
                {AddedBook &&
                AddedBook[
                  sessionStorage.getItem(`${index}-id`)
                    ? Number(sessionStorage.getItem(`${index}-id`))
                    : ""
                ]?.book === data.title ? (
                  <span
                    className="group-hover/edit:text-gray-700 ..."
                    style={{
                      cursor: "pointer",
                      color: "blue",
                    }}
                    onClick={() => {
                      Removed(data.title, index);
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
                        Added(data.title, data.base64img, index);
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
                      if (sessionStorage.getItem(`${data.title}`)) {
                        router.push(
                          `/read?Book=${
                            data.title
                          }&data=${sessionStorage.getItem(
                            `${data.title}`
                          )}&index=${index}`
                        );
                      } else {
                        router.push(
                          `/read?Book=${data.title}&data=0&index=${index}`
                        );
                      }
                      dispatch(setChapter(data));
                    } else {
                      alert("No Story Yet");
                    }
                  }}
                >
                  {AddedBook &&
                  AddedBook[
                    sessionStorage.getItem(`${index}-id`)
                      ? Number(sessionStorage.getItem(`${index}-id`))
                      : sessionStorage.getItem(`${index}-readonly`)
                      ? Number(sessionStorage.getItem(`${index}-readonly`))
                      : ""
                  ]?.onread === true ? (
                    AddedBook &&
                    AddedBook[
                      sessionStorage.getItem(`${index}-id`)
                        ? Number(sessionStorage.getItem(`${index}-id`))
                        : sessionStorage.getItem(`${index}-readonly`)
                        ? Number(sessionStorage.getItem(`${index}-readonly`))
                        : ""
                    ]?.Done === true ? (
                      <>Done</>
                    ) : (
                      <>Onread</>
                    )
                  ) : (
                    <>Read</>
                  )}
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

"use client";
import React, { useState, useEffect } from "react";
import { UploadFile, CreateFile, BookSheleves } from "@/api";
import { RootState } from "@/store";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Book } from "@/reducers/gameData";
import { useRouter } from "next/navigation";
interface Author {
  author: string;
  chapter: any[];
  filename: string;
  id: number;
  image: string;
  _id: string;
}

function index() {
  const [form, setform] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [load, setload] = useState(false);
  const [title, settitle] = useState("");
  const [index, setindex] = useState<any>("");
  const [chapter, setchapter] = useState("");
  const [book, setbook] = useState<any>([]);
  const [writer, setwriter] = useState([]);
  const [position, setPosition] = useState<any>("");
  const dispatch = useDispatch();
  const { Author, Bookshelf, Response } = useSelector(
    (state: RootState) => state.gameData
  );
  const router = useRouter();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  useEffect(() => {
    //@ts-ignore
    dispatch(Book());
  }, []);

  const filteredAuthor: Author[] =
    Bookshelf.detail === "wala"
      ? ""
      : Bookshelf.filter((data: any) => data.author === Author);

  //   console.log(filteredAuthor);

  function Added() {
    const imageInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement | null;
    const val1 = title;
    // console.log("Title:", title);
    // console.log("Selected File:", selectedFile);
    UploadFile({
      filename: val1,
      file: selectedFile,
      Author1: Author.toString(),
    }).then((res) => {
      if (res.data.detail === "Added") {
        if (imageInput) {
          if (imageInput.type === "file") {
            imageInput.value = "";
          }
        }
        //@ts-ignore
        dispatch(Book());
        BookSheleves({ id: Response.id, book: val1 });
        settitle("");
        alert(res.data.detail);
        setform(false);
      } else {
        alert(res.data.detail);
      }

      //   console.log(res.data.detail);
    });
  }

  const Chapter = () => {
    const story = document.getElementById(
      "textarea"
    ) as HTMLInputElement | null;

    if (story !== null) {
      console.log(story?.value, chapter, book);
      setload(true);
      CreateFile({
        file_name: chapter,
        Book: book?.filename,
        text_content: story?.value,
      }).then((res) => {
        if (res.data.status === "Added") {
          //@ts-ignore
          dispatch(Book());
          setTimeout(() => {
            setload(false);
            setchapter("");
            setbook([]);
            story.value = "";
            alert("success");
          }, 2000);
        } else {
          alert(res.data.Message);
        }
      });
    }
  };

  console.log(Bookshelf, "part2");

  return (
    <div className="p-[2rem] h-[100%] relative">
      {form && (
        <div
          className="h-[100%] w-[100%] absolute flex justify-center items-center z-[1]"
          style={{
            backgroundColor: "rgba(.5, .5, .5, .3)",
            top: "0",
            left: "0",
          }}
        >
          <div className="flex gap-[1rem] flex-col">
            <div>
              <button
                className=" p-[1rem] bg-green-200"
                type="submit"
                onClick={() => {
                  if (title !== "" && selectedFile !== null) {
                    Added();
                  } else {
                    title === ""
                      ? alert("No Tile")
                      : selectedFile === null
                      ? alert("No picture")
                      : alert(" no data");
                  }
                }}
              >
                Add Book+
              </button>
            </div>
            <div className="flex justify-between  w-[100%] items-baseline">
              <input
                type="text"
                className="w-[50%] h-[3rem]"
                placeholder="book"
                onChange={(e) => settitle(e.target.value)}
                value={title}
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="w-[45%] h-[3rem]"
                id="image-input"
              />
            </div>
            <div>
              <button
                className=" p-[1rem] bg-green-200"
                type="submit"
                onClick={() => setform(false)}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-[60%]">
        <div className="w-full flex gap-[1rem] h-[10%] justify-between">
          <div className="w-[10%]">
            <Button
              disabled={load}
              className="bg-blue-200"
              onClick={() => {
                router.push("/Library");
              }}
            >
              Back
            </Button>
          </div>
          <div className="h-full flex w-[50%] gap-[1.5rem] ">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {book.length === 0 ? "Open" : book?.filename}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuRadioGroup
                // value={position}
                // onValueChange={setPosition}
                >
                  {Bookshelf.detail === "wala"
                    ? ""
                    : filteredAuthor?.map((data: any, indx: number) => {
                        return (
                          <div
                            key={data.id}
                            onClick={() => (setbook(data), setPosition(indx))}
                            className="cursor-pointer"
                          >
                            {data.filename}
                          </div>
                        );
                      })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              type="text"
              className="bg-gray-300"
              placeholder="Chapter Title"
              onChange={(e) => setchapter(e.target.value)}
              value={chapter}
            />
            <Button
              disabled={load}
              className="bg-blue-200"
              onClick={() => {
                if (load === false && book.length !== 0 && chapter !== "") {
                  Chapter();
                } else {
                  book.length !== 0
                    ? alert("No title book")
                    : chapter === ""
                    ? alert("No title")
                    : "";
                }
              }}
            >
              {load && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

              {load === false ? "Add +" : ""}
            </Button>
          </div>
          <Button
            className="bg-blue-200"
            onClick={() => {
              setform(true);
            }}
          >
            Add Book
          </Button>
        </div>
        <div className="w-full h-[70%] mt-[2rem]">
          <textarea
            className="w-full h-full bg-gray-300"
            name=""
            id="textarea"
            // cols="30"
            // rows="10"
          />
        </div>
        <div className="h-[10]">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {filteredAuthor[position === "" ? "" : position]?.chapter?.map(
                (data: any, idx: number) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setindex(idx);
                      }}
                      className="cursor-pointer"
                      style={{
                        borderBottom: index === idx ? "solid 1px blue" : "",
                      }}
                    >
                      {data.title.length <= 9
                        ? data.title
                        : data.title.substring(0, 9) + "..."}
                    </div>
                  );
                }
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <div className="h-[40%] overflow-y-auto">
        <span>
          {filteredAuthor[0]?.chapter === undefined
            ? ""
            : filteredAuthor[position === "" ? "" : position]?.chapter[
                index === "" ? "" : index
              ]?.content}
        </span>
      </div>
    </div>
  );
}

export default index;

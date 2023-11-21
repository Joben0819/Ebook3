"use client";
import React, { useState, useEffect } from "react";
import { Writers, Books, RemoveBook } from "@/api";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setChapter, AddBooked, Authoreds } from "@/reducers/gameData";
import { useRouter } from "next/navigation";
import Bookstore from "@/assets/Books/Library.png";
import { RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Heart from "@/public/heart.png";
import Book from "@/public/open-book.png";
import Check from "@/public/check-mark.png";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const formSchema = z.object({
  address: z.string().min(5, {
    message: "Address must be at least 2 characters.",
  }),
  Fullname: z.string().min(5, {
    message: "Fullname must be at least 2 characters.",
  }),
  Phonenumber: z.string().min(5, {
    message: "Phonenumber must be at least 2 characters.",
  }),
  id: z.number(),
  status: z.number(),
  username: z.string(),
});

export default function index() {
  const [part, separt] = useState<any | null>("");
  const [data, setdata] = useState<any>([]);
  const [forms, setform] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { Response, AddedBook, Author } = useSelector(
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
      setdata(res.data);
    });

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, []);

  const InDex = (data: string) => {
    const a = sessionStorage.getItem(`Library-${data}`);
    if (a) {
      return a;
    } else {
      return "";
    }
  };

  function Filtered(data: any, sub: string, item2: any, data2: boolean) {
    let data3 = "";

    const favorite = AddedBook.filter((item: any) =>
      item[sub] === item2 ? data : ""
    );
    if (data2 === true) {
      data3 = favorite.length;
    } else {
      data3 = favorite;
    }

    return data3;
  }

  const filteredProducts = part
    ? data.filter((product: any) => product.filename === part)
    : data &&
      data?.filter(
        (product: any) =>
          product.filename ===
          (AddedBook && AddedBook[InDex(product.filename)]?.book)
      );

  function Removed(datas: string) {
    RemoveBook({ id: Response.id, book: datas, name: Response.name }).then(
      (res) => {
        sessionStorage.removeItem(`Library-${datas}`);
        //@ts-ignore
        dispatch(AddBooked(Response.name, Response.id));
        alert("Removed");
      }
    );
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      Fullname: "",
      Phonenumber: "",
      id: Response.id,
      username: Response.name,
      status: 2,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    Writers(values).then((res) => {
      if (res.data.detail === "Congratulation") {
        alert(res.data.detail);
        //@ts-ignore
        dispatch(Authoreds(Response.name));
        setform(false);
      } else {
        alert(res.data.detail);
      }
    });
  }

  console.log(Author);

  return (
    <>
      <div className="h-full flex items-center flex-col  ">
        <div className="text-green-500 flex w-full px-[2.5rem] items-center gap-[1rem]">
          {Author !== Response.name && (
            <span className="cursor-pointer" onClick={() => setform(true)}>
              Become A Writer
            </span>
          )}
          {/* <div className="h-[3px] w-[1rem] bg-green-200 arrow"></div> */}
        </div>
        <div className="w-full" style={{ textAlign: "center" }}>
          Library
        </div>
        <div className="w-full h-[50%] flex gap-y-8 flex-wrap gap-20 justify-center">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {filteredProducts &&
                filteredProducts.map((data: any, index: number) => {
                  return (
                    <div
                      className="w-44 relative h-52 flex items-center flex-col group/item hover:bg-slate-100 ..."
                      key={index}
                    >
                      <div className="relative w-11/12 relative h-48">
                        <Image
                          src={data.image ? data.image : Bookstore}
                          alt={data.filename}
                          sizes="(max-width: 100vw) 100vw"
                          priority={true}
                          fill
                        />
                      </div>
                      {data.filename}
                      <div
                        className="group/edit invisible absolute w-full flex-col h-full flex justify-center items-center group-hover/item:visible ..."
                        style={{ backgroundColor: "rgba(.5, .5, .5, .3)" }}
                      >
                        <span
                          className="group-hover/edit:text-gray-700 ..."
                          style={{ cursor: "pointer", color: "blue" }}
                          onClick={() => {
                            Removed(data.filename);
                          }}
                        >
                          Removed
                        </span>
                        <span
                          className="group-hover/edit:text-gray-700 ..."
                          style={{ cursor: "pointer", color: "#fff" }}
                          onClick={() => {
                            router.push(
                              `/read?Book=${
                                data.filename
                              }&data=0&index=${Number(
                                sessionStorage.getItem(`title-${data.filename}`)
                              )}`
                            ),
                              dispatch(setChapter(data));
                          }}
                        >
                          {AddedBook &&
                          AddedBook[InDex(data.filename)]?.onread === true ? (
                            AddedBook &&
                            AddedBook[InDex(data.filename)]?.Done === true ? (
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
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="w-full h-[10rem] bg-green-200 flex justify-evenly">
            <div className="flex items-center flex-col justify-center">
              <Image src={Heart} alt="heart" width="100" height="100" />
              <span>favorite</span>
              <span>{Filtered(1, "status", 1, true)}</span>
            </div>
            <div className="flex items-center flex-col justify-center">
              <Image src={Book} alt="heart" width="100" height="100" />
              <span>Read</span>
              <span>{Filtered(1, "onread", true, true)}</span>
            </div>
            <div className="flex items-center flex-col justify-center">
              <Image src={Check} alt="heart" width="100" height="100" />
              <span>Done</span>
              <span>{Filtered(1, "Done", true, true)}</span>
            </div>
          </div>
          {Author === Response?.name && (
            <>
              <div
                className="bg-green-200 w-full cursor-pointer h-[2rem]"
                onClick={() => {
                  router.push("/Write");
                }}
              >
                Writer
              </div>
              <div className="bg-green-200 w-full cursor-pointer h-[2rem]">
                Ratings
              </div>
            </>
          )}

          {forms ? (
            <div
              className="fixed w-full h-full justify-center flex items-center"
              style={{ top: "0", backgroundColor: "rgba(.5, .5, .5, .5)" }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-[50%] bg-white p-[1rem] relative"
                >
                  <div
                    className="absolute cursor-pointer"
                    style={{ top: "8px", right: "16px" }}
                    onClick={() => setform(false)}
                  >
                    x
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fullname</FormLabel>
                        <FormControl>
                          <Input placeholder="Fullname" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Phonenumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PhoneNumber</FormLabel>
                        <FormControl>
                          <Input placeholder="PhoneNumber" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { RootState } from "@/store";
import {
  setModal,
  setResponse,
  AddBooked,
  Authoreds,
} from "@/reducers/gameData";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/api";
export default function Login() {
  const dispatch = useDispatch();

  const [state, setstate] = useState(false);
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const { Modal, Response } = useSelector((state: RootState) => state.gameData);
  const Log = () => {
    login({ name: name, password: password }).then((res) => {
      // console.log(res, "here");
      if (res.data.detail !== "Not existed") {
        if (res.data.data === "null") {
          setstate(true);
          setTimeout(() => {
            setstate(false);
            alert("Wrong passcode");
          }, 400);
        } else {
          setstate(true);
          // console.log(res.data[0].id);
          const ids = res.data.id;
          //@ts-ignore
          // dispatch(AddBooked(name, ids));
          // setTimeout(() => {
          setstate(false);
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("id", res.data.id);
          dispatch(setModal(4)),
            //@ts-ignore
            dispatch(AddBooked(name, ids));
          // }, 400);
          window.location.href = "http://localhost:3001/";
        }
      } else {
        setstate(true);
        setTimeout(() => {
          setstate(false);
          alert("Wrong passcode");
        }, 300);
      }
    });
  };

  return (
    <div
      className="w-full h-full items-center flex justify-center fixed"
      style={{ backgroundColor: "rgba(.5,.5,.5,0.3)", zIndex: "2" }}
    >
      <Card className=" w-80 relative">
        <div
          onClick={() => dispatch(setModal(3))}
          className="absolute right-[13px] cursor-pointer"
        >
          x
        </div>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Email"
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </CardContent>
        <CardContent>
          <Input
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </CardContent>
        <CardContent className="flex justify-between">
          <Button disabled={state} onClick={Log}>
            <Loader2
              className="mr-2 h-4 w-4 animate-spin"
              style={{ display: state ? "" : "none" }}
            />
            {state === false ? "Login" : ""}
          </Button>
          <Button
            onClick={() => {
              dispatch(setModal(2));
            }}
          >
            Register
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

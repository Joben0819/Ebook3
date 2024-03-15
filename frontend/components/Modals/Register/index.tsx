import React, { useState } from "react";
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
import { setModal, setResponse, AddBooked } from "@/reducers/gameData";
import { useDispatch, useSelector } from "react-redux";
import { Registered } from "@/api";

export default function Register() {
  const dispatch = useDispatch();
  const [state, setstate] = useState(false);
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");

  const Log = () => {
    Registered({ name: name, password: password }).then((res) => {
      // console.log(res.data[0].id, "register");
      if (res.status === 200) {
        if (res.data.message === "null") {
          setstate(true);
          setTimeout(() => {
            setstate(false);
            alert("Already Existed");
          }, 800);
        } else {
          setstate(true);
          const ids = res.data[0].id;
          setTimeout(() => {
            setstate(false);
            sessionStorage.setItem("data", "meron");
            dispatch(setModal(3)),
              //@ts-ignore
              dispatch(AddBooked(name, ids.toString()));
            dispatch(setResponse(res.data[0]));
          }, 800);
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
      style={{ backgroundColor: "rgba(.5,.5,.5,0.3)", zIndex: "1" }}
    >
      <Card className="w-80 relative">
        <div
          onClick={() => dispatch(setModal(3))}
          className="absolute right-[13px] cursor-pointer"
        >
          x
        </div>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="username"
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
            {state === false ? "Register" : ""}
          </Button>
          <Button
            onClick={() => {
              dispatch(setModal(1));
              console.log("here");
            }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

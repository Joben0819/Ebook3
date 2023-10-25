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
import { setModal, setResponse } from "@/reducers/gameData";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/api";
export default function Login() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.onbeforeunload = () => {
      dispatch(setModal(1));
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const [state, setstate] = useState(false);
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const { Modal, Response } = useSelector((state: RootState) => state.gameData);
  const Log = () => {
    login({ name: name, password: password }).then((res) => {
      if (res.status === 200) {
        if (res.data.data === "null") {
          setstate(true);
          setTimeout(() => {
            setstate(false);
            alert("Wrong passcode");
          }, 400);
        } else {
          setstate(true);
          setTimeout(() => {
            setstate(false);
            sessionStorage.setItem("data", "meron");
            dispatch(setModal(3));
            dispatch(setResponse(res.data[0]));
          }, 400);
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
  console.log("hell0");
  return (
    <>
      <div
        className="w-full h-full items-center flex justify-center fixed"
        style={{ backgroundColor: "rgba(.5,.5,.5,0.3)", zIndex: "2" }}
      >
        <Card className="h-64 w-80">
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
    </>
  );
}

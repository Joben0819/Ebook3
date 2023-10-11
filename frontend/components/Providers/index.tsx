"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
// import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
// import { isBrowser } from "react-device-detect";
// import LoginWithOtpHandler from "../Customs/LoginWithOtpHandler";
// import { ConfigProvider } from "antd";
import { usePathname } from "next/navigation";
// import { IP } from "@/game-99-interface/api";
// import AuthResetter from "../Customs/AuthResetter";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const pathname = usePathname();

//   useEffect(() => {
//     // console.log("@@@pathname: " + pathname);
//     if (
//       !pathname.includes("dashboard") &&
//       pathname !== "/" &&
//       pathname !== "/event" &&
//       pathname !== "/daily-task" &&
//       pathname !== "/mission"
//     ) {
//       document.body.style.height = "100dvh";
//     } else {
//       document.body.style.height = "";
//     }
//   }, [pathname]);

//   useEffect(() => {
//     if (isBrowser) {
//       window.location.href = "https://game99.feiwin.dev/";
//     }
//   }, []);

//   useEffect(() => {
//     IP()
//       .then((res) => {
//         localStorage.setItem("ip", res.data.ip);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

          {/* <AuthResetter /> */}
          {children}

      </PersistGate>
    </Provider>
  );
};

export default Providers;

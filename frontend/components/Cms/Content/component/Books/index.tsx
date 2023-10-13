'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
function index() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/get_data/").then((res) => {
      setdata(res.data);
    });
  }, []);
  return (
    <div className="w-full bg-white" style={{ padding: "1rem 1rem 0rem" }}>
      {data.map((index: any) => {
        console.log(index.base64img);
        return (
          <>
            <div className="w-1/5 h-2/5 relative">
              <Image src={index.base64img} alt={"book"} fill />
            </div>
          </>
        );
      })}
    </div>
  );
}

export default index;

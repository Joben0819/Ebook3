'use client'
import React, { useState, useEffect } from "react";
import Login from "./Login/Login";
import { RootState } from "@/store"
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux"

export default function Modal(){
    const [data, setdata] = useState(1)
    const {Modal} = useSelector((state: RootState) => state.gameData)

    console.log(Modal)
    useEffect(() => {
        if(Modal === 1){
            setdata(1)
        }
        else if(Modal === 2){
            setdata(2)
        }
    }, [data])

    return(
        <>
        {
            Modal === 1 ? 
            <Login/>
            :
            Modal === 2 ?
            <Register/>
            : 
            ""
        }
        </>
    )
}
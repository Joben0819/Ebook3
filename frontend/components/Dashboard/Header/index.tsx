'use client'
import React,{useEffect} from "react";
import Booked from "@/assets/Books/book.png"
import Read from "@/assets/Books/openbook.png"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import {text} from '@/utils/helpers'
import { RootState } from "@/store"
import { setModal } from "@/reducers/gameData"
import { useDispatch, useSelector } from "react-redux"

function index(props:  any) {
  const {Modal} = useSelector((state: RootState) => state.gameData)
  const dispatch = useDispatch()
  useEffect(() => {
    window.onbeforeunload = () => {
      sessionStorage.setItem("data", "")
    };
    
    // Cleanup the event handler when the component unmounts
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const router = useRouter()
  const route = () => {
    router.push('/Library')
  }
  const route2 = () => {
    router.push('/')
  }
  return(
    <div className="flex w-full pl-10 gap-5 h-12 items-center">
    { sessionStorage.getItem('data') &&
      <div className="w-20 flex items-center gap-2 " style={{cursor: "pointer"}} onClick={() => {dispatch(setModal(1)), sessionStorage.removeItem('data')}}><div className="w-4 relative h-5"><Image src={Booked} alt="book" fill /></div>  Logout</div>
    }
      <div className="w-20 flex items-center gap-2 " style={{cursor: "pointer"}} onClick={route2}><div className="w-4 relative h-5"><Image src={Booked} alt="book" fill /></div>  Books</div>
      <div className="w-20 flex items-center gap-2 " style={{cursor: "pointer"}} onClick={route}><div className="w-4 relative h-5"><Image src={Read} alt="book" fill /></div>Library</div>
      <input type="text" placeholder="Search" id="search" />
    </div>
  ) ;
}

export default index;

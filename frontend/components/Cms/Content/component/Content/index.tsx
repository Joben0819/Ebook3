import React,{useState, useEffect} from "react";
import Image from "next/image";
import axios from "axios";


function index() {
  const [data, setdata] = useState([])
  useEffect(() => {
    axios.post('http://127.0.0.1:8000/read_file/',{
      num: 1,
      Book: "Dracula"
    })
    .then(
      res =>{
        // setdata(res.data)
        console.log(res)
      }
    )
  },[])
  return(
    <>
      <div className="w-full">
        <div className="flex justify-center">
          <input type="text" placeholder="Book" />
          <input type="text" placeholder="Chapter"/>
          <button>chapter</button>
        </div>

      </div> 
    </>
  )
}

export default index;

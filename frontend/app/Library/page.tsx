'use client'
import React,{useState, useEffect} from 'react'
import Image from 'next/image'
import Header from "@/components/Dashboard/Header/index"
export default function Library(){
    const sample = [
        {
          image: "https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg",
          title: "Dracula"
        },
        {
          image: "https://www.gutenberg.org/cache/epub/47960/pg47960.cover.medium.jpg",
          title: "Romeo and Juliet"
        },
        {
          image: "https://www.gutenberg.org/cache/epub/10830/pg10830.cover.medium.jpg",
          title: "Cinderella"
        },
        {
          image: "https://www.gutenberg.org/cache/epub/15/pg15.cover.medium.jpg",
          title: "Moby Dick"
        },
        {
          image: "https://www.gutenberg.org/cache/epub/29447/pg29447.cover.medium.jpg",
          title: "Perez the mouse"
        }
    ]

    const [part, separt] = useState<any | null>('')
    const filteredProducts = part?.length === 0 ? sample : sample.filter(product => product.title === part); 
    
    useEffect(() => {
      const inputElement = document.getElementById('search') as HTMLInputElement | null;
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          if(inputElement){
            separt(inputElement?.value)
          }
        }
      };
      if (inputElement) {
        inputElement.addEventListener('keydown', handleKeyPress);
      }
      return () => {
        if (inputElement) {
          inputElement.removeEventListener('keydown', handleKeyPress);
        }
      };
    }, []);

    return(
        <>
        <Header/>
        <div className='h-full flex items-center flex-col gap-12'>
            <div className='w-full' style={{textAlign: "center"}}>
                Library
            </div>
            <div className="w-full h-full flex gap-y-8 flex-wrap gap-20 justify-center">
                {
                filteredProducts.map((data: any, index: number) => {
                    return(
                    <div className="w-44 relative h-52 flex items-center flex-col group/item hover:bg-slate-100 ..." key={index}>
                        <div className="relative w-11/12 relative h-48">
                        <Image src={data.image} alt={data.title} fill/>
                        </div>
                        {data.title}
                        <div className="group/edit invisible absolute w-full flex-col h-full flex justify-center items-center group-hover/item:visible ..." style={{backgroundColor: "rgba(.5, .5, .5, .3)"}} >
                            <span className="group-hover/edit:text-gray-700 ..." style={{cursor: "pointer", color: "#fff"}}>Favorite</span>
                            <span className="group-hover/edit:text-gray-700 ..." style={{cursor: "pointer", color: "#fff"}}>Read</span>
                        </div>
                    </div>
                    )
                })
                }
            </div>
        </div>
        </>
    )
}
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useEffect, useRef, useState } from "react"
import { AsciiText, splitClass } from "./ascii";
import { useRouter, useSearchParams } from "next/navigation";
import { set } from "sanity";

interface Props {
  projects: any
}

export const CustomFoot = ({projects}: Props) =>{
  const negTop = "lg:top-[-5.8rem] top-[-4rem]"
  const searchParams = useSearchParams();
  const p = searchParams.get('p')? +searchParams.get('p')! : 0;
  const router = useRouter();
  const project = projects[p];

  const [descOpen, setDescOpen] = useState(false);
  const descRef = useRef<HTMLDivElement>(null);
  

  useEffect(()=>{
    window.scrollTo({left:0, top:0});
  })
  
  useEffect(()=>{
    if (!descOpen) return;
    // Close dropdown if click outside
    function handleClick(e: MouseEvent){
      if (descRef.current && !descRef.current.contains(e.target as Node)){
        setDescOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [descOpen])
  return (
    <>
      <section id="padding" className="snap-end snap-always w-full h-screen flex flex-col justify-end items-start py-5 px-5 pointer-events-none">
      </section>

      <section id="about" className="snap-start w-full h-fit flex flex-col justify-end items-end px-5 backdrop-blur-2xl lg:py-5 pb-15 pt-5 pointer-events-auto">
        <div className="justify-items-end">
          <AsciiText className={`${splitClass}`} text = "Hi, my name is Chris." />
          <AsciiText className={`${splitClass}`} text = "I am a senior designer for" />
          <AsciiText className={`${splitClass}`} text = "Pitchfork and GQ." />
          <br></br>
          <AsciiText className={`${splitClass}`} text = "@chrispanicker" />
          <AsciiText className={`${splitClass}`} text = "chris@panicker.design" />
        </div>
      </section>
    </>
  )
}
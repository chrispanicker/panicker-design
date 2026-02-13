'use client'

import { useEffect, useRef, useState } from "react"
import { AsciiText, splitClass } from "./ascii";

export const CustomFoot = () =>{

  const [descOpen, setDescOpen] = useState(false);
  const descRef = useRef<HTMLDivElement>(null);
  

  // useEffect(()=>{
  //   window.scrollTo({left:0, top:0});
  // })

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

  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) => {
      //up arrow scrolls to top, down arrow scrolls to bottom

      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }

      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "w" || e.key === "s") {
        if (window.scrollY < 100) {
          window.scrollTo({top: window.innerHeight, behavior: 'smooth'});
        } else {
          window.scrollTo({top: 0, behavior: 'smooth'});
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  
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
          <a className="self-end justify-items-end flex" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/chrispanicker/"><AsciiText className={`${splitClass}`} text = "@chrispanicker" /></a>
          <a className="self-end justify-items-end flex" target="_blank" rel="noopener noreferrer" href="mailto:chris@panicker.design"><AsciiText className={`${splitClass}`} text = "chris@panicker.design" /></a>
        </div>
      </section>
    </>
  )
}
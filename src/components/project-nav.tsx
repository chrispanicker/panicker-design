/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { AsciiText, splitClass } from "./ascii"
import { useEffect, useRef, useState } from "react"

interface Props {
  projects: any
}

export const ProjectNav = ({projects}:Props) =>{
  const searchParams = useSearchParams();
  const p = searchParams.get('p')? +searchParams.get('p')! : 0;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const searchParams = useSearchParams();
  // const p = searchParams.get('p')? +searchParams.get('p')! : 0;
  const router = useRouter();

  useEffect(()=>{
    if (!dropdownOpen) return;
    // Close dropdown if click outside
    function handleClick(e: MouseEvent){
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", (e) => {
      if(e.key === "Escape"){
        setDropdownOpen(false);
      }

    })
    // document.querySelector("html, body")?.classList.toggle("overflow-hidden")
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen])

  // useEffect(()=>{
  //   document.querySelector("html, body")?.classList.remove("overflow-hidden")
  // }, [!dropdownOpen])

  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) => {

      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }


      if(e.code === "Space"){
        setDropdownOpen(!dropdownOpen);
        if(!dropdownOpen){
          document.querySelector("html, body")?.classList.add("overflow-hidden")
        }else{
          document.querySelector("html, body")?.classList.remove("overflow-hidden")
        }
      }
    
      if(e.key ==="ArrowDown" && dropdownOpen){ 
        router.push(`./?p=${p+1 < projects.length? p+1: 0}`, {scroll:false})
      }else if (e.key==="ArrowUp" && dropdownOpen){ 
        router.push(`./?p=${p-1 >= 0? p-1: projects.length-1}`, {scroll:false})
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown); 
  })

  return(        
    <div className="fixed top-0 flex justify-between items-start w-screen z-10 p-5 w-full">

      {/* dropdown for projects */}
      <div ref={dropdownRef} className={`fixed top-5 right-5 flex flex-col justify-center items-end z-[1000] ${dropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <button onClick={()=>{
          setDropdownOpen(!dropdownOpen)
          if(!dropdownOpen){
            document.querySelector("html, body")?.classList.add("overflow-hidden")
          }else{
            document.querySelector("html, body")?.classList.remove("overflow-hidden")
          }
        }}
        className="hover:bg-blue-500 flex justify-center items-center bg-black lg:p-4 p-2 lg:h-18 cursor-pointer pointer-events-auto">
        <svg className={"w-full h-full"}  viewBox="0 0 64 64" width="1.3rem" height="1.3rem" fill="#ededed">
          <rect width="64" height="12.25"/><rect y="25.88" width="64" height="12.25"/><rect y="51.75" width="64" height="12.25"/>
        </svg>
        </button>
        <div className={`absolute top-full right-0 flex flex-col justify-start items-end w-max overflow-visible ${dropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {projects.map((project:any, i:number)=>{
            const delay = dropdownOpen? `${i * 60}ms` : '0ms';
            return (
              <div
                key={project._id}
                id={`${i}`}
                className={`transition-all ease-in-out 
                  ${dropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'}
                `}
                style={{ transitionDelay: delay }}
                onClick={()=>{
                  setDropdownOpen(false);
                  router.push(`./?p=${i}`, {scroll:false})
                  document.querySelector("html, body")?.classList.remove("overflow-hidden")
                }}
              >
                <AsciiText className={`${splitClass} cursor-pointer ${p === i ? 'bg-blue-500' : ''}`} text={project.name} />
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )

}
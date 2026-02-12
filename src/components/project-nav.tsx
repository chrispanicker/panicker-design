/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { AsciiText, splitClass } from "./ascii"
import { use, useEffect, useRef, useState } from "react"

interface Props {
  projects: any
}



export const ProjectNav = ({projects}:Props) =>{
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const p = searchParams.get('p')? +searchParams.get('p')! : 0;
  const router = useRouter();
  const project = projects[p];

  useEffect(()=>{
    if (!dropdownOpen) return;
    // Close dropdown if click outside
    function handleClick(e: MouseEvent){
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)){
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen])

  return(        
    <div className="fixed top-0 flex justify-between items-start w-screen z-10 p-5 w-full">

      {/* dropdown for projects */}
      <div ref={dropdownRef} className="fixed top-5 right-5 flex flex-col justify-center items-end z-[1000]">
        <button onClick={()=>{
          setDropdownOpen(!dropdownOpen)
        }}
        className="hover:bg-blue-500 flex justify-center items-center bg-black lg:p-4 p-2 lg:h-18 h-9 w-auto cursor-pointer pointer-events-auto">
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%" fill="#ededed">
            <rect width="64" height="12.25"/><rect y="25.88" width="64" height="12.25"/><rect y="51.75" width="64" height="12.25"/>
          </svg>
        </button>
        <div className={`absolute top-full right-0 flex flex-col justify-start items-end w-max overflow-visible pointer-events-auto`}>
          {projects.map((project:any, i:number)=>{
            const delay = dropdownOpen? `${i * 60}ms` : '0ms';
            return (
              <div
                key={project._id}
                className={`transition-all ease-in-out 
                  ${dropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'}
                `}
                style={{ transitionDelay: delay }}
                onClick={()=>{
                  setDropdownOpen(false);
                  router.push(`./?p=${i}`, {scroll:false})
                }}
              >
                <AsciiText className={`${splitClass} cursor-pointer`} text={project.name} />
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )

}
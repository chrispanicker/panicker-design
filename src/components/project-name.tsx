'use client'
import { useSearchParams, useRouter } from "next/navigation";
import { AsciiText, splitClass } from "./ascii"
import { useEffect, useRef, useState } from "react";



interface Project {
  [key: string]: unknown;
}

interface Props {
  projects: Project[];
}

export function ProjectName({ projects }: Props) {
  const searchParams = useSearchParams();
  const p = searchParams.get('p')? +searchParams.get('p')! : 0;
  const project = projects[p];
  const router = useRouter();

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

  return(
    <section id="proj-description" className="z-[10] fixed lg:bottom-0 lg:top-auto top-0 left-0 w-full h-max flex flex-col lg:justify-end justify-start items-start py-5 px-5 pointer-events-none">
      <div className={`lg:flex hidden snap-end w-1/2 overflow-hidden transition-all duration-300 ${descOpen ? "opacity-100 blur-none" : "opacity-0 blur-2xl"}`}>        
        <p className={`p-5 pointer-events-auto bg-black`}>{String(project.description ?? "")}</p>
      </div>

      <div className="pointer-events-auto cursor-pointer h-fit flex" onClick={() => setDescOpen(!descOpen)}>
        <button className={`pointer-events-auto bg-black px-2 hover:bg-blue-500`} onClick={(e)=>{
          e.stopPropagation();
          router.push(`./?p=${projects[p-1]!=null? p-1: projects.length-1}`, {scroll:false})  
        }}> &larr;</button>
        <div ref={descRef}>
          <AsciiText className = {`${splitClass} pointer-events-auto`} text={`${project.name}`}/>
        </div>
        <button className={`pointer-events-auto bg-black px-2 hover:bg-blue-500`} onClick={(e)=>{
          e.stopPropagation();
          router.push(`./?p=${projects[p+1]!=null? p+1: 0}`, {scroll:false})  
        }}> &rarr;</button>
      </div>

      <div className={`flex lg:hidden snap-end w-3/4 overflow-hidden transition-all duration-300 ${descOpen ? "opacity-100 blur-none" : "opacity-0 blur-2xl"}`}>        
        <p className={`p-5 pointer-events-auto bg-black`}>{String(project.description ?? "")}</p>
      </div>
    </section>
  )
}
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { useRouter, useSearchParams } from "next/navigation"
import { AsciiText, splitClass } from "./ascii"

interface Props {
  projects: any
}

export const ProjectNav = ({projects}:Props) =>{
  const searchParams = useSearchParams();
  const p = searchParams.get('p')? +searchParams.get('p')! : 0;
  const router = useRouter();
  const project = projects[p]
  console.log(project)

  return(        
    <div className="sticky top-0 flex justify-between items-start w-screen z-10 p-5 w-full h-screen">
      <div className="flex bg-black">
        <span onClick={()=>{
          router.push(`./?p=${projects[p-1]!=null? p-1: projects.length-1}`)
        }}
        className = {`hover:bg-blue-500 bg-black px-2 cursor-w-resize`}>&larr;</span>

        <AsciiText className = {`${splitClass}`} text={project.name}/>
        <span onClick={()=>{
          router.push(`./?p=${projects[p+1]!=null? p+1: 0}`)
        }}
          className = {`hover:bg-blue-500 bg-black px-2  cursor-e-resize`}>&rarr;</span>
      </div>
      <AsciiText className = {`${splitClass} px-4`} text={`${p+1}/${projects.length}`}/>
    </div>
  )

}
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useEffect } from "react"
import { AsciiText, splitClass } from "./ascii";
import { useRouter } from "next/navigation";

interface Props {
  projects: any
}


export const CustomFoot = ({projects}: Props) =>{
  const negTop = "lg:top-[-5.8rem] top-[-4rem]"
  const router = useRouter();

  useEffect(()=>{
    window.scrollTo({left:0, top:0});
  })
  
  return (
    <footer id="foot" className={`sticky lg:grid grid-cols-2 flex flex-col top-0 w-full h-screen  py-5 px-5 z-100 backdrop-blur-2xl`}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <AsciiText className={`${splitClass}`} text = "Hi, my name is Chris" />
          <AsciiText className={`${splitClass}`} text = "and I work for Pitchfork and GQ." />
          <br></br>
          <AsciiText className={`${splitClass}`} text = "I can design, animate," />
          <AsciiText className={`${splitClass}`} text = "code, editorially illustrate," />
          <AsciiText className={`${splitClass}`} text = "and more, for you. ʕ•ᴥ•ʔ" />
        </div>
        <div className="lg:block hidden">
          <AsciiText className={`${splitClass}`} text = "@chrispanicker" />
          <AsciiText className={`${splitClass}`} text = "chris@panicker.design" />
        </div>
      </div>
      
      <div className="lg:justify-items-end">
        <AsciiText className={`${splitClass}`} text ='Work:' />
          {projects.map((project:any, i:number)=>(
            <div key={project._id} onClick={()=>{
              router.push(`./?p=${i}`, {scroll:false})
            }}>
              <AsciiText className={`${splitClass}`} text ={project.name} />
            </div>
          ))}
          <br></br>
        <div className="lg:hidden block">
            <AsciiText className={`${splitClass}`} text = "@chrispanicker" />
            <AsciiText className={`${splitClass}`} text = "chris@panicker.design" /> 
        </div>
      </div>


      {/* menu bar */}
      {/* <span className={`${splitClass} absolute ${negTop} left-[50vw]`} onClick={()=>{
        window.scrollTo({top: window.scrollY<60? window.innerHeight: 0, left:0, behavior: "smooth"})
      }}>Info</span> */}

      <div className={`${negTop} left-5  absolute flex justify-between items-center`}>
          <AsciiText className={`${splitClass} justify-self-center`} text="Chris Panicker" />
      </div>
    </footer>
  )
}
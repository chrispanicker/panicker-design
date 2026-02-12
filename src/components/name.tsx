'use client'
import { useSearchParams } from "next/navigation";
import { AsciiText, splitClass } from "./ascii"

export function Name ({projects}: any){
  const searchParams = useSearchParams();
  const p = searchParams.get('p')? +searchParams.get('p')! : 0;
  return(
   <div className={`flex justify-between items-center z-[1000] fixed left-0 lg:top-0 lg:bottom-auto bottom-10`} onClick={()=>{
      if(window.scrollY > 100){
        window.scrollTo({top:0, behavior:'smooth'})
      } else{
        window.scrollTo({top:window.innerHeight, behavior:'smooth'})
      }

    }}>
        <AsciiText className={`${splitClass} justify-self-center m-5`} text="Chris Panicker" />
    </div>
  )
}
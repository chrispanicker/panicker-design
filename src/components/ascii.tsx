'use client'

import { useEffect } from "react"

export const Ascii = () =>{
const valArray = [".", ".", "=", "÷", "*"];

useEffect(()=>{
  const allText = document.querySelectorAll(".split");
  allText.forEach((txtEl, i)=>{
    const str = txtEl.innerHTML;
    const strArray = str.split("");
    txtEl.innerHTML = ""
    strArray.forEach((ltr)=>{
      if(ltr === " "){ 
          ltr = "&nbsp;" 
      }else{ 
        ltr = ltr
      }
      const newEl = document.createElement("p");
      newEl.innerHTML = ltr;
      newEl.addEventListener("mouseover", ()=>{
        let i =0; 
        const int = setInterval(()=>{
          newEl.innerHTML = valArray[i]
          if(i<valArray.length){ 
            i++
          }else{ 
            clearInterval(int);
            newEl.innerHTML = ltr;
            }
        },200)
      })
      allText[i].append(newEl)
    })
  })
})
  const splitClass = "split flex justify-center items-center"
  return (
    <div className="lg:text-5xl text-xl text-center lg:rotate-0 rotate-[-45deg] transition-[transform(rotate), font-size] duration-1000">
      <span className = {`${splitClass}`}>oh...this is awkward</span>
      <span className = {`${splitClass}`}>i'm working on my site right now</span>
      <span className = {`${splitClass}`}>@chrispanicker ~ chris@panicker.design</span>
    </div>
  )
}
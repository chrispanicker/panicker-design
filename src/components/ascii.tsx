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

  return (
    <div className="lg:text-4xl text-2xl text-center lg:rotate-0 rotate-270">
      <span className = "split flex justify-center items-center">Hey, I&apos;m working on my site right now.</span>
      <span className="split flex justify-center items-center">Hit me up: @chrispanicker chris@panicker.design</span>
    </div>
  )
}
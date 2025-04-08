'use client'

import { useEffect } from "react"

export const Ascii = () =>{
let valArray = [".", ".", "=", "÷", "*"];

useEffect(()=>{
  let allText = document.querySelectorAll(".split");
  allText.forEach((txtEl, i)=>{
    let str = txtEl.innerHTML;
    let strArray = str.split("");
    txtEl.innerHTML = ""
    strArray.forEach((ltr, j)=>{
      ltr === " "? ltr = "&nbsp;" : "";
      let newEl = document.createElement("p");
      newEl.innerHTML = ltr;
      newEl.addEventListener("mouseover", (event)=>{
        let i =0; 
        let int = setInterval(()=>{
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
    <div className="text-4xl text-center font-thin">
      <span className = "split flex justify-center items-center">Hey, I'm working on my site right now.</span>
      <span className="split flex justify-center items-center">Hit me up: @chrispanicker chris@panicker.design</span>
    </div>
  )
}
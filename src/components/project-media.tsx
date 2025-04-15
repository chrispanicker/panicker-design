/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import Image from "next/image"
import { useSearchParams } from "next/navigation";

interface Props {
  projects: any
}

export const ProjectMedia = ({projects}:Props) =>{
  const searchParams = useSearchParams();
  const p = searchParams.get('p')? +searchParams.get('p')! : 0;
  const project = projects[p];
  const mediaClass = "object-cover w-full h-full absolute top-0 z-0 blur-2xl transition-all duration-1000"
  const replaceClass = (e: any) =>{
    e.currentTarget.classList.replace("blur-2xl", "blur-none")
  }

  return(        
    project.preview.desktopUrl.includes(".mp4")?
    <div key={project._id}>
      <video width="1920" height="1080" autoPlay muted playsInline loop className={`lg:block hidden ${mediaClass}`}    
      onLoadedData={(e)=>{
        replaceClass(e);
    }}>
        <source src={project.preview.desktopUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video width="1920" height="1080" autoPlay muted loop playsInline className={`lg:hidden block ${mediaClass}`}    
      onLoadedData={(e)=>{
        replaceClass(e)
      }}>
        <source src={project.preview.mobileUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    :<div key={project._id}>
    <Image alt="" src={project.preview.desktopUrl} width="1920" height="1080" className={`lg:block hidden ${mediaClass}`}
    onLoad={(e)=>{
      replaceClass(e)
    }}>
    </Image>
    <Image alt="" src={project.preview.mobileUrl}  width="1920" height="1080" className={`lg:hidden block ${mediaClass}`}
    onLoad={(e)=>{
      replaceClass(e)
    }}>
    </Image>
  </div>
  )
}
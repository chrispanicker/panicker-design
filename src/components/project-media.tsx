/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image";
import { getFileUrl } from "@/sanity/lib/file";
import { useRouter, useSearchParams } from "next/navigation";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";


interface Project {
  _id: string;
  useGallery?: boolean;
  gallery?: unknown[];
  preview: {
    desktopUrl?: string;
    mobileUrl?: string;
  };
  [key: string]: unknown;
}

interface Props {
  projects: Project[];
  mediaScrollDivRef?: React.RefObject<HTMLDivElement>;
}

export interface ProjectMediaHandle {
  triggerFadeOut: () => void;
}



export const ProjectMedia = forwardRef<ProjectMediaHandle, Props>(({projects, mediaScrollDivRef}, ref) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const p = searchParams.get('p')? +searchParams.get('p')! : 0;
  const project = projects[p];
    const [isFading, setIsFading] = useState(true);
    ProjectMedia.displayName = "ProjectMedia";
  const [isBlurry, setIsBlurry] = useState(true);
  
  // Fallback ref if not provided from parent
  const fallbackRef = useRef<HTMLDivElement>(null);
  const scrollRef = mediaScrollDivRef || fallbackRef;

  useEffect(()=>{
    //LR arrow keys slide the media gallery  L / R
    const handleKeyDown = (e: KeyboardEvent) => {
      if (project.useGallery && scrollRef?.current) {
        if (e.key === "ArrowRight" || e.key === "d") {
          scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
        } else if (e.key === "ArrowLeft" || e.key === "a") {
          scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
        }
      }

      if (project.gallery && Array.isArray(project.gallery)) {
        if(scrollRef.current!.scrollLeft === 0 && e.key === "ArrowLeft"){
          router.push(`./?p=${projects[p-1]!=null? p-1: projects.length-1}`, {scroll:false});
        }
        if(scrollRef.current!.scrollLeft > scrollRef.current!.scrollWidth-scrollRef.current!.clientWidth-10 && e.key === "ArrowRight"){
          router.push(`./?p=${projects[p+1]!=null? p+1: 0}`, {scroll:false});
        }
      }

    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [project, scrollRef]);

    useEffect(()=>{
    //LR arrow keys slide the media gallery  L / R
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project.useGallery) {
        if (e.key === "ArrowRight") {
          router.push(`./?p=${projects[p+1]!=null? p+1: 0}`, {scroll:false});
        }
        if (e.key === "ArrowLeft") {
          router.push(`./?p=${projects[p-1]!=null? p-1: projects.length-1}`, {scroll:false});
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  useImperativeHandle(ref, () => ({
    triggerFadeOut: () => {
      setIsFading(true);
      setIsBlurry(true);
    }
  }));

  // When project changes, reset fade/blurry
  // Unblur when content is loaded
  const handleMediaLoaded = (e: React.SyntheticEvent<HTMLVideoElement | HTMLImageElement>) => {
    setIsFading(false);
    setIsBlurry(false);
    // Remove blur-2xl if present
    e.currentTarget.classList.replace("blur-2xl", "blur-none");
  };

  const mediaClass = `max-w-[90vw] lg:max-h-[90vh] max-h-[50vh] h-auto z-0 transition-all duration-300 ${isFading ? 'opacity-0' : 'opacity-100'} ${isBlurry ? 'blur-2xl' : 'blur-none'}`;
  
  // Loading animation component
  const LoadingScreen = () => {
    const [animatingChars, setAnimatingChars] = useState<{[key: number]: number}>({});
    
    useEffect(() => {
      const text = "LOADING";
      const chars = text.split("");
      
      // Start each character's animation in a staggered way
      const intervals: NodeJS.Timeout[] = [];
      const valArray = [".", ".", "=", "÷", "*"];
      
      chars.forEach((_, idx) => {
        // Stagger the start of each character's animation
        const timeout = setTimeout(() => {
          let i = 0;
          const interval = setInterval(() => {
            setAnimatingChars(prev => ({...prev, [idx]: i}));
            i = (i + 1) % valArray.length;
          }, 200);
          intervals.push(interval);
        }, idx * 100);
        
        return () => clearTimeout(timeout);
      });
      
      return () => {
        intervals.forEach(interval => clearInterval(interval));
      };
    }, []);
    
    const valArray = [".", ".", "=", "÷", "*"];
    const text = "LOADING";
    
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 z-50 transition-opacity duration-300" 
           style={{opacity: isBlurry ? 1 : 0, pointerEvents: isBlurry ? 'auto' : 'none'}}>
        <div className="text-center">
          <div className="text-4xl lg:text-6xl font-bold bg-black px-6 py-4 flex gap-1">
            {text.split("").map((char, idx) => (
              <span key={idx} className="w-12 lg:w-16 text-center">
                {animatingChars[idx] !== undefined ? valArray[animatingChars[idx]] : char}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  if (project.useGallery && Array.isArray(project.gallery) && project.gallery.length > 0) {
    // Render gallery (show all items stacked, or you can implement a slider if desired)
    return (
      <>
      <LoadingScreen />
      <div
      id="proj-media"
        key={project._id}
        ref={scrollRef}
        className="fixed top-0 pointer-events-auto w-full h-full lg:px-0 lg:py-5 overflow-x-auto overflow-y-hidden flex items-center gap-5 snap-x snap-mandatory bg-gray-200 px-5 "
        style={{ WebkitOverflowScrolling: 'touch' }}

      >
        {project.gallery.map((media: unknown, idx: number) => {
          // Type guard for expected media shape
          if (
            typeof media === 'object' && media !== null &&
            'desktopMedia' in media &&
            typeof (media as any).desktopMedia === 'object' && (media as any).desktopMedia !== null
          ) {
            const m = media as {
              desktopMedia: {
                video?: { asset?: { _ref?: string } };
                image?: { asset?: unknown };
              }
            };
            if (m.desktopMedia.video?.asset?._ref || (m.desktopMedia.video && m.desktopMedia.video.asset)) {
              // Video (Sanity file asset)
              const videoUrl = getFileUrl(m.desktopMedia.video);
              return (
                <video
                  key={idx}
                  width="1920"
                  height="1080"
                  autoPlay
                  muted
                  playsInline
                  loop
                  className={`${mediaClass} snap-center `}
                  onLoadedData={handleMediaLoaded}
                  style={{ objectFit: 'contain' }}
                >
                  {videoUrl && <source src={videoUrl} type="video/mp4" />}
                  Your browser does not support the video tag.
                </video>
              );
            } else if (m.desktopMedia.image?.asset) {
              // Image (Sanity asset reference)
              return (
                <Image
                  key={idx}
                  alt=""
                  src={urlFor(m.desktopMedia.image).url()}
                  width={1920}
                  height={1080}
                  className={`${mediaClass} object-contain snap-center `}
                  onLoad={handleMediaLoaded}
                />
              );
            }
          }
          return null;
        })}
      </div>
      </>
    );
  }

  // Fallback: single preview block
  return(
    project.preview?.desktopUrl?.includes(".mp4")?
      <>
      <LoadingScreen />
      <div key={project._id} className="fixed top-0 pointer-events-none">
        {/* VIDEOS for both mobile and desktop */}
        <video width="1920" height="1080" autoPlay muted playsInline loop className={`lg:block hidden w-screen h-screen ${isFading ? 'opacity-0' : 'opacity-100'} ${isBlurry ? 'blur-2xl' : 'blur-none'}`}
          onLoadedData={handleMediaLoaded}
        >
          <source src={project.preview.desktopUrl} type="video/mp4" /> Your browser does not support the video tag.
        </video>
        <video width="1920" height="1080" autoPlay muted loop playsInline className={`lg:hidden block w-screen h-screen ${isFading ? 'opacity-0' : 'opacity-100'} ${isBlurry ? 'blur-2xl' : 'blur-none'}`}
          onLoadedData={handleMediaLoaded}
        >
          <source src={project.preview.mobileUrl} type="video/mp4" /> Your browser does not support the video tag.
        </video>
      </div>
      </>
    : <>
    <LoadingScreen />
    <div key={project._id} className="pointer-events-none">
        {/* IMAGES for both mobile and desktop */}
        <Image alt="" src={project.preview?.desktopUrl || ""} width="1920" height="1080" className={`lg:block hidden w-screen h-screen object-contain ${isFading ? 'opacity-0' : 'opacity-100'} ${isBlurry ? 'blur-2xl' : 'blur-none'}`}
          onLoad={handleMediaLoaded}
        />
        <Image alt="" src={project.preview?.mobileUrl || ""} width="1920" height="1080" className={`lg:hidden block w-screen h-screen object-contain ${isFading ? 'opacity-0' : 'opacity-100'} ${isBlurry ? 'blur-2xl' : 'blur-none'}`}
          onLoad={handleMediaLoaded}
        />
      </div>
    </>
  );
});
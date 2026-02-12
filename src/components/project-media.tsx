/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image";
import { getFileUrl } from "@/sanity/lib/file";
import { useSearchParams } from "next/navigation";
import { forwardRef, useImperativeHandle, useState } from "react";


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
  const searchParams = useSearchParams();
  const p = searchParams.get('p')? +searchParams.get('p')! : 0;
  const project = projects[p];
    const [isFading, setIsFading] = useState(false);
    ProjectMedia.displayName = "ProjectMedia";
  const [isBlurry, setIsBlurry] = useState(false);

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

  const mediaClass = `max-w-[90vw] lg:max-h-[90vh] max-h-[50vh] h-auto z-0 transition-all duration-300 odd:self-end even:self-start ${isFading ? 'opacity-0' : 'opacity-100'} ${isBlurry ? 'blur-2xl' : 'blur-none'}`;
  if (project.useGallery && Array.isArray(project.gallery) && project.gallery.length > 0) {
    // Render gallery (show all items stacked, or you can implement a slider if desired)
    return (
      <div
        key={project._id}
        ref={mediaScrollDivRef}
        className="fixed top-0 pointer-events-auto w-full h-full lg:px-0 lg:py-5 overflow-x-auto overflow-y-hidden lg:flex grid grid-flow-col grid-rows-2 items-center gap-5 snap-x snap-mandatory bg-gray-200 px-5 "
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
    );
  }

  // Fallback: single preview block
  return(
    project.preview.desktopUrl?.includes(".mp4")?
      <div key={project._id} className="fixed top-0 pointer-events-none">
        {/* VIDEOS for both mobile and desktop */}
        <video width="1920" height="1080" autoPlay muted playsInline loop className={`lg:block hidden w-screen h-screen`}
          onLoadedData={handleMediaLoaded}
        >
          <source src={project.preview.desktopUrl} type="video/mp4" /> Your browser does not support the video tag.
        </video>
        <video width="1920" height="1080" autoPlay muted loop playsInline className={`lg:hidden block w-screen h-screen`}
          onLoadedData={handleMediaLoaded}
        >
          <source src={project.preview.mobileUrl} type="video/mp4" /> Your browser does not support the video tag.
        </video>
      </div>
    : <div key={project._id} className="pointer-events-none">
        {/* IMAGES for both mobile and desktop */}
        <Image alt="" src={project.preview.desktopUrl || ""} width="1920" height="1080" className={`lg:block hidden w-screen h-screen object-contain`}
          onLoad={handleMediaLoaded}
        />
        <Image alt="" src={project.preview.mobileUrl || ""} width="1920" height="1080" className={`lg:hidden block w-screen h-screen object-contain`}
          onLoad={handleMediaLoaded}
        />
      </div>
  );
});
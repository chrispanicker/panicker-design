import { CustomFoot } from "@/components/customfooter";
import { ProjectMedia } from "@/components/project-media";
import { ProjectNav } from "@/components/project-nav";
import { getProjects } from "@/sanity/sanity-utils";
import { Suspense } from "react";



export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <section id="main" className={`sticky top-0 snap-center w-screen h-full flex flex-col justify-start items-start`}>
        <Suspense>
          <ProjectNav projects={projects} />
          <ProjectMedia projects ={projects} />
        </Suspense>
      </section>
      <CustomFoot projects={projects} />
    </>
  );
}

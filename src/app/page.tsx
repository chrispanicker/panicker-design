import { CustomFoot } from "@/components/customfooter";
import { Name } from "@/components/name";
import { ProjectMedia } from "@/components/project-media";
import { ProjectName } from "@/components/project-name";
import { ProjectNav } from "@/components/project-nav";
import { getProjects } from "@/sanity/sanity-utils";
import { Suspense } from "react";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
    <Name projects={projects} />

      <div className="pointer-events-none">
        <ProjectNav projects={projects} />
        <ProjectName projects={projects} />
      </div>

      <div className="fixed top-0">
        <ProjectMedia projects={projects} />
      </div>


      <div className="block w-full h-screen pointer-events-auto snap-end snap-always overscroll-none">
        <CustomFoot projects={projects} />
      </div>

  </>
  );
}

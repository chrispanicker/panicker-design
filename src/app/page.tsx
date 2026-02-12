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
    <Name />
    <div className="pointer-events-none">
      <Suspense>
        <ProjectNav projects={projects} />
        <ProjectName projects={projects} />
      </Suspense>
    </div>
    <div className="fixed top-0">
      <Suspense>
        <ProjectMedia projects={projects} />
      </Suspense>
    </div>
    <div className="block w-full h-screen pointer-events-auto snap-end snap-always overscroll-none">
      <CustomFoot/>
    </div>
  </>
  );
}

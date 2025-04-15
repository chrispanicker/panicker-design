import { getProjectBySlug, getProjects } from "@/sanity/sanity-utils";

type Props = {
  params: {slug:string};
}

export default async function Project({params}:Props){
  const slug = params.slug;
  const project = await getProjectBySlug(slug);

  return <div>
    {project.name}
  </div>
}
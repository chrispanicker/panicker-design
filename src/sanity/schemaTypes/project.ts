import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

const project = {
    name: 'project',
    title: "Project",
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
      orderRankField({ 
        type: 'string',
        newItemPosition: "before" }),
        {
          name: "name",
          title: "Name",
          type: "string",
          description: 'Project Name to appear as Hed',
        },
        {
          title: 'Homepage Preview',
          name: "preview",
          type: 'mediaBlock',
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          description: 'Short description to appear on the homepage',
        },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          options: { source: 'name'},
          description: 'Generate a URL Slug for this Project',
        },
        {
          name: "useGallery",
          title: "Use Gallery for Homepage?",
          type: "boolean",
          description: "If checked, the homepage will show the gallery array instead of the single preview media block.",
          initialValue: false,
        },
        {
          name: "gallery",
          title: "Gallery",
          type: "array",
          of: [
            {
              type: 'mediaBlock',
            }
          ],
          description: 'Alternative for projects',
        }
        // {
        //   name: 'layout',
        //   title: 'Layout',
        //   type: "array",
        //   of: [
        //     {
        //       type: 'block'
        //     },
        //     {
        //       type: 'mediaBlock',
        //     }
        //   ]
        // },
    ]
}

export default project;
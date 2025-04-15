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
          name: "slug",
          title: "Slug",
          type: "slug",
          options: { source: 'name'},
          description: 'Generate a URL Slug for this Project',
        },
        {
          name: 'layout',
          title: 'Layout',
          type: "array",
          of: [
            {
              type: 'block'
            },
            {
              type: 'mediaBlock',
            }
          ]
        },
    ]
}

export default project;
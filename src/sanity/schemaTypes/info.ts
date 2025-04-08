import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

const info = {
    name: 'info',
    title: "info",
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ 
            type: "info", 
            newItemPosition: "before" }
        ),
        {
          name: "name",
          title: "project",
          type: "string"
        }
    ]
}

export default info;
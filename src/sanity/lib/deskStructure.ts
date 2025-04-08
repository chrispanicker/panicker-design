import { StructureBuilder } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

const getOrderableDocumentList = (type: string, title: string, S: StructureBuilder, context: any) => {
  return orderableDocumentListDeskItem({ type, title, S, context })
}

const getDocumentTypeListItem = (type: string, title: string, S: StructureBuilder) => {
  return S.documentTypeListItem(type).title(title)
}

export const structure = (S: StructureBuilder, context: any) => {
  return S.list()
    .title('Content')
    .items([
      getOrderableDocumentList('info', 'Info', S, context),
    ])
}


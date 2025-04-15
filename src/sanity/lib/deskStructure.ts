/* eslint-disable @typescript-eslint/no-explicit-any */

import { StructureBuilder } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

const getOrderableDocumentList = (type: string, title: string, S: StructureBuilder, context: any) => {
  return orderableDocumentListDeskItem({ type, title, S, context })
} 

export const structure = (S: StructureBuilder, context: any) => {
  return S.list()
    .title('Content')
    .items([
      getOrderableDocumentList('project', 'Projects', S, context),
    ])
}


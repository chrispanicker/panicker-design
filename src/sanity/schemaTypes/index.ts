import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import fileOrImage from './file-or-image'
import mediaBlock from './media-block'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    fileOrImage,
    mediaBlock,
    project
  ],
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Rule } from 'sanity';

const fileOrImage = {
  name: 'fileOrImage',
  title: 'File or Image',
  type: 'object',
  fields: [
    {
      name: 'assetType',
      title: 'Asset Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' }
        ],
        layout: 'radio'
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }: { parent: { assetType?: string } }) => parent?.assetType !== 'image'
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      hidden: ({ parent }: { parent: { assetType?: string } }) => parent?.assetType !== 'video'
    }
  ],
  preview: {
    select: {
      title: 'assetType',
      image: 'image',
      video: 'video'
    },
    prepare(value: Record<string, any>) {
      const { title, image, video } = value;
    
      return {
        title: title === 'image' ? 'Image block' : 'Video block',
        media: image ?? video
      };
    }
  }
};

export default fileOrImage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Md123, MdPermMedia } from 'react-icons/md';
import type { Rule } from 'sanity';

const mediaBlock = {
  name: 'mediaBlock',
  title: 'Media Block',
  type: 'object',
  icon: MdPermMedia,
  fields: [
    {
      name: 'desktopMedia',
      icon: Md123,
      title: 'Desktop Image/Video',
      type: 'fileOrImage',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'mobileMedia',
      title: 'Mobile Image/Video',
      type: 'fileOrImage',
      hidden: ({ parent }: { parent: any }) => parent?.noMobile === true,
      validation: (Rule: Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { noMobile?: boolean };
          if (!value && !parent?.noMobile) {
            return 'Mobile media is required unless "No Mobile" is checked';
          }
          return true;
        }),
    },
    {
      name: 'noMobile',
      title: 'No Mobile Version',
      type: 'boolean',
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string'
    }
  ]
};

export default mediaBlock;
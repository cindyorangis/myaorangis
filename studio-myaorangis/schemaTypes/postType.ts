import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}, {type: 'gameEmbed'}],
    }),
    defineField({
      name: 'questions',
      title: 'Comprehension Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'question',
          fields: [
            defineField({name: 'question', type: 'string', title: 'Question'}),
            defineField({name: 'a', type: 'string', title: 'Option A'}),
            defineField({name: 'b', type: 'string', title: 'Option B'}),
            defineField({name: 'c', type: 'string', title: 'Option C'}),
            defineField({name: 'd', type: 'string', title: 'Option D'}),
            defineField({
              name: 'correct',
              type: 'string',
              title: 'Correct Answer',
              options: {
                list: ['a', 'b', 'c', 'd'],
                layout: 'radio',
              },
            }),
          ],
          preview: {
            select: {title: 'question'},
          },
        },
      ],
    }),
  ],
})

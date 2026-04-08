// sanity/schemaTypes/gameEmbed.ts
import { defineType } from "sanity";

export const gameEmbed = defineType({
  name: "gameEmbed",
  title: "Game Embed",
  type: "object",
  fields: [
    {
      name: "url",
      title: "Game URL",
      type: "url",
    },
    {
      name: "title",
      title: "Game Title",
      type: "string",
    },
    {
      name: "height",
      title: "Height (px)",
      type: "number",
      initialValue: 700,
    },
  ],
  preview: {
    select: { title: "title", subtitle: "url" },
  },
});
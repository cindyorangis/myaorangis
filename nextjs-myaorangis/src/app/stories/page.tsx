import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Link from "next/link";

const STORIES_QUERY = `*[_type == "post" && category == "story"] | order(publishedAt desc) {
  _id, title, slug, publishedAt
}`;

const options = { next: { revalidate: 30 } };

export default async function StoriesPage() {
  const stories = await client.fetch<SanityDocument[]>(
    STORIES_QUERY,
    {},
    options,
  );

  return (
    <main
      className="min-h-screen px-6 py-16"
      style={{ background: "var(--kids-bg)" }}
    >
      <div className="mx-auto max-w-3xl">
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
          style={{
            background: "var(--kids-pink-bg)",
            color: "var(--kids-pink-text)",
          }}
        >
          📖 All Stories
        </span>

        <h1
          className="text-4xl font-extrabold mb-10"
          style={{ color: "var(--kids-text)" }}
        >
          Stories by Mya
        </h1>

        <ul className="space-y-4">
          {stories.map((story) => (
            <li key={story._id}>
              <Link
                href={`/${story.slug.current}`}
                className="block p-6 rounded-2xl border-2 font-bold transition-opacity hover:opacity-80"
                style={{
                  background: "var(--kids-surface)",
                  borderColor: "var(--kids-border)",
                  color: "var(--kids-text)",
                }}
              >
                {story.title}
                <span
                  className="block text-sm font-normal mt-1"
                  style={{ color: "var(--kids-hint)" }}
                >
                  {new Date(story.publishedAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

// Extend the query to pull the fields the card component needs
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  description,
  "category": categories[0]->{ title },
  "author": author->{
    name,
    role,
    "imageUrl": image.asset->url
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            Mya&apos;s Short Stories
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-300">
            Discover inspiring tales and imaginative worlds.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 dark:border-gray-700">
          {posts.map((post) => {
            const date = new Date(post.publishedAt);
            const formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const isoDate = date.toISOString().split("T")[0];

            return (
              <article
                key={post._id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={isoDate}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    {formattedDate}
                  </time>
                  {post.category?.title && (
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 dark:bg-gray-800/60 dark:text-gray-300">
                      {post.category.title}
                    </span>
                  )}
                </div>
                <div className="group relative grow">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                    <Link href={`/${post.slug.current}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  {post.description && (
                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-400">
                      {post.description}
                    </p>
                  )}
                </div>
                {post.author && (
                  <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                    {post.author.imageUrl && (
                      <img
                        alt={post.author.name ?? ""}
                        src={post.author.imageUrl}
                        className="size-10 rounded-full bg-gray-50 object-cover dark:bg-gray-800"
                      />
                    )}
                    <div className="text-sm/6">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        <Link href={`/${post.slug.current}`}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </Link>
                      </p>
                      {post.author.role && (
                        <p className="text-gray-600 dark:text-gray-400">
                          {post.author.role}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

import { GameEmbed } from "@/components/GameEmbed";
import { QuizSection } from "@/components/QuizSection";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{..., questions}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options,
  );
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1310).height(873).url()
    : null;

  return (
    <div className="bg-white px-6 py-32 lg:px-8 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700 dark:text-gray-300">
        <Link
          href="/"
          className="text-sm text-indigo-600 hover:underline dark:text-indigo-400 block mb-8"
        >
          ← Back to posts
        </Link>

        <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
          Blog
        </p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
          {post.title}
        </h1>

        {postImageUrl && (
          <figure className="mt-10">
            <img
              src={postImageUrl}
              alt={post.title}
              className="aspect-video rounded-xl bg-gray-50 object-cover dark:bg-gray-800 w-full"
              width="1310"
              height="873"
            />
          </figure>
        )}

        <div className="mt-6 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-6">
          Published: {new Date(post.publishedAt).toLocaleDateString()}
        </div>

        <div className="mt-10 max-w-2xl text-gray-600 dark:text-gray-400">
          {Array.isArray(post.body) && (
            <>
              <PortableText
                value={post.body}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="mb-5">{children}</p>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">
                        {children}
                      </h2>
                    ),
                    blockquote: ({ children }) => (
                      <figure className="mt-10 border-l border-indigo-600 pl-9 dark:border-indigo-400">
                        <blockquote className="font-semibold text-gray-900 dark:text-white">
                          <p>{children}</p>
                        </blockquote>
                      </figure>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul
                        role="list"
                        className="mt-8 max-w-xl space-y-8 text-gray-600 dark:text-gray-400"
                      >
                        {children}
                      </ul>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => (
                      <li className="flex gap-x-3">
                        <CheckCircleIcon
                          aria-hidden="true"
                          className="mt-1 size-5 flex-none text-indigo-600 dark:text-indigo-400"
                        />
                        <span>{children}</span>
                      </li>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900 dark:text-white">
                        {children}
                      </strong>
                    ),
                  },
                  types: {
                    gameEmbed: ({ value }) => <GameEmbed value={value} />,
                  },
                }}
              />
              <QuizSection questions={post.questions || []} />
            </>
          )}
        </div>

        {postImageUrl && (
          <figure className="mt-16">
            <img
              alt=""
              src={postImageUrl}
              className="aspect-video rounded-xl bg-gray-50 object-cover dark:bg-gray-800 w-full"
            />
            <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500 dark:text-gray-400">
              <InformationCircleIcon
                aria-hidden="true"
                className="mt-0.5 size-5 flex-none text-gray-300 dark:text-gray-600"
              />
              {post.title}
            </figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}

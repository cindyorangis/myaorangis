import { notFound } from "next/navigation";
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
  const resolvedParams = await params;

  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    resolvedParams,
    options,
  );

  if (!post) {
    return notFound();
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1310).height(873).url()
    : null;

  return (
    <div
      className="min-h-screen px-6 py-12 lg:px-8"
      style={{ background: "var(--kids-bg)" }}
    >
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-block text-sm font-bold mb-8 px-4 py-2 rounded-full transition-opacity hover:opacity-80"
          style={{
            background: "var(--kids-accent-bg)",
            color: "var(--kids-accent-text)",
          }}
        >
          ← Back to stories
        </Link>

        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
          style={{
            background: "var(--kids-pink-bg)",
            color: "var(--kids-pink-text)",
          }}
        >
          ✨ Story
        </span>

        <h1
          className="mt-2 text-4xl font-extrabold tracking-tight text-pretty sm:text-5xl leading-tight"
          style={{ color: "var(--kids-text)" }}
        >
          {post.title}
        </h1>

        {postImageUrl && (
          <figure className="mt-10">
            <img
              src={postImageUrl}
              alt={post.title}
              className="aspect-video rounded-3xl object-cover w-full"
              style={{ border: "3px solid var(--kids-border)" }}
              width="1310"
              height="873"
            />
          </figure>
        )}

        <div
          className="mt-6 max-w-2xl text-sm font-semibold pb-6 mb-2"
          style={{
            color: "var(--kids-hint)",
            borderBottom: "2px solid var(--kids-border)",
          }}
        >
          Published: {new Date(post.publishedAt).toLocaleDateString()}
        </div>

        <div
          className="mt-10 max-w-2xl text-lg leading-8"
          style={{ color: "var(--kids-muted)" }}
        >
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
                      <h2
                        className="mt-12 text-2xl font-extrabold tracking-tight"
                        style={{ color: "var(--kids-text)" }}
                      >
                        {children}
                      </h2>
                    ),
                    blockquote: ({ children }) => (
                      <figure
                        className="mt-10 pl-6 rounded-r-2xl py-4"
                        style={{
                          borderLeft: "4px solid var(--kids-accent)",
                          background: "var(--kids-accent-bg)",
                        }}
                      >
                        <blockquote
                          className="font-bold text-lg"
                          style={{ color: "var(--kids-text)" }}
                        >
                          <p>{children}</p>
                        </blockquote>
                      </figure>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul role="list" className="mt-8 max-w-xl space-y-4">
                        {children}
                      </ul>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => (
                      <li className="flex gap-x-3">
                        <CheckCircleIcon
                          aria-hidden="true"
                          className="mt-1 size-5 flex-none"
                          style={{ color: "var(--kids-accent)" }}
                        />
                        <span>{children}</span>
                      </li>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong
                        className="font-extrabold"
                        style={{ color: "var(--kids-text)" }}
                      >
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
              className="aspect-video rounded-3xl object-cover w-full"
              style={{ border: "3px solid var(--kids-border)" }}
            />
            <figcaption
              className="mt-4 flex gap-x-2 text-sm font-semibold"
              style={{ color: "var(--kids-hint)" }}
            >
              <InformationCircleIcon
                aria-hidden="true"
                className="mt-0.5 size-5 flex-none"
                style={{ color: "var(--kids-accent)" }}
              />
              {post.title}
            </figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}

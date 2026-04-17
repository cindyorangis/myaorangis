import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Link from "next/link";

const GAMES_QUERY = `*[_type == "post" && category == "game"] | order(publishedAt desc) {
  _id, title, slug, publishedAt
}`;

const options = { next: { revalidate: 30 } };

export default async function GamesPage() {
  const games = await client.fetch<SanityDocument[]>(GAMES_QUERY, {}, options);

  return (
    <main
      className="min-h-screen px-6 py-16"
      style={{ background: "var(--kids-bg)" }}
    >
      <div className="mx-auto max-w-3xl">
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
          style={{
            background: "var(--kids-accent-bg)",
            color: "var(--kids-accent-text)",
          }}
        >
          🎮 All Games
        </span>

        <h1
          className="text-4xl font-extrabold mb-10"
          style={{ color: "var(--kids-text)" }}
        >
          Games
        </h1>

        <ul className="space-y-4">
          {games.map((game) => (
            <li key={game._id}>
              <Link
                href={`/${game.slug.current}`}
                className="block p-6 rounded-2xl border-2 font-bold transition-opacity hover:opacity-80"
                style={{
                  background: "var(--kids-surface)",
                  borderColor: "var(--kids-border)",
                  color: "var(--kids-text)",
                }}
              >
                {game.title}
                <span
                  className="block text-sm font-normal mt-1"
                  style={{ color: "var(--kids-hint)" }}
                >
                  {new Date(game.publishedAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {games.length === 0 && (
          <p className="text-lg" style={{ color: "var(--kids-muted)" }}>
            No games yet — check back soon!
          </p>
        )}
      </div>
    </main>
  );
}

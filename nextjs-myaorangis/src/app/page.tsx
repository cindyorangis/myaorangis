import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center"
      style={{ background: "var(--kids-bg)" }}
    >
      <span
        className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-6"
        style={{
          background: "var(--kids-pink-bg)",
          color: "var(--kids-pink-text)",
        }}
      >
        ✨ Welcome!
      </span>

      <h1
        className="text-5xl font-extrabold tracking-tight mb-4"
        style={{ color: "var(--kids-text)" }}
      >
        Mya's Short Stories
      </h1>

      <p
        className="text-lg max-w-md mb-12"
        style={{ color: "var(--kids-muted)" }}
      >
        Read stories, answer questions, and play math games — all in one place!
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/stories"
          className="text-sm font-bold px-6 py-3 rounded-full transition-opacity hover:opacity-80"
          style={{ background: "var(--kids-accent)", color: "#fff" }}
        >
          📖 Read Stories
        </Link>
        <Link
          href="/games"
          className="text-sm font-bold px-6 py-3 rounded-full transition-opacity hover:opacity-80"
          style={{
            background: "var(--kids-accent-bg)",
            color: "var(--kids-accent-text)",
          }}
        >
          🎮 Play Games
        </Link>
      </div>
    </main>
  );
}

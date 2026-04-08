// components/GameEmbed.tsx
export function GameEmbed({
  value,
}: {
  value: { url: string; title?: string; height?: number };
}) {
  if (!value?.url) return null;

  return (
    <div className="my-10 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <iframe
        src={value.url}
        title={value.title ?? "Math Game"}
        width="100%"
        height={value.height ?? 700}
        className="block"
        allow="autoplay"
      />
    </div>
  );
}

import type { ReleaseSummary } from "../../application/catalog/list-releases";
import styles from "./release-card.module.css";

const typeLabel = { single: "Single", ep: "EP", album: "Álbum" } as const;

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function ReleaseCard({ release }: { release: ReleaseSummary }) {
  return (
    <article className={styles.card}>
      <span className={styles.type}>{typeLabel[release.type]}</span>
      <h2 className={styles.title}>{release.title}</h2>
      <p className={styles.artists}>{release.artistNames.join(", ")}</p>
      <time dateTime={release.releasedAt}>
        {dateFormat.format(new Date(release.releasedAt))}
      </time>
    </article>
  );
}

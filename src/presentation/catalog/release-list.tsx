import type { ReleaseSummary } from "../../application/catalog/list-releases";
import { ReleaseCard } from "./release-card";
import styles from "./release-list.module.css";

export function ReleaseList({ releases }: { releases: ReleaseSummary[] }) {
  if (releases.length === 0) return <p>Nenhum lançamento ainda.</p>;

  return (
    <div className={styles.list}>
      {releases.map((release) => (
        <ReleaseCard key={release.id} release={release} />
      ))}
    </div>
  );
}

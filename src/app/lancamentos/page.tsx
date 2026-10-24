import { listReleases } from "../../infrastructure/container";
import { ReleaseList } from "../../presentation/catalog/release-list";

export const metadata = { title: "Lançamentos | Orion Music" };

export default async function ReleasesPage() {
  const releases = await listReleases.execute();

  return (
    <main>
      <h1>Lançamentos</h1>
      <ReleaseList releases={releases} />
    </main>
  );
}

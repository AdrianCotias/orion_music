import { describe, expect, it } from "vitest";
import { ListReleases } from "../src/application/catalog/list-releases";
import { InMemoryArtistRepository } from "../src/infrastructure/catalog/in-memory-artist-repository";
import { InMemoryReleaseRepository } from "../src/infrastructure/catalog/in-memory-release-repository";

describe("ListReleases", () => {
  const useCase = new ListReleases(
    new InMemoryReleaseRepository(),
    new InMemoryArtistRepository(),
  );

  it("lista os lançamentos do mais recente para o mais antigo", async () => {
    const result = await useCase.execute();
    const dates = result.map((r) => r.releasedAt);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("resolve os nomes dos artistas de cada lançamento", async () => {
    const result = await useCase.execute();
    for (const release of result) {
      expect(release.artistNames.length).toBeGreaterThan(0);
      expect(release.artistNames).not.toContain("Artista desconhecido");
    }
  });
});

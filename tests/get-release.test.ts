import { describe, expect, it } from "vitest";
import { GetRelease } from "../src/application/catalog/get-release";
import { InMemoryArtistRepository } from "../src/infrastructure/catalog/in-memory-artist-repository";
import { InMemoryReleaseRepository } from "../src/infrastructure/catalog/in-memory-release-repository";

describe("GetRelease", () => {
  const releases = new InMemoryReleaseRepository();
  const artists = new InMemoryArtistRepository();
  const useCase = new GetRelease(releases, artists);

  it("devolve null para id inexistente", async () => {
    expect(await useCase.execute("nao-existe")).toBeNull();
  });

  it("devolve o lançamento com artistas resolvidos e data em ISO", async () => {
    const [release] = await releases.findAll();
    const result = await useCase.execute(release.id);
    const expectedArtists = await artists.findByIds(release.artistIds);

    expect(result).toEqual({
      id: release.id,
      title: release.title,
      type: release.type,
      artists: expectedArtists.map((a) => ({ id: a.id, name: a.name, genre: a.genre })),
      releasedAt: release.releasedAt.toISOString(),
    });
    expect(result!.artists).toHaveLength(release.artistIds.length);
  });
});

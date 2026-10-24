import type { ArtistRepository } from "../../domain/catalog/artist-repository";
import type { ReleaseRepository } from "../../domain/catalog/release-repository";
import type { ReleaseType } from "../../domain/catalog/release";

export type ReleaseSummary = {
  id: string;
  title: string;
  type: ReleaseType;
  artistNames: string[];
  releasedAt: string;
};

export class ListReleases {
  constructor(
    private readonly releases: ReleaseRepository,
    private readonly artists: ArtistRepository,
  ) {}

  async execute(): Promise<ReleaseSummary[]> {
    const releases = await this.releases.findAll();
    const artistIds = [...new Set(releases.flatMap((r) => r.artistIds))];
    const artists = await this.artists.findByIds(artistIds);
    const nameById = new Map(artists.map((a) => [a.id, a.name]));

    return releases
      .toSorted((a, b) => b.releasedAt.getTime() - a.releasedAt.getTime())
      .map((r) => ({
        id: r.id,
        title: r.title,
        type: r.type,
        artistNames: r.artistIds.map((id) => nameById.get(id) ?? "Artista desconhecido"),
        releasedAt: r.releasedAt.toISOString(),
      }));
  }
}

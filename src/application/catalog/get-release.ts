import type { ArtistRepository } from "../../domain/catalog/artist-repository";
import type { ReleaseType } from "../../domain/catalog/release";
import type { ReleaseRepository } from "../../domain/catalog/release-repository";

export type ArtistSummary = {
  id: string;
  name: string;
  genre: string;
};

export type ReleaseDetail = {
  id: string;
  title: string;
  type: ReleaseType;
  artists: ArtistSummary[];
  releasedAt: string;
};

export class GetRelease {
  constructor(
    private readonly releases: ReleaseRepository,
    private readonly artists: ArtistRepository,
  ) {}

  async execute(id: string): Promise<ReleaseDetail | null> {
    const release = await this.releases.findById(id);
    if (!release) return null;

    return {
      id: release.id,
      title: release.title,
      type: release.type,
      artists: (await this.artists.findByIds(release.artistIds)).map((a) => ({
        id: a.id,
        name: a.name,
        genre: a.genre,
      })),
      releasedAt: release.releasedAt.toISOString(),
    };
  }
}

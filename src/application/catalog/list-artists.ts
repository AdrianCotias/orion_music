import type { Artist } from "../../domain/catalog/artist";
import type { ArtistRepository } from "../../domain/catalog/artist-repository";

export class ListArtists {
  constructor(private readonly artists: ArtistRepository) {}

  execute(): Promise<Artist[]> {
    return this.artists.findAll();
  }
}

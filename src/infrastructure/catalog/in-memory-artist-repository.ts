import { createArtist, type Artist } from "../../domain/catalog/artist";
import type { ArtistRepository } from "../../domain/catalog/artist-repository";

const artists: Artist[] = [
  createArtist({ id: "a1", name: "Artista Exemplo 1", genre: "Indie" }),
  createArtist({ id: "a2", name: "Artista Exemplo 2", genre: "Eletrônica" }),
];

export class InMemoryArtistRepository implements ArtistRepository {
  async findAll() {
    return [...artists];
  }

  async findByIds(ids: readonly string[]) {
    return artists.filter((a) => ids.includes(a.id));
  }
}

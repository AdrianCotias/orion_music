import type { Artist } from "./artist";

export interface ArtistRepository {
  findAll(): Promise<Artist[]>;
  findByIds(ids: readonly string[]): Promise<Artist[]>;
}

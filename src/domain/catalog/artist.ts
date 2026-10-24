import { DomainError } from "../shared/domain-error";

export type Artist = {
  readonly id: string;
  readonly name: string;
  readonly genre: string;
};

export function createArtist(input: Artist): Artist {
  const name = input.name.trim();
  if (!input.id) throw new DomainError("Artista precisa de id.");
  if (!name) throw new DomainError("Artista precisa de nome.");
  return { id: input.id, name, genre: input.genre.trim() };
}

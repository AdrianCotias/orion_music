import { describe, expect, it } from "vitest";
import { ListArtists } from "../src/application/catalog/list-artists";
import { InMemoryArtistRepository } from "../src/infrastructure/catalog/in-memory-artist-repository";

describe("ListArtists", () => {
  it("devolve todos os artistas do repositório com id, nome e gênero", async () => {
    const repository = new InMemoryArtistRepository();
    const result = await new ListArtists(repository).execute();

    expect(result).toEqual(await repository.findAll());
    expect(result.length).toBeGreaterThan(0);
    for (const artist of result) {
      expect(artist.id).toBeTruthy();
      expect(artist.name).toBeTruthy();
      expect(artist.genre).toBeTruthy();
    }
  });
});

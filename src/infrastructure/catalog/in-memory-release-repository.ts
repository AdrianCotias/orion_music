import { createRelease, type Release } from "../../domain/catalog/release";
import type { ReleaseRepository } from "../../domain/catalog/release-repository";

const releases: Release[] = [
  createRelease({
    id: "r1",
    title: "Lançamento Exemplo A",
    type: "single",
    artistIds: ["a1"],
    releasedAt: new Date("2026-03-14"),
  }),
  createRelease({
    id: "r2",
    title: "Lançamento Exemplo B",
    type: "album",
    artistIds: ["a1", "a2"],
    releasedAt: new Date("2026-08-02"),
  }),
];

export class InMemoryReleaseRepository implements ReleaseRepository {
  async findAll() {
    return [...releases];
  }

  async findById(id: string) {
    return releases.find((r) => r.id === id) ?? null;
  }
}

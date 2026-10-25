import { ListReleases } from "../application/catalog/list-releases";
import { InMemoryArtistRepository } from "./catalog/in-memory-artist-repository";
import { InMemoryReleaseRepository } from "./catalog/in-memory-release-repository";

export const artistRepository = new InMemoryArtistRepository();
export const releaseRepository = new InMemoryReleaseRepository();

export const listReleases = new ListReleases(releaseRepository, artistRepository);

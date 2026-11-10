import { GetRelease } from "../application/catalog/get-release";
import { ListArtists } from "../application/catalog/list-artists";
import { ListReleases } from "../application/catalog/list-releases";
import { InMemoryArtistRepository } from "./catalog/in-memory-artist-repository";
import { InMemoryReleaseRepository } from "./catalog/in-memory-release-repository";

const artistRepository = new InMemoryArtistRepository();
const releaseRepository = new InMemoryReleaseRepository();

export const listReleases = new ListReleases(releaseRepository, artistRepository);
export const getRelease = new GetRelease(releaseRepository, artistRepository);
export const listArtists = new ListArtists(artistRepository);

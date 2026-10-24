import type { Release } from "./release";

export interface ReleaseRepository {
  findAll(): Promise<Release[]>;
  findById(id: string): Promise<Release | null>;
}

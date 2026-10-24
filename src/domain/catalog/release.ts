import { DomainError } from "../shared/domain-error";

export type ReleaseType = "single" | "ep" | "album";

export type Release = {
  readonly id: string;
  readonly title: string;
  readonly type: ReleaseType;
  readonly artistIds: readonly string[];
  readonly releasedAt: Date;
};

export function createRelease(input: Release): Release {
  const title = input.title.trim();
  if (!input.id) throw new DomainError("Lançamento precisa de id.");
  if (!title) throw new DomainError("Lançamento precisa de título.");
  if (input.artistIds.length === 0) {
    throw new DomainError("Lançamento precisa de pelo menos um artista.");
  }
  if (Number.isNaN(input.releasedAt.getTime())) {
    throw new DomainError("Data de lançamento inválida.");
  }
  return { ...input, title };
}

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  artistRepository,
  listReleases,
  releaseRepository,
} from "../src/infrastructure/container";

const server = new McpServer({ name: "orion-music", version: "0.1.0" });

const readOnly = { readOnlyHint: true, openWorldHint: false };

function json(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
}

server.registerTool(
  "list_releases",
  {
    description:
      "Lista os lançamentos do catálogo da Orion Music, do mais recente ao mais antigo, com nomes dos artistas.",
    annotations: readOnly,
  },
  async () => json(await listReleases.execute()),
);

server.registerTool(
  "get_release",
  {
    description: "Busca um lançamento pelo id (ex.: r1). Use list_releases para descobrir os ids.",
    inputSchema: { id: z.string().describe("Id do lançamento") },
    annotations: readOnly,
  },
  async ({ id }) => {
    const release = await releaseRepository.findById(id);
    if (!release) {
      return { isError: true, content: [{ type: "text" as const, text: `Lançamento "${id}" não encontrado.` }] };
    }
    const artists = await artistRepository.findByIds(release.artistIds);
    return json({ ...release, releasedAt: release.releasedAt.toISOString(), artists });
  },
);

server.registerTool(
  "list_artists",
  {
    description: "Lista os artistas do catálogo da Orion Music (id, nome e gênero).",
    annotations: readOnly,
  },
  async () => json(await artistRepository.findAll()),
);

await server.connect(new StdioServerTransport());

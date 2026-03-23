#!/usr/bin/env node

/**
 * Rankiteo MCP Server
 *
 * Exposes cyber risk rating tools via the Model Context Protocol (MCP).
 * Connects to the Rankiteo API to provide real-time security scores
 * for 4M+ companies worldwide.
 *
 * Tools:
 *   - search_company: Search companies by name
 *   - get_company_rating_by_domain: Get rating by domain
 *   - get_company_rating_by_linkedin_id: Get rating by LinkedIn ID
 *   - get_company_rating_by_id: Get rating by Rankiteo company ID
 *
 * @see https://www.rankiteo.com/mcp
 * @see https://smithery.ai/servers/rankiteo/rankiteo-mcp
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_BASE = process.env.RANKITEO_API_URL || "https://api.rankiteo.com";
const API_KEY = process.env.RANKITEO_API_KEY || "";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function apiCall(path: string): Promise<unknown> {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "rankiteo-mcp/1.0",
  };
  if (API_KEY) {
    headers["Authorization"] = `Bearer ${API_KEY}`;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Rankiteo API error ${res.status}: ${text}`);
  }

  return res.json();
}

function formatRating(data: Record<string, unknown>): string {
  const score = data.score_cur_pub ?? data.score ?? "N/A";
  const name = data.name ?? data.company_name ?? "Unknown";
  const domain = data.domain ?? data.website ?? "";
  const industry = data.industry ?? "";
  const employees = data.employees ?? "";

  // Determine band from score
  let band = "N/A";
  if (typeof score === "number") {
    if (score >= 900) band = "Aaa";
    else if (score >= 850) band = "Aa";
    else if (score >= 800) band = "A";
    else if (score >= 750) band = "Baa";
    else if (score >= 700) band = "Ba";
    else if (score >= 650) band = "B";
    else if (score >= 600) band = "Caa";
    else if (score >= 550) band = "Ca";
    else band = "C";
  }

  const lines = [
    `Company: ${name}`,
    `Score: ${score}/1000 (${band})`,
  ];
  if (domain) lines.push(`Domain: ${domain}`);
  if (industry) lines.push(`Industry: ${industry}`);
  if (employees) lines.push(`Employees: ${employees}`);

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// MCP Server
// ---------------------------------------------------------------------------

const server = new McpServer({
  name: "rankiteo",
  version: "1.0.0",
});

// Tool: search_company
server.tool(
  "search_company",
  "Search for companies by name in the Rankiteo database (4M+ companies). Returns matching companies with their identifiers.",
  { company_name: z.string().describe("Company name to search for") },
  async ({ company_name }) => {
    try {
      const data = (await apiCall(
        `/api/company/search?search_term=${encodeURIComponent(company_name)}&search_type=company_name`
      )) as { success?: boolean; data?: Record<string, unknown>[] };

      if (!data.data?.length) {
        return { content: [{ type: "text" as const, text: `No companies found matching "${company_name}".` }] };
      }

      const results = data.data.slice(0, 10).map((c, i) => {
        const name = c.name || "Unknown";
        const lid = c.linkedin_id || "";
        const domain = c.domain || c.crunchbase_url || "";
        return `${i + 1}. ${name} (linkedin_id: ${lid}${domain ? `, domain: ${domain}` : ""})`;
      });

      return {
        content: [{ type: "text" as const, text: `Found ${data.data.length} companies:\n\n${results.join("\n")}` }],
      };
    } catch (e) {
      return { content: [{ type: "text" as const, text: `Error: ${e instanceof Error ? e.message : String(e)}` }], isError: true };
    }
  }
);

// Tool: get_company_rating_by_domain
server.tool(
  "get_company_rating_by_domain",
  "Get the cyber risk rating for a company by its domain name. Returns a 0-1000 risk score with letter grade (Aaa to C).",
  { domain: z.string().describe("Company domain (e.g. tesla.com)") },
  async ({ domain }) => {
    try {
      const data = (await apiCall(
        `/api/v1/api/company?domain=${encodeURIComponent(domain)}`
      )) as Record<string, unknown>;

      return { content: [{ type: "text" as const, text: formatRating(data) }] };
    } catch (e) {
      return { content: [{ type: "text" as const, text: `Error: ${e instanceof Error ? e.message : String(e)}` }], isError: true };
    }
  }
);

// Tool: get_company_rating_by_linkedin_id
server.tool(
  "get_company_rating_by_linkedin_id",
  "Get the cyber risk rating for a company by its LinkedIn identifier. Returns a 0-1000 risk score with letter grade.",
  { linkedin_id: z.string().describe("Company LinkedIn ID (e.g. microsoft, tesla-motors)") },
  async ({ linkedin_id }) => {
    try {
      const data = (await apiCall(
        `/api/v1/api/company?linkedin_id=${encodeURIComponent(linkedin_id)}`
      )) as Record<string, unknown>;

      return { content: [{ type: "text" as const, text: formatRating(data) }] };
    } catch (e) {
      return { content: [{ type: "text" as const, text: `Error: ${e instanceof Error ? e.message : String(e)}` }], isError: true };
    }
  }
);

// Tool: get_company_rating_by_id
server.tool(
  "get_company_rating_by_id",
  "Get the cyber risk rating for a company by its Rankiteo internal ID. Returns a 0-1000 risk score with letter grade.",
  { company_id: z.string().describe("Rankiteo company ID") },
  async ({ company_id }) => {
    try {
      const data = (await apiCall(
        `/api/v1/api/company?company_id=${encodeURIComponent(company_id)}`
      )) as Record<string, unknown>;

      return { content: [{ type: "text" as const, text: formatRating(data) }] };
    } catch (e) {
      return { content: [{ type: "text" as const, text: `Error: ${e instanceof Error ? e.message : String(e)}` }], isError: true };
    }
  }
);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Rankiteo MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

<p align="center">
  <img src="https://www.rankiteo.com/Images/rankiteo.png" alt="Rankiteo" width="80" />
</p>

<h1 align="center">Rankiteo MCP Server</h1>

<p align="center">
  <strong>Cyber risk ratings for AI agents via the Model Context Protocol</strong>
</p>

<p align="center">
  <a href="https://smithery.ai/servers/rankiteo/rankiteo-mcp"><img src="https://smithery.ai/badge/@rankiteo/rankiteo-mcp" alt="Smithery" /></a>
  <a href="https://www.npmjs.com/package/@rankiteo/rankiteo-mcp"><img src="https://img.shields.io/npm/v/@rankiteo/rankiteo-mcp?color=6366f1&label=npm" alt="npm" /></a>
  <a href="https://github.com/rankiteo/rankiteo-mcp/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" /></a>
  <a href="https://www.rankiteo.com/mcp"><img src="https://img.shields.io/badge/docs-rankiteo.com-blue" alt="Docs" /></a>
</p>

---

The **Rankiteo MCP Server** gives your AI agents real-time access to cyber risk intelligence for **4 million+ companies**. Query security ratings, risk scores, and company profiles directly from Claude, Cursor, Windsurf, or any MCP-compatible client.

Built for **cyber insurance underwriters**, **security teams**, **vendor risk managers**, and anyone who needs cyber risk data inside their AI workflows.

## Features

- **Real-time cyber ratings** — 0–1000 risk scores with letter grades (Aaa to C)
- **4M+ company database** — Search by name, domain, LinkedIn ID, or company ID
- **Industry benchmarks** — Compare against sector peers
- **No custom code** — Add the server, set your API key, start querying
- **Works everywhere** — Claude Desktop, Claude Code, Cursor, Windsurf, and any MCP client

## Quick Start

### Install via Smithery (recommended)

```bash
npx -y @smithery/cli install @rankiteo/rankiteo-mcp --client claude
```

Replace `claude` with your client: `cursor`, `windsurf`, `claude-code`, etc.

### Install via npm

```bash
npm install -g @rankiteo/rankiteo-mcp
```

### Manual Configuration

Add the server to your MCP client configuration:

<details>
<summary><strong>Claude Desktop</strong></summary>

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "rankiteo": {
      "url": "https://mcp.rankiteo.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

</details>

<details>
<summary><strong>Claude Code (CLI)</strong></summary>

```bash
claude mcp add rankiteo --transport sse https://mcp.rankiteo.com/mcp \
  --header "Authorization: Bearer YOUR_API_KEY"
```

</details>

<details>
<summary><strong>Cursor</strong></summary>

Open Cursor Settings > MCP Servers, add:

```json
{
  "rankiteo": {
    "url": "https://mcp.rankiteo.com/mcp",
    "headers": {
      "Authorization": "Bearer YOUR_API_KEY"
    }
  }
}
```

</details>

<details>
<summary><strong>Windsurf</strong></summary>

Edit `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "rankiteo": {
      "serverUrl": "https://mcp.rankiteo.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

</details>

## Get Your API Key

1. Go to [rankiteo.com/pricing](https://www.rankiteo.com/pricing?plan=api-free)
2. Create a free account (100 requests/month included)
3. Generate an API key from your dashboard
4. Use it in the configuration above

## Available Tools

The Rankiteo MCP server exposes 4 tools:

### `search_company`

Search for companies by name. Returns matching companies with their LinkedIn IDs.

```
> Search for "Tesla"
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `company_name` | string | Yes | Company name to search for |

---

### `get_company_rating_by_domain`

Get the full cyber risk rating for a company by its domain name.

```
> Get the cyber risk rating for tesla.com
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `domain` | string | Yes | Company domain (e.g. `tesla.com`) |

**Example response:**
```json
{
  "company": "Tesla, Inc.",
  "linkedin_id": "tesla-motors",
  "domain": "tesla.com",
  "score": 847,
  "band": "A",
  "industry": "Automotive",
  "employees": "140000+",
  "risk_factors": {
    "email_security": "strong",
    "ssl_certificates": "valid",
    "open_ports": 3,
    "vulnerabilities": 0
  }
}
```

---

### `get_company_rating_by_linkedin_id`

Get the full cyber risk rating using the company's LinkedIn ID.

```
> What is the cyber rating for linkedin_id "microsoft"?
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `linkedin_id` | string | Yes | Company LinkedIn identifier |

---

### `get_company_rating_by_id`

Get the full cyber risk rating using the Rankiteo internal company ID.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `company_id` | string | Yes | Rankiteo company ID |

## Video Tutorials

See the Rankiteo MCP server in action with these step-by-step guides:

| | Video | Description |
|---|---|---|
| ▶️ | [**Rankiteo × n8n MCP**](https://www.youtube.com/watch?v=TZtuKjxGJ24) | Automate cyber risk workflows with n8n and Rankiteo MCP |
| ▶️ | [**Rankiteo × Cursor MCP**](https://youtu.be/bHxs27bwN0Q) | Query cyber ratings directly from your Cursor IDE |
| ▶️ | [**Rankiteo × ChatGPT MCP**](https://youtu.be/3IByIOLU3WU) | Use Rankiteo cyber intelligence inside ChatGPT |

[![Rankiteo with n8n](https://img.youtube.com/vi/TZtuKjxGJ24/mqdefault.jpg)](https://www.youtube.com/watch?v=TZtuKjxGJ24)
[![Rankiteo with Cursor](https://img.youtube.com/vi/bHxs27bwN0Q/mqdefault.jpg)](https://youtu.be/bHxs27bwN0Q)
[![Rankiteo with ChatGPT](https://img.youtube.com/vi/3IByIOLU3WU/mqdefault.jpg)](https://youtu.be/3IByIOLU3WU)

## Use Cases

### Cyber Insurance Underwriting

> "What's the cyber risk score for the company applying at acme-corp.com? Should we accept this submission?"

Your underwriting agent pulls the real-time rating, checks the score against your risk appetite, and recommends accept/decline — all in one conversation.

### Vendor Risk Management (TPRM)

> "Check the security posture of our top 5 vendors: salesforce.com, aws.amazon.com, stripe.com, datadog.com, cloudflare.com"

Automate vendor due diligence by querying risk scores in bulk during procurement reviews.

### Security Monitoring

> "Compare the cyber ratings of our subsidiaries and flag any that dropped below 700 this month"

Build internal dashboards and alerting workflows powered by live Rankiteo data.

### Compliance & Audit

> "Pull the risk rating for our partner company and include it in the ISO 27001 supplier risk assessment"

Generate audit-ready risk evidence without leaving your AI workspace.

## Scoring System

Rankiteo rates companies on a **0–1000 scale** with letter grades:

| Score Range | Grade | Risk Level |
|------------|-------|------------|
| 900–1000 | **Aaa** | Excellent |
| 850–899 | **Aa** | Very Good |
| 800–849 | **A** | Good |
| 750–799 | **Baa** | Fair |
| 700–749 | **Ba** | Moderate |
| 650–699 | **B** | Weak |
| 600–649 | **Caa** | Poor |
| 550–599 | **Ca** | Very Poor |
| 0–549 | **C** | Critical |

Scores are computed from **external attack surface analysis (EASM)**, including DNS security, SSL/TLS configuration, email security (SPF/DKIM/DMARC), open ports, vulnerabilities, and more.

## Server Endpoint

The MCP server is hosted at:

```
https://mcp.rankiteo.com/mcp
```

This endpoint supports the full MCP protocol, including tool discovery, resource listing, and prompt templates.

## Rate Limits

| Plan | Requests/month | Price |
|------|---------------|-------|
| **Free** | 100 | $0 |
| **Basic** | 5,000 | $49/mo |
| **Pro** | 25,000 | $99/mo |
| **Expert** | Unlimited | $300/mo |

[View pricing →](https://www.rankiteo.com/pricing)

## Links

- [Rankiteo Platform](https://www.rankiteo.com) — Main platform
- [MCP Documentation](https://www.rankiteo.com/mcp) — Full MCP docs
- [Smithery Listing](https://smithery.ai/servers/rankiteo/rankiteo-mcp) — Install from Smithery
- [Chrome Extension](https://www.rankiteo.com/chrome-extension) — Browser extension
- [API Documentation](https://www.rankiteo.com/products/easm-cyber-api) — REST API docs
- [Pricing](https://www.rankiteo.com/pricing?plan=api-free) — Get your API key

## About Rankiteo

[Rankiteo](https://www.rankiteo.com) is an AI-powered cyber risk intelligence platform trusted by insurance underwriters, enterprises, and security teams worldwide. We rate **4 million+ companies** across industries using External Attack Surface Management (EASM), providing real-time security ratings, premium estimation, supply chain analysis, and compliance intelligence.

**Key capabilities:**
- Real-time cyber risk ratings (0–1000) for 4M+ companies
- AI-powered cyber insurance premium estimation
- External Attack Surface Management (EASM)
- Third-Party Risk Management (TPRM) with automatic vendor detection
- Supply chain risk mapping
- Compliance monitoring (ISO 27001, SOC 2, GDPR, NIS2, DORA)
- Catastrophe modeling and accumulation risk analysis
- 50,000+ searchable cyber incident database
- MCP, REST API, and Chrome/Firefox/Edge/Opera extensions

## License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <a href="https://www.rankiteo.com"><img src="https://img.shields.io/badge/Rankiteo-www.rankiteo.com-6366f1?style=for-the-badge" alt="Rankiteo" /></a>
</p>

# Rankiteo MCP Server — Usage Examples

## Example Prompts

Once connected, you can ask your AI agent questions like:

### Company Lookup

> "Search for Tesla in the Rankiteo database"

> "What is the cyber risk score for microsoft.com?"

> "Get the security rating for the company with LinkedIn ID 'salesforce'"

### Underwriting

> "Check the cyber risk score for acme-corp.com. Based on the score, would you recommend accepting a $5M cyber insurance policy?"

> "Compare the cyber ratings of these 3 applicants: tesla.com, ford.com, gm.com. Which one has the highest risk?"

### Vendor Risk

> "Our company uses these vendors: aws.amazon.com, stripe.com, datadog.com, cloudflare.com. Pull their cyber risk scores and flag any below 700."

> "We're evaluating a new SaaS vendor at example.com. What's their security rating and should we proceed?"

### Compliance & Audit

> "Get the risk rating for our partner company 'microsoft' and summarize it for an ISO 27001 supplier assessment."

## Response Format

Each rating tool returns:

```
Company: Tesla, Inc.
Score: 847/1000 (A)
Domain: tesla.com
Industry: Automotive
Employees: 140000+
```

## Score Interpretation

| Score | Grade | Meaning |
|-------|-------|---------|
| 900+ | Aaa | Excellent — minimal cyber risk |
| 850-899 | Aa | Very good — strong security posture |
| 800-849 | A | Good — above average |
| 750-799 | Baa | Fair — room for improvement |
| 700-749 | Ba | Moderate — notable risks |
| 650-699 | B | Weak — significant concerns |
| 600-649 | Caa | Poor — high risk |
| 550-599 | Ca | Very poor — critical issues |
| <550 | C | Critical — severe risk |

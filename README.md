# Google Custom Search JSON API alternative: same requests, same JSON

[![Run on Apify](https://img.shields.io/badge/Run%20on-Apify-0b57d0)](https://apify.com/automationnation/google-custom-search-api)

Google Custom Search API Alternative is an Apify Actor that replaces Google's Custom Search JSON API, which Google has closed to new customers and retires on 1 January 2027. It answers the same /customsearch/v1 requests with the same JSON (items with title, link, displayLink and snippet, plus image search), built from live Google results, at $5 per 1,000 searches with no daily cap.

**Price:** $5 per 1,000 searches of up to 10 results ($4 on Gold and above) · **Run it:** [https://apify.com/automationnation/google-custom-search-api](https://apify.com/automationnation/google-custom-search-api) · **Guide:** [https://retracn.github.io/automationnation-actors/google-custom-search-api/](https://retracn.github.io/automationnation-actors/google-custom-search-api/)

## Quick facts

- Drop-in endpoint: replace https://www.googleapis.com/customsearch/v1 with https://automationnation--google-custom-search-api.apify.actor/customsearch/v1 and send your Apify token (token=… or Authorization: Bearer) instead of key=.
- Same parameters: q, num, start, gl, hl, lr, cr, safe, dateRestrict, siteSearch, exactTerms, excludeTerms, orTerms, fileType and searchType=image with its image filters; cx is accepted and ignored.
- Same JSON: kind, queries.request and nextPage, searchInformation and items[] with title, htmlTitle, link, displayLink, snippet, htmlSnippet and formattedUrl (image items add mime and image.contextLink, width, height, byteSize, thumbnailLink).
- Differences: it searches the whole web (pass site lists as siteSearch or site: operators), totalResults is a lower bound, there is no pagemap, and a request takes about 5–15 seconds.
- Price: $5 per 1,000 searches of up to 10 results, the price Google charged; searches with no results are free and there is no daily cap.

## Use it as a drop-in Custom Search JSON API

Change the endpoint and the key; keep the rest of your code:

| | Before | After |
|---|---|---|
| Endpoint | `https://www.googleapis.com/customsearch/v1` | `https://automationnation--google-custom-search-api.apify.actor/customsearch/v1` |
| Auth | `key=YOUR_GOOGLE_KEY&cx=YOUR_ENGINE_ID` | `token=YOUR_APIFY_TOKEN` or header `Authorization: Bearer YOUR_APIFY_TOKEN` |

```bash
curl "https://automationnation--google-custom-search-api.apify.actor/customsearch/v1?q=best+crm+for+startups&num=10&token=$APIFY_TOKEN"
```

Python ([`examples/cse_requests.py`](examples/cse_requests.py)) and JavaScript ([`examples/cse_fetch.mjs`](examples/cse_fetch.mjs)) versions are in `examples/`. The response is the API's JSON: `items[].title`, `link`, `displayLink`, `snippet`, `queries.nextPage` and `searchInformation`; `searchType=image` works too.

## Example input

```json
{
  "queries": [
    "best project management software"
  ],
  "maxResultsPerQuery": 10
}
```

## Run it from code

**REST API**

```bash
curl -X POST "https://api.apify.com/v2/acts/automationnation~google-custom-search-api/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"queries": ["best project management software"], "maxResultsPerQuery": 10}'
```

**Python** — see [`examples/python_example.py`](examples/python_example.py)

```python
# pip install apify-client
from apify_client import ApifyClient

client = ApifyClient("YOUR_APIFY_TOKEN")
run = client.actor("automationnation/google-custom-search-api").call(run_input={
  "queries": [
    "best project management software"
  ],
  "maxResultsPerQuery": 10
})
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item.get("title"), item.get("link"), item.get("displayLink"), item.get("snippet"))
```

**JavaScript** — see [`examples/node_example.mjs`](examples/node_example.mjs)

```js
// npm install apify-client
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: 'YOUR_APIFY_TOKEN' });
const run = await client.actor('automationnation/google-custom-search-api').call({
  "queries": [
    "best project management software"
  ],
  "maxResultsPerQuery": 10
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) console.log(item.title, item.link, item.displayLink, item.snippet);
```

## Use it with AI agents (MCP)

Hosted MCP server URL (Claude, ChatGPT, Cursor and other clients with remote MCP support):

```
https://mcp.apify.com?tools=automationnation/google-custom-search-api
```

Local config for Claude Desktop / Cursor — [`mcp/claude_desktop_config.json`](mcp/claude_desktop_config.json):

```json
{
  "mcpServers": {
    "google-custom-search-api": {
      "command": "npx",
      "args": [
        "-y",
        "@apify/actors-mcp-server",
        "--tools",
        "automationnation/google-custom-search-api"
      ],
      "env": {
        "APIFY_TOKEN": "YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

## FAQ

**When does the Custom Search JSON API stop working?**
Google closed it to new customers and says existing customers have until 1 January 2027 to move to an alternative.

**Do I have to rewrite my code?**
No. Change the endpoint to https://automationnation--google-custom-search-api.apify.actor/customsearch/v1 and send an Apify API token instead of the Google key; the parameters and the JSON response stay the same.

**Can I keep my Programmable Search Engine's site list?**
Not through cx, which is ignored. Pass one site as siteSearch, or several in the query as site:a.com OR site:b.com.

**What does it cost?**
$5 per 1,000 searches of up to 10 results ($4.50 on Silver, $4 on Gold and above), with no daily cap. Google charged $5 per 1,000 after 100 free queries a day; Apify's free plan includes $5 of monthly credit, about 1,000 searches.

## More from AutomationNation

- [AI Visibility Tracker](https://apify.com/automationnation/ai-visibility-tracker) — $0.05 per answer checked ($0.04 on Gold) + $0.50 per optional report · [GitHub examples](https://github.com/retracn/ai-visibility-tracker)
- [Google Jobs Scraper](https://apify.com/automationnation/google-jobs-scraper) — $2 per 1,000 jobs ($1.50 on paid plans) + $0.03 per search · [GitHub examples](https://github.com/retracn/google-jobs-scraper)
- [YouTube Transcript Scraper](https://apify.com/automationnation/youtube-transcript-scraper) — $1.50 per 1,000 transcripts ($1.20 on Gold and above) · [GitHub examples](https://github.com/retracn/youtube-transcript-api)
- [Google Shopping Scraper](https://apify.com/automationnation/google-shopping-scraper) — $1 per 1,000 products ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-shopping-scraper)
- [Google Flights Scraper](https://apify.com/automationnation/google-flights-scraper) — $0.20 per 1,000 flights ($0.16 on Gold and above) · [GitHub examples](https://github.com/retracn/google-flights-scraper)
- [Google Hotels Scraper](https://apify.com/automationnation/google-hotels-scraper) — $1 per 1,000 hotels ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-hotels-scraper)
- [Google Ads Transparency Scraper](https://apify.com/automationnation/google-ads-transparency-scraper) — $1 per 1,000 ads ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-ads-transparency-scraper)
- [Google News Scraper](https://apify.com/automationnation/google-news-scraper) — $1 per 1,000 articles ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-news-scraper)
- [Google Images Scraper](https://apify.com/automationnation/google-images-scraper) — $0.25 per 1,000 images ($0.20 on Gold and above) · [GitHub examples](https://github.com/retracn/google-images-scraper)
- [Google Videos Scraper](https://apify.com/automationnation/google-videos-scraper) — $1 per 1,000 videos ($0.80 on Gold and above) · [GitHub examples](https://github.com/retracn/google-videos-scraper)
- [Google Trends Scraper](https://apify.com/automationnation/google-trends-scraper) — $1 per 1,000 keyword reports ($0.27–$0.90 on paid plans) · $0.50 per 1,000 trending searches · [GitHub examples](https://github.com/retracn/google-trends-scraper)
- [App Store Reviews Scraper](https://apify.com/automationnation/app-store-reviews-scraper) — $0.08 per 1,000 reviews ($0.05–$0.07 on paid plans) · [GitHub examples](https://github.com/retracn/app-store-reviews-scraper)
- [Google Play Reviews Scraper](https://apify.com/automationnation/google-play-reviews-scraper) — $0.08 per 1,000 reviews ($0.05–$0.07 on paid plans) · [GitHub examples](https://github.com/retracn/google-play-reviews-scraper)
- [AEO & GEO Tracker — Google AI Overview Citation Checker](https://apify.com/automationnation/aeo-auditor) — $0.04 per keyword ($0.032 on Gold), plus $2 per run from 17 Nov 2026; $0.01 per keyword until 16 Oct 2026 · [GitHub examples](https://github.com/retracn/google-ai-overview-tracker)
- [Google Maps Leads Scraper](https://apify.com/automationnation/google-maps-leads) — $0.03 per lead ($0.024 on Gold) · [GitHub examples](https://github.com/retracn/google-maps-leads-scraper)
- [Google Maps Leads Scraper UK](https://apify.com/automationnation/uk-business-leads) — $0.05 per lead ($0.04 on Gold) · [GitHub examples](https://github.com/retracn/uk-business-leads-google-maps)
- [App Store & Google Play Reviews Scraper + AI](https://apify.com/automationnation/app-store-review-miner) — $0.05 per app report ($0.04 on Gold) · [GitHub examples](https://github.com/retracn/app-store-google-play-reviews-ai)
- [UK Companies House Leads — Filing Signals & AI Outreach](https://apify.com/automationnation/companies-house-leads) — $0.008 per lead
- [Contact Waterfall Enrichment — Emails & Directors](https://apify.com/automationnation/contact-waterfall-enrichment) — $0.015 per company
- [All Actors and guides](https://retracn.github.io/automationnation-actors/) · [AI visibility trackers compared](https://retracn.github.io/automationnation-actors/compare/ai-visibility-trackers/) · [Google Jobs scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-jobs-scrapers/) · [Google Trends scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-trends-scrapers/) · [App Store review scrapers compared](https://retracn.github.io/automationnation-actors/compare/app-store-review-scrapers/) · [Google Play review scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-play-review-scrapers/) · [YouTube transcript scrapers compared](https://retracn.github.io/automationnation-actors/compare/youtube-transcript-scrapers/) · [Google Flights scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-flights-scrapers/) · [Google Hotels scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-hotels-scrapers/) · [Google Ads Transparency scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-ads-transparency-scrapers/) · [Google Shopping scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-shopping-scrapers/) · [Google News scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-news-scrapers/)

---

This repository holds usage examples. The scraper itself runs on the [Apify platform](https://apify.com/automationnation/google-custom-search-api); you need a free Apify account and API token. Examples are MIT licensed.

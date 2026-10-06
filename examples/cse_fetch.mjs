// Google Custom Search JSON API, same parameters and JSON, after Google's 1 January 2027 shutdown.
// export APIFY_TOKEN=your_token ; node cse_fetch.mjs
const url = new URL('https://automationnation--google-custom-search-api.apify.actor/customsearch/v1');
url.search = new URLSearchParams({ q: 'best crm for startups', num: '10', gl: 'us' });
const res = await fetch(url, { headers: { Authorization: `Bearer ${process.env.APIFY_TOKEN}` } });
if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
const { items = [] } = await res.json();
for (const item of items) console.log(item.title, '-', item.link);

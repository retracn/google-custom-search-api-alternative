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

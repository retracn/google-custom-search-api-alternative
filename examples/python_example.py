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

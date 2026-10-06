# Google Custom Search JSON API, same parameters and JSON, after Google's 1 January 2027 shutdown.
# pip install requests ; export APIFY_TOKEN=your_token
import os
import requests

ENDPOINT = "https://automationnation--google-custom-search-api.apify.actor/customsearch/v1"


def custom_search(q, **params):
    r = requests.get(
        ENDPOINT,
        params={"q": q, **params},
        headers={"Authorization": f"Bearer {os.environ['APIFY_TOKEN']}"},
        timeout=60,
    )
    r.raise_for_status()
    return r.json()


res = custom_search("best crm for startups", num=10, gl="us")
for item in res.get("items", []):
    print(item["title"], "-", item["link"])

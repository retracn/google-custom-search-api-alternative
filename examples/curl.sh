#!/bin/bash
# export APIFY_TOKEN=your_token
curl -X POST "https://api.apify.com/v2/acts/automationnation~google-custom-search-api/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"queries": ["best project management software"], "maxResultsPerQuery": 10}'

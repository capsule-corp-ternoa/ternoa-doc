---
sidebar_position: 3
---

# Custom Plugins

## Add the custome plugins (for distinct and aggregation)

:::note remarque

**Prerequisite**: have **docker** and **docker-compose** installed and running on your machine.

:::


To add the custom plugins to use distinct filters and aggregations, you have to build a custom image with our code and use this image to build the graphql-engine container.

```bash 
git clone https://github.com/capsule-corp-ternoa/subql.git
cd subql/packages/query/
docker build -t query-ternoa .
```

Your image is now built. 
You need to setup the indexer and in the docker-compose.yml file, change the graphql-engine image to query-ternoa.
Now, the distinct and aggregation is available in the graphql playground.

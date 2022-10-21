---
sidebar_position: 7
---

# Deployment

<!-- ## Architecture where indexer is being used

![Architecture](./ternoa-architecture.png) -->

## Deployment steps (on Clevercloud)

Indexer deployment requires 2 apps :

| App            | Size                                   |
|----------------|----------------------------------------|
| NodeJS App     | At least L , Enable dedicated instance |
| Postgres Addon | At least Huge Space X                  |

![Clevercloud-configuration](./cc-configuration.png)

- Create both apps
- Set the following environment variables on the NodeJS App
```javascript showLineNumbers
CC_PRE_BUILD_HOOK="bash init.sh"
CC_WORKER_COMMAND="bash run_worker.sh"
PORT="8080"
```
- The deployment should fail, this is intended (Only the first time deploying), but we need to check if the schema and the tables are created correctly as follow
![Db-configuration](./db-configuration.png)
- Update the environments variables and replace the old ones by
```javascript showLineNumbers
CC_PRE_BUILD_HOOK="bash build.sh"
CC_WORKER_COMMAND="bash run_worker.sh"
PORT="8080"
```
- Click on the "rebuild and restart" button at the top of the page

The process is the same to deploy the dictionary.

Note : During the resize of the Database Addon on clevercloud, the created schema will be migrated with less permissions, permissions should be added manually after the migration.

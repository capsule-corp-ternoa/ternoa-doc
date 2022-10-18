---
sidebar_position: 2
--- 

# App

## Use it from an App

Here we'll see the simplest example to request indexer data from a node application.
We'll use the simple request used in the playground section.

First of all, in a new folder, create 2 files:

package.json
```json
{
  "name": "indexer-request-sample",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "graphql-request": "^4.0.0"
  }
}
```

index.js
```javascript
import { request } from "graphql-request"

const getLastListedNFTs = async () => {
	const gqlQuery = `{
	  nftEntities(
		first: 10, 
		offset: 0, 
		orderBy: TIMESTAMP_LIST_DESC
	  ) {
		totalCount
		nodes {
		  nftId
		  serieId
		  isCapsule
		  owner
		  creator
		}
	  }
	}`
	const response = await request("https://indexer.testnet.ternoa.com/", gqlQuery)
	if (response.nftEntities){
		console.log("Total count", response.nftEntities.totalCount)
		response.nftEntities.nodes.forEach(x => console.log(x))
	}
}

getLastListedNFTs()
```

Now open a terminal in this folder and run the following commands:
```bash
npm install
node index.js
```
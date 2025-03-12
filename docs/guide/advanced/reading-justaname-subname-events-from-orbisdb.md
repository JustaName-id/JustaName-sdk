# Reading JustaName Subname Events on OrbisDB

## Introduction

### Ceramic Network

Ceramic is a decentralized, scalable data network designed for Web3 applications. It enables applications to store and retrieve mutable, permissioned data using decentralized identifiers (DIDs). Ceramic provides a way to manage dynamic data streams without relying on centralized servers, making it ideal for applications that require verifiable and permissionless data access.

### OrbisDB

OrbisDB is a decentralized database built on top of the Ceramic Network. It provides an efficient way to query and store structured data using an SQL-like interface while maintaining decentralization and interoperability. OrbisDB is widely used for managing event logs, user interactions, and other structured datasets in a permissioned yet decentralized manner.

## **Reading JustaName Subname Events from OrbisDB**

The following code demonstrates how to retrieve subname events from OrbisDB using the `@useorbis/db-sdk` package:

```jsx
import { OrbisDB } from "@useorbis/db-sdk";

const db = new OrbisDB({
  ceramic: {
    gateway: process.env.CERAMIC_GATEWAY_URL,
  },
  nodes: [
    {
      gateway: process.env.ORBIS_GATEWAY_URL,
      env: process.env.ORBIS_ENVIRONMENT_ID,
    },
  ],
});

async function main() {
  const queryResult = await db
    .select()
    .from(process.env.ORBIS_MODEL_ID)
    .context(process.env.ORBIS_CONTEXT_ID)
    .run();
}

main();
```

### Code Explanation

This script initializes an `OrbisDB` instance and queries subname events stored in OrbisDB. Here's a breakdown of each part:

* **Initializing OrbisDB**: The `OrbisDB` instance is created using environment variables that specify connection details.
* **Query Execution**: The `.select().from().context().run()` chain fetches all records from a specific model and context.

### Environment Variables

The following environment variables are required to properly access OrbisDB:

* `CERAMIC_GATEWAY_URL`: The Ceramic gateway URL used to connect to the Ceramic network.
* `ORBIS_GATEWAY_URL`: The Orbis gateway URL for accessing OrbisDB.
* `ORBIS_ENVIRONMENT_ID`: The environment identifier for specifying which Orbis environment to query.
* `ORBIS_MODEL_ID`: The unique identifier for the data model that stores JustaName subname events.
* `ORBIS_CONTEXT_ID`: The context identifier used to filter and query specific datasets within OrbisDB.

### Accessing the Required Identifiers

To query JustaName subname events, you need access to the `ORBIS_MODEL_ID`, `ORBIS_CONTEXT_ID`, and `ORBIS_ENVIRONMENT_ID`. Please contact the JustaName team to request access to these identifiers.

# Dynamic Records Resolution

### Overview

Previously, retrieving records attached to an ENS name stored offchain required querying gateways via API calls (when supported). JustaName now introduces a breakthrough solution that enables fully onchain dynamic record resolution.

### The Solution: \`records()\` function

JustaName now supports a new function `records() returns (string[])` that returns an array of all record types attached to an ENS name. This enables clients to discover available records dynamically and perform targeted onchain resolution.

#### Example Response Format

```javascript
[
  'addr(60)',
  'addr(246)', 
  'addr(820)',
  'addr(2147483704)',
  'addr(2147492101)',
  'text(com.github_justverified.eth)',
  'text(avatar)',
  'text(header)',
  'text(test)',
  'text(com.twitter_justverified.eth)',
  'text(display)',
  'text(org.telegram_justverified.eth)',
  'text(com.discord_justverified.eth)',
  'text(email_justverified.eth)',
  'text(Age)',
]
```

#### Benefits

**Dynamic Resolution**: Instead of guessing which records exist, clients can query the available record keys and resolve only what's actually present.

**Onchain Operations**: All operations are performed onchain, eliminating dependency on external gateways and API availability.

**Efficiency**: Reduces unnecessary calls by only resolving existing records.

### Implementation Example

The following code demonstrates how to implement dynamic ENS record resolution:

```javascript
import { http, createPublicClient } from "viem";
import { sepolia } from "viem/chains";
import {
  encodeFunctionData,
  decodeAbiParameters,
  parseAbi,
  parseAbiParameters,
} from "viem";
import { createEnsPublicClient } from "@ensdomains/ensjs";
import { getRecords } from "@ensdomains/ensjs/public";

const rpc = "https://sepolia.drpc.org";

const ensClient = createEnsPublicClient({
  chain: sepolia,
  transport: http(rpc),
});

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(rpc),
});

const resolveAbi = parseAbi([
  "function resolve(bytes,bytes) view returns (bytes)",
]);
const recordsAbi = parseAbi(["function records() view returns (string[])"]);

function encodeName(name) {
  const labels = name.split(".");
  let result = "0x";

  for (const label of labels) {
    if (label.length > 0) {
      const labelBytes = Buffer.from(label).toString("hex");
      result += label.length.toString(16).padStart(2, "0") + labelBytes;
    }
  }

  result += "00";
  return result;
}

const getRecordsKeys = async (name) => {
  const resolverAddress = await ensClient.getResolver({
    name,
  });

  const request = encodeFunctionData({
    abi: recordsAbi,
    functionName: "records",
    args: [],
  });

  const response = await publicClient.readContract({
    address: resolverAddress,
    abi: resolveAbi,
    functionName: "resolve",
    args: [encodeName(name), request],
  });

  const recordsParams = parseAbiParameters(["string[]"]);
  const records = decodeAbiParameters(recordsParams, response)[0];

  return records;
};

const resolveRecords = async (name) => {
  const recordKeys = await getRecordsKeys(name);
  console.log("Available record keys:", recordKeys);

  const textRecords = [];
  const coinRecords = [];

  recordKeys.forEach((key) => {
    if (key.startsWith("text(")) {
      const textKey = key.slice(5, -1);
      textRecords.push(textKey);
    } else if (key.startsWith("addr(")) {
      const coinType = key.slice(5, -1);
      coinRecords.push(coinType);
    }
  });

  console.log("Text records to fetch:", textRecords);
  console.log("Coin records to fetch:", coinRecords);

  const result = await getRecords(ensClient, {
    name: name,
    texts: textRecords,
    coins: coinRecords,
    contentHash: true,
  });

  return result;
};
```

#### Usage

* **Get Available Records**: Call `getRecordsKeys(name)` to retrieve all available record types for an ENS name
* **Parse Record Types**: The function categorizes records into text records and coin/address records
* **Dynamic Resolution**: Use the discovered record keys to perform targeted resolution with `getRecords()`

# Forward Resolution

Resolve an ENS name into its address(es) and records. Given `vitalik.eth`, returns the address behind it, the avatar, the Twitter handle, and any other record. For the opposite direction (address → name), see [reverse-resolution.md](reverse-resolution.md "mention")

### Endpoint

```
GET /ens/v2/resolve
```

**Base URL:** `https://api.justaname.id`

### Quick start<br>

The endpoint is **free** when you supply your own RPC URL via the `rpcUrl` query parameter. No API key required. Rate-limited to 30 requests per 60 seconds per IP.

```bash
curl "https://api.justaname.id/ens/v2/resolve?ens=vitalik.eth&rpcUrl=https://eth.drpc.org"
```

```typescript
const url = new URL('https://api.justaname.id/ens/v2/resolve');
url.searchParams.append('ens', 'vitalik.eth');
url.searchParams.append('rpcUrl', process.env.RPC_URL!);

const res = await fetch(url);
```

The caller's RPC pays for the on-chain reads. JustaName performs resolution through the ENS Universal Resolver with CCIP-Read support and returns the decoded records.

> **Autonomous clients without an RPC URL** (AI agents, MCP servers, scripts) can pay per-request in USDC on Base instead of supplying `rpcUrl`. See [#programmatic-access-without-an-rpc-url](forward-resolution.md#programmatic-access-without-an-rpc-url "mention").

### Parameters

| Parameter | Type                  | Required  | Description                                                                                                                                                                                                  |
| --------- | --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ens`     | `string` (repeatable) | Yes       | ENS name to resolve. Repeat to batch up to **50** names (`?ens=a.eth&ens=b.eth`). Append `@<chain>` to scope to a single chain — see [#interop-addresses](forward-resolution.md#interop-addresses "mention") |
| `rpcUrl`  | `string`              | See below | HTTPS RPC URL used to perform the on-chain resolution.                                                                                                                                                       |

Either `rpcUrl` must be present **or** the request must carry a valid payment header. Without either, the endpoint returns `402` with a payment challenge — see [#programmatic-access-without-an-rpc-url](forward-resolution.md#programmatic-access-without-an-rpc-url "mention").

### Interop addresses

By default, resolution returns every address attached to the name across every chain in `records.addresses`. To scope the result to a single chain, append a chain suffix to the name:

| Format                 | Effect                              |
| ---------------------- | ----------------------------------- |
| `vitalik.eth`          | Returns all addresses on all chains |
| `vitalik.eth@ethereum` | Returns only the Ethereum address   |
| `vitalik.eth@eip155:1` | Returns only the Ethereum address   |

Both the human-readable chain name and the CAIP-2 form (`eip155:<chainId>`) are accepted. The suffix is per-name, so a batch can mix scoped and unscoped lookups:

```
?ens=vitalik.eth&ens=nick.eth@ethereum&rpcUrl=...
```

When a suffix is present, `records.addresses` contains at most one entry — the address for the requested chain, or an empty array if the name has no record for that chain.

### RPC URL requirements

* Must be HTTPS.
* Private, loopback, and link-local hosts are rejected.
* Embedded credentials (`https://user:pass@host`) are rejected.

### Response

Returns a single object when one `ens` is requested, or an array (in input order, `null` for hard-failed slots) when multiple are requested.

```ts
type ResolveResponse = {
  statusCode: number;
  result: {
    data: ResolveResult | (ResolveResult | null)[] | null;
    error: string | null;
  };
};

type ResolveResult = {
  ens: string;
  isClaimed?: boolean;
  claimedAt?: string | null;
  isJAN: boolean;
  viaUniversalResolver: boolean;
  records: {
    resolverAddress: string;
    texts: { key: string; value: string }[];
    addresses: { id: number; name: string; value: string }[];
    contentHash: { protocolType: string; decoded: string } | null;
  };
};
```

#### Single name

```json
{
  "statusCode": 200,
  "result": {
    "data": {
      "ens": "vitalik.eth",
      "isClaimed": false,
      "isJAN": false,
      "viaUniversalResolver": true,
      "records": {
        "resolverAddress": "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63",
        "texts": [
          { "key": "com.twitter", "value": "VitalikButerin" },
          { "key": "url", "value": "https://vitalik.ca" }
        ],
        "addresses": [
          { "id": 60, "name": "eth", "value": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
        ],
        "contentHash": null
      }
    },
    "error": null
  }
}
```

#### Batch

```json
{
  "statusCode": 200,
  "result": {
    "data": [
      { "ens": "vitalik.eth", "records": { "...": "..." }, "viaUniversalResolver": true, "isJAN": false },
      null,
      { "ens": "nick.eth", "records": { "...": "..." }, "viaUniversalResolver": true, "isJAN": false }
    ],
    "error": null
  }
}
```

### Behavior

* Resolution is performed through the on-chain ENS Universal Resolver with CCIP-Read support.
* The caller supplies the RPC URL — the service does not pay for the on-chain reads.
* Batch failures are localized: a hard-failed slot becomes `null` while the rest succeed.
* Unregistered names do **not** return `null`. Wildcard resolvers return an object with `records.addresses: []`.
* Duplicate names in a batch are not deduplicated — each slot is resolved independently.
* `viaUniversalResolver: true` confirms the ENSv2-ready resolver path was used.

### Reading records

Pull the L1 wallet, avatar, and a social handle from a batch result:

```ts
const url = new URL('https://api.justaname.id/ens/v2/resolve');
['vitalik.eth', 'nick.eth', 'ens.eth'].forEach((n) => url.searchParams.append('ens', n));
url.searchParams.append('rpcUrl', process.env.RPC_URL!);

const res = await fetch(url);

const { result } = (await res.json()) as ResolveResponse;
if (result.error) throw new Error(result.error);

const items = result.data as (ResolveResult | null)[];
for (const r of items) {
  if (!r) continue;
  const eth = r.records.addresses.find((a) => a.id === 60)?.value;
  const avatar = r.records.texts.find((t) => t.key === 'avatar')?.value;
  const twitter = r.records.texts.find((t) => t.key === 'com.twitter')?.value;
  console.log(r.ens, { eth, avatar, twitter });
}
```

### Errors

| Status        | When                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| `400`         | `rpcUrl` not HTTPS, has embedded credentials, or resolves to a private/loopback host. |
| `400`         | `ens` array empty or > 50 entries.                                                    |
| `429`         | Rate limit (30 req / 60 s per IP) exceeded. Body includes `retryAfterSeconds`.        |
| `502` / `504` | RPC provider error or CCIP-Read gateway timeout.                                      |

Payment-related statuses (`402`, `503`) are documented in the paid path section.

***

### Programmatic access without an RPC URL

For clients that don't manage their own RPC infrastructure — AI agents, MCP servers, autonomous scripts — the endpoint accepts per-request payment in place of `rpcUrl`. The service performs the on-chain reads and charges the caller in USDC on Base.

Two protocols are accepted on the same route. Clients pick whichever fits their stack:

* **x402 v2** — Coinbase's HTTP-payment protocol. See [x402.org](https://x402.org).
* **MPP-charge** — IETF Internet-Draft [`draft-httpauth-payment-00`](https://paymentauth.org/draft-httpauth-payment-00.html) with EVM method [`draft-evm-charge-00`](https://github.com/tempoxyz/mpp-specs). Co-authored by Tempo Labs and Stripe.

Both protocols settle identically — a signed EIP-3009 `transferWithAuthorization` submitted by a facilitator on Base. They differ only in HTTP envelope.

|           |                                                          |
| --------- | -------------------------------------------------------- |
| **Chain** | Base mainnet (`eip155:8453`)                             |
| **Asset** | USDC (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)      |
| **Price** | `1000` base units per request (0.001 USDC at 6 decimals) |

#### 402 challenge

A request without `rpcUrl` and without a payment header receives both challenges in one response. The headers are disjoint, so they coexist:

```
HTTP/1.1 402 Payment Required
Content-Type: application/json
PAYMENT-REQUIRED: <base64 JSON — x402 v2 challenge>
WWW-Authenticate: Payment id="<uuid>", realm="api.justaname.id", method="evm", intent="charge", request="<base64url-nopad JSON — MPP challenge>"
```

Decoded `PAYMENT-REQUIRED` (x402 v2):

```json
{
  "x402Version": 2,
  "resource": {
    "url": "https://api.justaname.id/ens/v2/resolve?ens=vitalik.eth",
    "mimeType": "application/json"
  },
  "accepts": [
    {
      "scheme": "exact",
      "network": "eip155:8453",
      "amount": "1000",
      "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      "payTo": "0x...",
      "maxTimeoutSeconds": 60
    }
  ],
  "extensions": { "bazaar": { "info": "...", "schema": "..." } },
  "error": "PAYMENT-SIGNATURE header is required"
}
```

Decoded `WWW-Authenticate` `request=` (MPP `draft-evm-charge-00`):

```json
{
  "network": "eip155:8453",
  "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "amount": "1000",
  "recipient": "0x...",
  "credentialTypes": ["eip3009"]
}
```

#### Paying

Sign an EIP-3009 `transferWithAuthorization` against the USDC contract on Base (e.g. `viem`'s `signTypedData` with `primaryType: "TransferWithAuthorization"` and a fresh 32-byte `nonce`). Wrap the signed message in either envelope and retry the request:

| Scheme     | Request header                                  | Receipt header (on 200)                   |
| ---------- | ----------------------------------------------- | ----------------------------------------- |
| x402 v2    | `PAYMENT-SIGNATURE: <base64 JSON>`              | `PAYMENT-RESPONSE: <base64 JSON>`         |
| MPP-charge | `Authorization: Payment <base64url-nopad JSON>` | `Payment-Receipt: <base64url-nopad JSON>` |

The facilitator submits the on-chain tx and pays gas — the payer only needs USDC, not ETH.

#### Idempotency, replay, validity

* Set `Idempotency-Key: <uuid>` on every retry. Without it, each retry is a fresh payment.
* `(nonce, recipient)` is locked in a 5-minute LRU. Always sign with a fresh random `nonce`.
* `validBefore` should be \~10 min from `now()`. Longer windows risk re-sending stale signatures past expiry.
* A retriable failure (facilitator transient error) returns `503` + `Retry-After`. Repeat the same request.
* A non-retriable failure (malformed payload, replay, network/asset mismatch) returns a fresh `402` with the reason in the challenge.

#### Discovery

* `GET /ens/v2/pricing` _(free)_ — JSON list of paid routes: `{ path, method, schemes, amount, asset, network, recipient }`.
* `GET /.well-known/x402.json` _(free)_ — x402 manifest (`services[]` + `accepts[]`) for catalog crawlers (Bazaar, x402scan).
* `GET /openapi.json` — OpenAPI document. Each paid operation carries `x-payment-info: { offers: [{ amount, currency, description, intent, method }] }` per `draft-payment-discovery-00`.

#### Payment-path errors

| Status | When                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `402`  | Request lacks `rpcUrl` and no payment header was supplied. `PAYMENT-REQUIRED` and `WWW-Authenticate` carry the challenge. |
| `402`  | Payment proof was malformed, replayed, expired, or targeted the wrong network/asset.                                      |
| `503`  | Facilitator transient error during verify/settle. `Retry-After` set; repeat the same request.                             |

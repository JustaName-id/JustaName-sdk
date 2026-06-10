# Reverse Resolution

Resolve an address into its ENS reverse record on a given chain. Given `0xd8dA6BF…`, returns `vitalik.eth` so you can show a name instead of a hex string. For the opposite direction (name → address and records), see [forward-resolution.md](forward-resolution.md "mention").

### Endpoint

```
GET /ens/v2/reverse
```

**Base URL:** `https://api.justaname.id`

### Quick start

The endpoint is **free** when you supply your own RPC URL via the `rpcUrl` query parameter. No API key required. Rate-limited to 30 requests per 60 seconds per IP.

```bash
curl "https://api.justaname.id/ens/v2/reverse?address=0xd8da6bf26964af9d7eed9e03e53415d37aa96045&coinType=60&rpcUrl=https://eth.drpc.org"
```

```ts
const url = new URL('https://api.justaname.id/ens/v2/reverse');
url.searchParams.append('address', '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
url.searchParams.set('coinType', '60');
url.searchParams.set('rpcUrl', process.env.RPC_URL!);

const res = await fetch(url);
```

To get the full profile in the same call, add `records=true`. The response then includes every record set on the resolved name (text records, addresses, contenthash) alongside it:

```bash
curl "https://api.justaname.id/ens/v2/reverse?address=0xd8da6bf26964af9d7eed9e03e53415d37aa96045&coinType=60&records=true&rpcUrl=https://eth.drpc.org"
```

\
\
The caller's RPC pays for the on-chain reads. JustaName performs the reverse lookup through the ENS Universal Resolver and falls back to its off-chain reverse-record store when no on-chain reverse record is set.

> **Autonomous clients without an RPC URL** (AI agents, MCP servers, scripts) can pay per-request in USDC on Base instead of supplying `rpcUrl`. See [#programmatic-access-without-an-rpc-url](reverse-resolution.md#programmatic-access-without-an-rpc-url "mention").

### Parameters

| Parameter  | Type                  | Required    | Description                                                                                                                                                                                                                                            |
| ---------- | --------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `address`  | `string` (repeatable) | Yes         | Address to reverse-resolve. Repeat to batch up to **50** addresses (`?address=0x…&address=0x…`). Plain (`0x…`) or interop-formatted — see [#interop-addresses](reverse-resolution.md#interop-addresses "mention").                                     |
| `coinType` | `number`              | Conditional | ENSIP-19 coinType — see [#cointype-reference](reverse-resolution.md#cointype-reference "mention"). Required for plain addresses; optional when every address in the batch carries an interop suffix.                                                   |
| `rpcUrl`   | `string`              | See below   | HTTPS RPC URL used to perform the on-chain resolution.                                                                                                                                                                                                 |
| `records`  | `boolean`             | No          | Default `false`. When `true`, fetches all records set on each resolved name (text records, addresses, contenthash) and returns them in the response. Applies to every address in a batch. Skipped for addresses with no reverse record (`name: null`). |

Either `rpcUrl` must be present **or** the request must carry a valid payment header. Without either, the endpoint returns `402` with a payment challenge — see [#programmatic-access-without-an-rpc-url](reverse-resolution.md#programmatic-access-without-an-rpc-url "mention").

### Interop addresses

By default, the request-level `coinType` applies to every address in the batch. To override per-slot — for example, when batching addresses across different chains — append a chain suffix to the address:

| Format                             | Effect                                     |
| ---------------------------------- | ------------------------------------------ |
| `0xd8dA…6045` (with `coinType=60`) | Reverse on Ethereum                        |
| `0xd8dA…6045@ethereum`             | Reverse on Ethereum (overrides `coinType`) |
| `0xd8dA…6045@eip155:1`             | Reverse on Ethereum (overrides `coinType`) |
| `0xbbb…@eip155:8453`               | Reverse on Base                            |

Both the human-readable chain name and the CAIP-2 form (`eip155:<chainId>`) are accepted. The suffix is per-address, so a batch can mix suffixed and request-level-scoped slots:

```
?address=0xaaa…@eip155:1&address=0xbbb…@eip155:8453&address=0xccc…&coinType=10&rpcUrl=...
```

When every address in the batch carries a suffix, the request-level `coinType` becomes optional.

### RPC URL requirements

Same as Forward Resolution: HTTPS only, no private/loopback/link-local hosts, no embedded credentials.

### coinType reference

ENSIP-19 coinTypes follow the formula `0x80000000 | chainId` for EVM L2 primaries. Ethereum mainnet is the exception (`60`).

| Chain                              | Decimal      | Hex          |
| ---------------------------------- | ------------ | ------------ |
| Ethereum mainnet                   | `60`         | `0x3c`       |
| Optimism                           | `2147483658` | `0x8000000a` |
| Base                               | `2147492837` | `0x80002105` |
| Arbitrum One                       | `2147525809` | `0x8000a4b1` |
| ENSIP-19 default (step-2 fallback) | `2147483648` | `0x80000000` |

### Response

Returns a single object when one `address` is requested, or an array of slot-level objects (with per-slot `error`) when multiple are requested.

```ts
type ReverseResponse = {
  statusCode: number;
  result: {
    data: ReverseResult | ReverseBatchResult[] | null;
    error: string | null;
  };
};

type ReverseResult = {
  address: string;
  name: string | null;
  coinType: number;
  viaUniversalResolver: boolean;
};

type ReverseBatchResult = {
  address: string;
  name: string | null;
  coinType: number | null;
  viaUniversalResolver: boolean;
  error: string | null;
};
```

#### Single address

```json
{
  "statusCode": 200,
  "result": {
    "data": {
      "address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      "name": "vitalik.eth",
      "coinType": 60,
      "viaUniversalResolver": true
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
      {
        "address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
        "name": "vitalik.eth",
        "coinType": 60,
        "viaUniversalResolver": true,
        "error": null
      },
      {
        "address": "0xb965a5f3a0fc18d84e68883ccad508445a7917a8",
        "name": null,
        "coinType": null,
        "viaUniversalResolver": true,
        "error": "coinType is required for plain addresses"
      }
    ],
    "error": null
  }
}
```

### Behavior

For each address, a 3-step fallback chain is walked. The first hit wins:

1. On-chain reverse lookup with the supplied `coinType` (or the coinType derived from the interop suffix).
2. On-chain reverse lookup with the ENSIP-19 default coinType (`0x80000000`) — covers L2 names with a chain-agnostic reverse record.
3. JustaName off-chain reverse-record store.

Other notes:

* `viaUniversalResolver: true` → resolved on-chain (step 1 or 2). `viaUniversalResolver: false` → resolved from the JustaName off-chain store (step 3).
* `name: null` is a normal outcome (most addresses do not have a reverse record set), not a failure.
* In batch mode, slot failures are localized: the slot returns `name: null` with a populated `error`, and the rest of the batch succeeds.
* For batch slots that fail preflight (malformed interop suffix, unsupported chain label, missing `coinType` for a plain address), `coinType` is `null`.

### Labelling a multi-chain list

```ts
const inputs = [
  '0xaaa...@eip155:1',     // mainnet
  '0xbbb...@eip155:8453',  // Base
  '0xccc...@eip155:10',    // Optimism
];

const url = new URL('https://api.justaname.id/ens/v2/reverse');
inputs.forEach((a) => url.searchParams.append('address', a));
url.searchParams.set('rpcUrl', process.env.RPC_URL!);

const res = await fetch(url);

const { result } = (await res.json()) as ReverseResponse;
if (result.error) throw new Error(result.error);

const items = result.data as ReverseBatchResult[];
for (const item of items) {
  if (item.error) {
    console.warn(item.address, item.error);
    continue;
  }
  console.log(item.address, '→', item.name ?? '(no reverse record)');
}
```

### Errors

| Status        | When                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| `400`         | `rpcUrl` not HTTPS, has embedded credentials, or resolves to a private/loopback host. |
| `400`         | `address` malformed (not `0x[40-hex]` optionally followed by `@<chain>`).             |
| `400`         | `address` array empty or > 50 entries.                                                |
| `400`         | Single-address request with a plain address and no `coinType`.                        |
| `400`         | Unknown chain label in the interop suffix.                                            |
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
    "url": "https://api.justaname.id/ens/v2/reverse?address=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045&coinType=60",
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

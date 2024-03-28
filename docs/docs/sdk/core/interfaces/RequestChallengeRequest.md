---
id: "RequestChallengeRequest"
title: "Interface: RequestChallengeRequest"
sidebar_label: "RequestChallengeRequest"
sidebar_position: 0
custom_edit_url: null
---

Represents a request to challenge a specific address using SIWE.
 RequestChallengeRequest

## Hierarchy

- [`IRequest`](IRequest.md)

  ↳ **`RequestChallengeRequest`**

## Properties

### address

• **address**: `string`

Represents the ethereum address to be challenged.

#### Defined in

[lib/types/siwe/request-challenge.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/45e45ce/packages/@justaname.id/sdk/src/lib/types/siwe/request-challenge.ts#L21)

___

### chainId

• **chainId**: [`ChainId`](../modules.md#chainid)

Represents the chainId of the blockchain to be used.

#### Defined in

[lib/types/siwe/request-challenge.ts:31](https://github.com/JustaName-id/JustaName-sdk/blob/45e45ce/packages/@justaname.id/sdk/src/lib/types/siwe/request-challenge.ts#L31)

___

### domain

• **domain**: `string`

Represents the ENS domain

#### Defined in

[lib/types/siwe/request-challenge.ts:14](https://github.com/JustaName-id/JustaName-sdk/blob/45e45ce/packages/@justaname.id/sdk/src/lib/types/siwe/request-challenge.ts#L14)

___

### origin

• **origin**: `string`

Represents the origin of the request (e.g. the domain of the website).

#### Defined in

[lib/types/siwe/request-challenge.ts:26](https://github.com/JustaName-id/JustaName-sdk/blob/45e45ce/packages/@justaname.id/sdk/src/lib/types/siwe/request-challenge.ts#L26)

___

### ttl

• `Optional` **ttl**: `number`

Specifies the time-to-live (TTL) for a variable.
default: 120000 ms, 2 minutes ( 2 * 60 * 1000 )

**`Default`**

```ts
120000
```

**`Optional`**

#### Defined in

[lib/types/siwe/request-challenge.ts:39](https://github.com/JustaName-id/JustaName-sdk/blob/45e45ce/packages/@justaname.id/sdk/src/lib/types/siwe/request-challenge.ts#L39)

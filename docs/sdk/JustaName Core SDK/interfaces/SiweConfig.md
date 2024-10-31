[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / SiweConfig

# Interface: SiweConfig

## Properties

### chainId

> **chainId**: [`ChainId`](../type-aliases/ChainId.md)

Represents the chainId of the blockchain to be used.

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/siwe/siwe-config.ts:18](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/siwe/siwe-config.ts#L18)

***

### domain

> **domain**: `string`

Represents the ENS domain

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/siwe/siwe-config.ts:8](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/siwe/siwe-config.ts#L8)

***

### origin

> **origin**: `string`

Represents the origin of the request (e.g. the domain of the website).

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/siwe/siwe-config.ts:13](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/siwe/siwe-config.ts#L13)

***

### ttl?

> `optional` **ttl**: `number`

Specifies the time-to-live (TTL) for a variable.
default: 120000 ms, 2 minutes ( 2 * 60 * 1000 )

#### Default

```ts
120000
```

#### Optional

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/siwe/siwe-config.ts:26](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/siwe/siwe-config.ts#L26)

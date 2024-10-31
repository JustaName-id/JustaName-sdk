[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / RequestAppendMAppFieldChallengeRequest

# Interface: RequestAppendMAppFieldChallengeRequest

Represents a request to challenge to add mApp permission.
 RequestAppendMAppFieldChallengeRequest

## Extends

- [`IRequest`](IRequest.md)

## Properties

### address

> **address**: `string`

Represents the ethereum address to be challenged.

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts#L21)

***

### chainId

> **chainId**: [`ChainId`](../type-aliases/ChainId.md)

Represents the chainId of the blockchain to be used.

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts:33](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts#L33)

***

### domain

> **domain**: `string`

Represents the ENS domain

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts:15](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts#L15)

***

### mApp

> **mApp**: `string`

Subname requesting the MApps Permission

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts:54](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts#L54)

***

### origin

> **origin**: `string`

Represents the origin of the request (e.g. the domain of the website).

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts:27](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts#L27)

***

### subname

> **subname**: `string`

Subname requesting the ABDC Permission

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts#L48)

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

[packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts:42](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/siwe/append-mApp-field-challenge.ts#L42)

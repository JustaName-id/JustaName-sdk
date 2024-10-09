[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / RequestSignInParams

# Interface: RequestSignInParams

## Extends

- `Omit`\<`SiwensParams`, `"domain"` \| `"origin"` \| `"chainId"`\>

## Properties

### address?

> `optional` **address**: `string`

Ethereum address performing the signing conformant to capitalization
encoded checksum specified in EIP-55 where applicable.

#### Inherited from

`Omit.address`

#### Defined in

node\_modules/siwe/dist/client.d.ts:10

***

### chainId?

> `optional` **chainId**: [`ChainId`](../type-aliases/ChainId.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/signin/index.ts:9](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/types/signin/index.ts#L9)

***

### domain?

> `optional` **domain**: `string`

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/signin/index.ts:8](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/types/signin/index.ts#L8)

***

### ens

> **ens**: `string`

#### Inherited from

`Omit.ens`

#### Defined in

packages/@justaname.id/siwens/dist/src/lib/siwens/siwens.d.ts:7

***

### expirationTime?

> `optional` **expirationTime**: `string`

ISO 8601 datetime string that, if present, indicates when the signed
authentication message is no longer valid.

#### Inherited from

`Omit.expirationTime`

#### Defined in

packages/@justaname.id/siwens/dist/src/lib/siwens/siwens.d.ts:9

***

### issuedAt?

> `optional` **issuedAt**: `string`

ISO 8601 datetime string of the current time.

#### Inherited from

`Omit.issuedAt`

#### Defined in

packages/@justaname.id/siwens/dist/src/lib/siwens/siwens.d.ts:10

***

### nonce?

> `optional` **nonce**: `string`

Randomized token used to prevent replay attacks, at least 8 alphanumeric
characters.

#### Inherited from

`Omit.nonce`

#### Defined in

node\_modules/siwe/dist/client.d.ts:24

***

### notBefore?

> `optional` **notBefore**: `string`

ISO 8601 datetime string that, if present, indicates when the signed
authentication message will become valid.

#### Inherited from

`Omit.notBefore`

#### Defined in

node\_modules/siwe/dist/client.d.ts:32

***

### origin?

> `optional` **origin**: `string`

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/signin/index.ts:7](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/types/signin/index.ts#L7)

***

### requestId?

> `optional` **requestId**: `string`

System-specific identifier that may be used to uniquely refer to the
sign-in request.

#### Inherited from

`Omit.requestId`

#### Defined in

node\_modules/siwe/dist/client.d.ts:35

***

### resources?

> `optional` **resources**: `string`[]

List of information or references to information the user wishes to have
resolved as part of authentication by the relying party. They are
expressed as RFC 3986 URIs separated by `\n- `.

#### Inherited from

`Omit.resources`

#### Defined in

node\_modules/siwe/dist/client.d.ts:39

***

### scheme?

> `optional` **scheme**: `string`

RFC 3986 URI scheme for the authority that is requesting the signing.

#### Inherited from

`Omit.scheme`

#### Defined in

node\_modules/siwe/dist/client.d.ts:5

***

### statement?

> `optional` **statement**: `string`

Human-readable ASCII assertion that the user will sign, and it must not
contain `\n`.

#### Inherited from

`Omit.statement`

#### Defined in

node\_modules/siwe/dist/client.d.ts:13

***

### ttl?

> `optional` **ttl**: `number`

#### Overrides

`Omit.ttl`

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/signin/index.ts:10](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/types/signin/index.ts#L10)

***

### uri?

> `optional` **uri**: `string`

RFC 3986 URI referring to the resource that is the subject of the signing
 (as in the __subject__ of a claim).

#### Inherited from

`Omit.uri`

#### Defined in

node\_modules/siwe/dist/client.d.ts:16

***

### version?

> `optional` **version**: `string`

Current version of the message.

#### Inherited from

`Omit.version`

#### Defined in

node\_modules/siwe/dist/client.d.ts:18

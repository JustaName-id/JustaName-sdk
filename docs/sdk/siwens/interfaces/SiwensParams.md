[**@justaname.id/siwens**](../README.md) • **Docs**

***

[@justaname.id/siwens](../globals.md) / SiwensParams

# Interface: SiwensParams

## Extends

- `Partial`\<`Omit`\<`SiweMessage`, `"toMessage"` \| `"prepareMessage"` \| `"verify"` \| `"validate"`\>\>

## Properties

### address?

> `optional` **address**: `string`

Ethereum address performing the signing conformant to capitalization
encoded checksum specified in EIP-55 where applicable.

#### Inherited from

`Partial.address`

#### Defined in

node\_modules/siwe/dist/client.d.ts:10

***

### chainId?

> `optional` **chainId**: `number`

EIP-155 Chain ID to which the session is bound, and the network where
Contract Accounts must be resolved.

#### Inherited from

`Partial.chainId`

#### Defined in

node\_modules/siwe/dist/client.d.ts:21

***

### domain?

> `optional` **domain**: `string`

RFC 4501 dns authority that is requesting the signing.

#### Inherited from

`Partial.domain`

#### Defined in

node\_modules/siwe/dist/client.d.ts:7

***

### ens

> **ens**: `string`

#### Defined in

[packages/@justaname.id/siwens/src/lib/siwens/siwens.ts:16](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/siwens/src/lib/siwens/siwens.ts#L16)

***

### expirationTime?

> `optional` **expirationTime**: `string`

ISO 8601 datetime string that, if present, indicates when the signed
authentication message is no longer valid.

#### Overrides

`Partial.expirationTime`

#### Defined in

[packages/@justaname.id/siwens/src/lib/siwens/siwens.ts:18](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/siwens/src/lib/siwens/siwens.ts#L18)

***

### issuedAt?

> `optional` **issuedAt**: `string`

ISO 8601 datetime string of the current time.

#### Overrides

`Partial.issuedAt`

#### Defined in

[packages/@justaname.id/siwens/src/lib/siwens/siwens.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/siwens/src/lib/siwens/siwens.ts#L19)

***

### nonce?

> `optional` **nonce**: `string`

Randomized token used to prevent replay attacks, at least 8 alphanumeric
characters.

#### Inherited from

`Partial.nonce`

#### Defined in

node\_modules/siwe/dist/client.d.ts:24

***

### notBefore?

> `optional` **notBefore**: `string`

ISO 8601 datetime string that, if present, indicates when the signed
authentication message will become valid.

#### Inherited from

`Partial.notBefore`

#### Defined in

node\_modules/siwe/dist/client.d.ts:32

***

### requestId?

> `optional` **requestId**: `string`

System-specific identifier that may be used to uniquely refer to the
sign-in request.

#### Inherited from

`Partial.requestId`

#### Defined in

node\_modules/siwe/dist/client.d.ts:35

***

### resources?

> `optional` **resources**: `string`[]

List of information or references to information the user wishes to have
resolved as part of authentication by the relying party. They are
expressed as RFC 3986 URIs separated by `\n- `.

#### Inherited from

`Partial.resources`

#### Defined in

node\_modules/siwe/dist/client.d.ts:39

***

### scheme?

> `optional` **scheme**: `string`

RFC 3986 URI scheme for the authority that is requesting the signing.

#### Inherited from

`Partial.scheme`

#### Defined in

node\_modules/siwe/dist/client.d.ts:5

***

### statement?

> `optional` **statement**: `string`

Human-readable ASCII assertion that the user will sign, and it must not
contain `\n`.

#### Inherited from

`Partial.statement`

#### Defined in

node\_modules/siwe/dist/client.d.ts:13

***

### ttl?

> `optional` **ttl**: `number`

#### Defined in

[packages/@justaname.id/siwens/src/lib/siwens/siwens.ts:17](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/siwens/src/lib/siwens/siwens.ts#L17)

***

### uri?

> `optional` **uri**: `string`

RFC 3986 URI referring to the resource that is the subject of the signing
 (as in the __subject__ of a claim).

#### Inherited from

`Partial.uri`

#### Defined in

node\_modules/siwe/dist/client.d.ts:16

***

### version?

> `optional` **version**: `string`

Current version of the message.

#### Inherited from

`Partial.version`

#### Defined in

node\_modules/siwe/dist/client.d.ts:18

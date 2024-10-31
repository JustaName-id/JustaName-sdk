[**@justaname.id/siwens**](../README.md) • **Docs**

***

[@justaname.id/siwens](../globals.md) / SIWENS

# Class: SIWENS

## Extends

- `SiweMessage`

## Constructors

### new SIWENS()

> **new SIWENS**(`signInConfig`): [`SIWENS`](SIWENS.md)

#### Parameters

• **signInConfig**: [`SiwensConfig`](../interfaces/SiwensConfig.md)

#### Returns

[`SIWENS`](SIWENS.md)

#### Overrides

`SiweMessage.constructor`

#### Defined in

[packages/@justaname.id/siwens/src/lib/siwens/siwens.ts:30](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/siwens/src/lib/siwens/siwens.ts#L30)

## Properties

### address

> **address**: `string`

Ethereum address performing the signing conformant to capitalization
encoded checksum specified in EIP-55 where applicable.

#### Inherited from

`SiweMessage.address`

#### Defined in

node\_modules/siwe/dist/client.d.ts:10

***

### chainId

> **chainId**: `number`

EIP-155 Chain ID to which the session is bound, and the network where
Contract Accounts must be resolved.

#### Inherited from

`SiweMessage.chainId`

#### Defined in

node\_modules/siwe/dist/client.d.ts:21

***

### domain

> **domain**: `string`

RFC 4501 dns authority that is requesting the signing.

#### Inherited from

`SiweMessage.domain`

#### Defined in

node\_modules/siwe/dist/client.d.ts:7

***

### expirationTime?

> `optional` **expirationTime**: `string`

ISO 8601 datetime string that, if present, indicates when the signed
authentication message is no longer valid.

#### Inherited from

`SiweMessage.expirationTime`

#### Defined in

node\_modules/siwe/dist/client.d.ts:29

***

### issuedAt?

> `optional` **issuedAt**: `string`

ISO 8601 datetime string of the current time.

#### Inherited from

`SiweMessage.issuedAt`

#### Defined in

node\_modules/siwe/dist/client.d.ts:26

***

### nonce

> **nonce**: `string`

Randomized token used to prevent replay attacks, at least 8 alphanumeric
characters.

#### Inherited from

`SiweMessage.nonce`

#### Defined in

node\_modules/siwe/dist/client.d.ts:24

***

### notBefore?

> `optional` **notBefore**: `string`

ISO 8601 datetime string that, if present, indicates when the signed
authentication message will become valid.

#### Inherited from

`SiweMessage.notBefore`

#### Defined in

node\_modules/siwe/dist/client.d.ts:32

***

### provider

> `readonly` **provider**: `JsonRpcProvider`

#### Defined in

[packages/@justaname.id/siwens/src/lib/siwens/siwens.ts:28](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/siwens/src/lib/siwens/siwens.ts#L28)

***

### requestId?

> `optional` **requestId**: `string`

System-specific identifier that may be used to uniquely refer to the
sign-in request.

#### Inherited from

`SiweMessage.requestId`

#### Defined in

node\_modules/siwe/dist/client.d.ts:35

***

### resources?

> `optional` **resources**: `string`[]

List of information or references to information the user wishes to have
resolved as part of authentication by the relying party. They are
expressed as RFC 3986 URIs separated by `\n- `.

#### Inherited from

`SiweMessage.resources`

#### Defined in

node\_modules/siwe/dist/client.d.ts:39

***

### scheme?

> `optional` **scheme**: `string`

RFC 3986 URI scheme for the authority that is requesting the signing.

#### Inherited from

`SiweMessage.scheme`

#### Defined in

node\_modules/siwe/dist/client.d.ts:5

***

### statement?

> `optional` **statement**: `string`

Human-readable ASCII assertion that the user will sign, and it must not
contain `\n`.

#### Inherited from

`SiweMessage.statement`

#### Defined in

node\_modules/siwe/dist/client.d.ts:13

***

### uri

> **uri**: `string`

RFC 3986 URI referring to the resource that is the subject of the signing
 (as in the __subject__ of a claim).

#### Inherited from

`SiweMessage.uri`

#### Defined in

node\_modules/siwe/dist/client.d.ts:16

***

### version

> **version**: `string`

Current version of the message.

#### Inherited from

`SiweMessage.version`

#### Defined in

node\_modules/siwe/dist/client.d.ts:18

## Methods

### prepareMessage()

> **prepareMessage**(): `string`

This method parses all the fields in the object and creates a messaging for signing
message according with the type defined.

#### Returns

`string`

Returns a message ready to be signed according with the
type defined in the object.

#### Inherited from

`SiweMessage.prepareMessage`

#### Defined in

node\_modules/siwe/dist/client.d.ts:62

***

### toMessage()

> **toMessage**(): `string`

This function can be used to retrieve an EIP-4361 formated message for
signature, although you can call it directly it's advised to use
[prepareMessage()] instead which will resolve to the correct method based
on the [type] attribute of this object, in case of other formats being
implemented.

#### Returns

`string`

EIP-4361 formated message, ready for EIP-191 signing.

#### Inherited from

`SiweMessage.toMessage`

#### Defined in

node\_modules/siwe/dist/client.d.ts:55

***

### ~~validate()~~

> **validate**(`signature`, `provider`?): `Promise`\<`SiweMessage`\>

#### Parameters

• **signature**: `string`

Signature to match the address in the message.

• **provider?**: `Provider`

Ethers provider to be used for EIP-1271 validation

#### Returns

`Promise`\<`SiweMessage`\>

#### Deprecated

Verifies the integrity of the object by matching its signature.

#### Inherited from

`SiweMessage.validate`

#### Defined in

node\_modules/siwe/dist/client.d.ts:69

***

### verify()

> **verify**(`params`, `opts`?): `Promise`\<[`SiwensResponse`](../interfaces/SiwensResponse.md)\>

Verifies the integrity of the object by matching its signature.

#### Parameters

• **params**: `VerifyParams`

Parameters to verify the integrity of the message, signature is required.

• **opts?**: `VerifyOpts`

#### Returns

`Promise`\<[`SiwensResponse`](../interfaces/SiwensResponse.md)\>

This object if valid.

#### Overrides

`SiweMessage.verify`

#### Defined in

[packages/@justaname.id/siwens/src/lib/siwens/siwens.ts:74](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/siwens/src/lib/siwens/siwens.ts#L74)

***

### generateIssuedAndExpirationTime()

> `static` **generateIssuedAndExpirationTime**(`ttl`): `object`

#### Parameters

• **ttl**: `number`

#### Returns

`object`

##### expirationTime

> **expirationTime**: `string`

##### issuedAt

> **issuedAt**: `string`

#### Defined in

[packages/@justaname.id/siwens/src/lib/siwens/siwens.ts:105](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/siwens/src/lib/siwens/siwens.ts#L105)

***

### generateNonce()

> `static` **generateNonce**(): `string`

#### Returns

`string`

#### Defined in

[packages/@justaname.id/siwens/src/lib/siwens/siwens.ts:115](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/siwens/src/lib/siwens/siwens.ts#L115)

# UseEnsSignInParams

[**@justaname.id/react**](../) • **Docs**

***

[@justaname.id/react](../globals.md) / UseEnsSignInParams

## Interface: UseEnsSignInParams

### Extends

* `Omit`<[`UseEnsSignInFunctionParams`](../type-aliases/UseEnsSignInFunctionParams.md), `"ens"`>

### Properties

#### backendUrl?

> `optional` **backendUrl**: `string`

**Defined in**

[packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignIn.ts:18](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignIn.ts#L18)

***

#### chainId?

> `optional` **chainId**: `ChainId`

**Inherited from**

`Omit.chainId`

**Defined in**

packages/@justaname.id/sdk/dist/src/lib/types/signin/index.d.ts:7

***

#### currentEnsRoute?

> `optional` **currentEnsRoute**: `string`

**Defined in**

[packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignIn.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignIn.ts#L21)

***

#### domain?

> `optional` **domain**: `string`

**Inherited from**

`Omit.domain`

**Defined in**

packages/@justaname.id/sdk/dist/src/lib/types/signin/index.d.ts:6

***

#### expirationTime?

> `optional` **expirationTime**: `string`

ISO 8601 datetime string that, if present, indicates when the signed authentication message is no longer valid.

**Inherited from**

`Omit.expirationTime`

**Defined in**

packages/@justaname.id/siwens/dist/src/lib/siwens/siwens.d.ts:9

***

#### issuedAt?

> `optional` **issuedAt**: `string`

ISO 8601 datetime string of the current time.

**Inherited from**

`Omit.issuedAt`

**Defined in**

packages/@justaname.id/siwens/dist/src/lib/siwens/siwens.d.ts:10

***

#### notBefore?

> `optional` **notBefore**: `string`

ISO 8601 datetime string that, if present, indicates when the signed authentication message will become valid.

**Inherited from**

`Omit.notBefore`

**Defined in**

node\_modules/siwe/dist/client.d.ts:32

***

#### origin?

> `optional` **origin**: `string`

**Inherited from**

`Omit.origin`

**Defined in**

packages/@justaname.id/sdk/dist/src/lib/types/signin/index.d.ts:5

***

#### requestId?

> `optional` **requestId**: `string`

System-specific identifier that may be used to uniquely refer to the sign-in request.

**Inherited from**

`Omit.requestId`

**Defined in**

node\_modules/siwe/dist/client.d.ts:35

***

#### resources?

> `optional` **resources**: `string`\[]

List of information or references to information the user wishes to have resolved as part of authentication by the relying party. They are expressed as RFC 3986 URIs separated by `\n-` .

**Inherited from**

`Omit.resources`

**Defined in**

node\_modules/siwe/dist/client.d.ts:39

***

#### scheme?

> `optional` **scheme**: `string`

RFC 3986 URI scheme for the authority that is requesting the signing.

**Inherited from**

`Omit.scheme`

**Defined in**

node\_modules/siwe/dist/client.d.ts:5

***

#### signinNonceRoute?

> `optional` **signinNonceRoute**: `string`

**Defined in**

[packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignIn.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignIn.ts#L19)

***

#### signinRoute?

> `optional` **signinRoute**: `string`

**Defined in**

[packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignIn.ts:20](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/signIn/useEnsSignIn.ts#L20)

***

#### statement?

> `optional` **statement**: `string`

Human-readable ASCII assertion that the user will sign, and it must not contain .

**Inherited from**

`Omit.statement`

**Defined in**

node\_modules/siwe/dist/client.d.ts:13

***

#### ttl?

> `optional` **ttl**: `number`

**Inherited from**

`Omit.ttl`

**Defined in**

packages/@justaname.id/sdk/dist/src/lib/types/signin/index.d.ts:8

***

#### uri?

> `optional` **uri**: `string`

RFC 3986 URI referring to the resource that is the subject of the signing (as in the **subject** of a claim).

**Inherited from**

`Omit.uri`

**Defined in**

node\_modules/siwe/dist/client.d.ts:16

***

#### version?

> `optional` **version**: `string`

Current version of the message.

**Inherited from**

`Omit.version`

**Defined in**

node\_modules/siwe/dist/client.d.ts:18

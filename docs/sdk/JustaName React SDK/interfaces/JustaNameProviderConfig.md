[**@justaname.id/react**](../README.md) • **Docs**

***

[@justaname.id/react](../globals.md) / JustaNameProviderConfig

# Interface: JustaNameProviderConfig

## Extends

- [`JustaNameConfigWithoutDefaultChainId`](../type-aliases/JustaNameConfigWithoutDefaultChainId.md)

## Properties

### backendUrl?

> `optional` **backendUrl**: `string`

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:72](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L72)

***

### config?

> `optional` **config**: `Configuration`

#### Inherited from

`JustaNameConfigWithoutDefaultChainId.config`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/justaname/configuration.d.ts:28

***

### dev?

> `optional` **dev**: `boolean`

#### Inherited from

`JustaNameConfigWithoutDefaultChainId.dev`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/justaname/configuration.d.ts:32

***

### ensDomains?

> `optional` **ensDomains**: `EnsDomains`

#### Inherited from

`JustaNameConfigWithoutDefaultChainId.ensDomains`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/justaname/configuration.d.ts:30

***

### networks?

> `optional` **networks**: `Networks`

#### Inherited from

`JustaNameConfigWithoutDefaultChainId.networks`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/justaname/configuration.d.ts:29

***

### routes?

> `optional` **routes**: `Partial`\<`object`\>

#### Type declaration

##### addSubnameRoute

> **addSubnameRoute**: `string` = `'/api/subnames/add'`

##### currentEnsRoute

> **currentEnsRoute**: `string` = `'/api/current'`

##### revokeSubnameRoute

> **revokeSubnameRoute**: `string` = `'/api/subnames/revoke'`

##### signinNonceRoute

> **signinNonceRoute**: `string` = `'/api/signin/nonce'`

##### signinRoute

> **signinRoute**: `string` = `'/api/signin'`

##### signoutRoute

> **signoutRoute**: `string` = `'/api/signout'`

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:71](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L71)

***

### signOnMounted?

> `optional` **signOnMounted**: `boolean`

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:73](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L73)

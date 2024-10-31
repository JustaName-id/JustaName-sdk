[**@justaname.id/react**](../README.md) • **Docs**

***

[@justaname.id/react](../globals.md) / JustaNameContextProps

# Interface: JustaNameContextProps

## Extends

- `Omit`\<`JustaNameConfigDefaults`, `"defaultChainId"`\>

## Properties

### backendUrl?

> `optional` **backendUrl**: `string`

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:54](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L54)

***

### chainId

> **chainId**: `undefined` \| `ChainId`

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:57](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L57)

***

### config?

> `optional` **config**: `Configuration`

#### Inherited from

`Omit.config`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/justaname/configuration.d.ts:28

***

### dev?

> `optional` **dev**: `boolean`

#### Inherited from

`Omit.dev`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/justaname/configuration.d.ts:32

***

### ensDomains

> **ensDomains**: `EnsDomainByChainId`[]

#### Inherited from

`Omit.ensDomains`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/justaname/configuration.d.ts:36

***

### justaname

> **justaname**: `JustaName`

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:52](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L52)

***

### justanameConfig

> **justanameConfig**: [`JustaNameProviderConfig`](JustaNameProviderConfig.md)

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:50](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L50)

***

### networks

> **networks**: `NetworksWithProvider`

#### Inherited from

`Omit.networks`

#### Defined in

packages/@justaname.id/sdk/dist/src/lib/types/justaname/configuration.d.ts:35

***

### routes

> **routes**: `object`

#### addSubnameRoute

> **addSubnameRoute**: `string` = `'/api/subnames/add'`

#### currentEnsRoute

> **currentEnsRoute**: `string` = `'/api/current'`

#### revokeSubnameRoute

> **revokeSubnameRoute**: `string` = `'/api/subnames/revoke'`

#### signinNonceRoute

> **signinNonceRoute**: `string` = `'/api/signin/nonce'`

#### signinRoute

> **signinRoute**: `string` = `'/api/signin'`

#### signoutRoute

> **signoutRoute**: `string` = `'/api/signout'`

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:53](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L53)

***

### selectedEnsDomain

> **selectedEnsDomain**: `undefined` \| `string`

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:56](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L56)

***

### selectedNetwork

> **selectedNetwork**: `NetworkWithProvider`\<`ChainId`\>

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:55](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L55)

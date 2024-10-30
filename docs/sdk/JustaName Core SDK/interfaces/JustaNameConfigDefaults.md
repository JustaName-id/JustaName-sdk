[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / JustaNameConfigDefaults

# Interface: JustaNameConfigDefaults\<NetworksWithProviderConfig\>

## Extends

- [`JustaNameConfig`](JustaNameConfig.md)\<[`Configuration`](Configuration.md), `NetworksWithProviderConfig`, [`EnsDomainByChainId`](EnsDomainByChainId.md)[]\>

## Type Parameters

• **NetworksWithProviderConfig** *extends* [`NetworksWithProvider`](../type-aliases/NetworksWithProvider.md) = [`NetworksWithProvider`](../type-aliases/NetworksWithProvider.md)

## Properties

### config?

> `optional` **config**: [`Configuration`](Configuration.md)

#### Inherited from

[`JustaNameConfig`](JustaNameConfig.md).[`config`](JustaNameConfig.md#config)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/justaname/configuration.ts:42](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/justaname/configuration.ts#L42)

***

### defaultChainId?

> `optional` **defaultChainId**: [`ChainId`](../type-aliases/ChainId.md)

#### Inherited from

[`JustaNameConfig`](JustaNameConfig.md).[`defaultChainId`](JustaNameConfig.md#defaultchainid)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/justaname/configuration.ts:45](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/justaname/configuration.ts#L45)

***

### dev?

> `optional` **dev**: `boolean`

#### Inherited from

[`JustaNameConfig`](JustaNameConfig.md).[`dev`](JustaNameConfig.md#dev)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/justaname/configuration.ts:46](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/justaname/configuration.ts#L46)

***

### ensDomains

> **ensDomains**: [`EnsDomainByChainId`](EnsDomainByChainId.md)[]

#### Overrides

[`JustaNameConfig`](JustaNameConfig.md).[`ensDomains`](JustaNameConfig.md#ensdomains)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/justaname/configuration.ts:57](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/justaname/configuration.ts#L57)

***

### networks

> **networks**: `NetworksWithProviderConfig`

#### Overrides

[`JustaNameConfig`](JustaNameConfig.md).[`networks`](JustaNameConfig.md#networks)

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/justaname/configuration.ts:56](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/justaname/configuration.ts#L56)

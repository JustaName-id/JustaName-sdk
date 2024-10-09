[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / JustaName

# Class: JustaName

The main class for the JustaName SDK.

## Classdesc

The main class for the JustaName SDK.

## Example

```typescript
import { JustaName } from '@justaname.id/sdk';

const configuration = {
 apiKey: 'your-api-key',
 networks: [
 {
 chainId: 1,
 providerUrl: 'https://mainnet.infura.io/v3/your-infura-key'
 },
 ],
 ensDomains: ['justan.id']
 };

 const justaName = JustaName.init(configuration);

 ```

## Constructors

### new JustaName()

> **new JustaName**(`siwe`, `subnames`, `offchainResolvers`, `signIn`, `mApps`): [`JustaName`](JustaName.md)

#### Parameters

• **siwe**: [`SubnameChallenge`](SubnameChallenge.md)

• **subnames**: [`Subnames`](Subnames.md)

• **offchainResolvers**: [`OffchainResolvers`](OffchainResolvers.md)

• **signIn**: [`SignIn`](SignIn.md)

• **mApps**: [`MApps`](MApps.md)

#### Returns

[`JustaName`](JustaName.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:72](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L72)

## Properties

### mApps

> **mApps**: [`MApps`](MApps.md)

The MApps feature.

#### Memberof

JustaName

#### Defined in

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:70](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L70)

***

### offchainResolvers

> **offchainResolvers**: [`OffchainResolvers`](OffchainResolvers.md)

The offchainResolvers feature.

#### Memberof

JustaName

#### Defined in

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:54](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L54)

***

### signIn

> **signIn**: [`SignIn`](SignIn.md)

The signIn feature.

#### Memberof

JustaName

#### Defined in

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:62](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L62)

***

### siwe

> **siwe**: [`SubnameChallenge`](SubnameChallenge.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:38](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L38)

***

### subnames

> **subnames**: [`Subnames`](Subnames.md)

The subnames feature.

#### Memberof

JustaName

#### Defined in

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:46](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L46)

## Methods

### createNetworks()

> `static` **createNetworks**(`networks`): [`NetworksWithProvider`](../type-aliases/NetworksWithProvider.md)

#### Parameters

• **networks**: [`Networks`](../type-aliases/Networks.md) = `[]`

#### Returns

[`NetworksWithProvider`](../type-aliases/NetworksWithProvider.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:142](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L142)

***

### init()

> `static` **init**(`configuration`): [`JustaName`](JustaName.md)

#### Parameters

• **configuration**: [`JustaNameConfig`](../interfaces/JustaNameConfig.md)\<[`Configuration`](../interfaces/Configuration.md), [`Networks`](../type-aliases/Networks.md), `undefined` \| [`EnsDomains`](../type-aliases/EnsDomains.md), `undefined` \| [`ChainId`](../type-aliases/ChainId.md), `undefined` \| `string`\> = `{}`

#### Returns

[`JustaName`](JustaName.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:86](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L86)

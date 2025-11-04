# JustaName

[**@justaname.id/sdk**](../) • **Docs**

***

[@justaname.id/sdk](../globals.md) / JustaName

## Class: JustaName

The main class for the JustaName SDK.

### Classdesc

The main class for the JustaName SDK.

### Example

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

### Constructors

#### new JustaName()

> **new JustaName**(`siwe`, `subnames`, `offchainResolvers`, `signIn`, `mApps`): [`JustaName`](JustaName.md)

**Parameters**

• **siwe**: [`SubnameChallenge`](SubnameChallenge.md)

• **subnames**: [`Subnames`](Subnames.md)

• **offchainResolvers**: [`OffchainResolvers`](OffchainResolvers.md)

• **signIn**: [`SignIn`](SignIn.md)

• **mApps**: [`MApps`](broken-reference)

**Returns**

[`JustaName`](JustaName.md)

**Defined in**

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:78](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L78)

### Properties

#### mApps

> **mApps**: [`MApps`](broken-reference)

The MApps feature.

**Memberof**

JustaName

**Defined in**

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:76](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L76)

***

#### offchainResolvers

> **offchainResolvers**: [`OffchainResolvers`](OffchainResolvers.md)

The offchainResolvers feature.

**Memberof**

JustaName

**Defined in**

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:60](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L60)

***

#### signIn

> **signIn**: [`SignIn`](SignIn.md)

The signIn feature.

**Memberof**

JustaName

**Defined in**

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:68](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L68)

***

#### siwe

> **siwe**: [`SubnameChallenge`](SubnameChallenge.md)

**Defined in**

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:44](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L44)

***

#### subnames

> **subnames**: [`Subnames`](Subnames.md)

The subnames feature.

**Memberof**

JustaName

**Defined in**

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:52](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L52)

### Methods

#### createNetworks()

> `static` **createNetworks**(`networks`): [`NetworksWithProvider`](../type-aliases/NetworksWithProvider.md)

**Parameters**

• **networks**: [`Networks`](../type-aliases/Networks.md) = `[]`

**Returns**

[`NetworksWithProvider`](../type-aliases/NetworksWithProvider.md)

**Defined in**

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:160](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L160)

***

#### init()

> `static` **init**(`configuration`): [`JustaName`](JustaName.md)

**Parameters**

• **configuration**: [`JustaNameConfig`](../interfaces/JustaNameConfig.md)<[`Configuration`](../interfaces/Configuration.md), [`Networks`](../type-aliases/Networks.md), `undefined` | [`EnsDomains`](../type-aliases/EnsDomains.md), `undefined` | [`ChainId`](../type-aliases/ChainId.md)> = `{}`

**Returns**

[`JustaName`](JustaName.md)

**Defined in**

[packages/@justaname.id/sdk/src/lib/justaname/index.ts:92](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/justaname/index.ts#L92)

[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / MApps

# Class: MApps

## Constructors

### new MApps()

> **new MApps**(`params`): [`MApps`](MApps.md)

#### Parameters

• **params**: [`MAppsParams`](../interfaces/MAppsParams.md)

#### Returns

[`MApps`](MApps.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:31](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L31)

## Methods

### addMAppPermission()

> **addMAppPermission**(`params`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`AddMAppPermissionRequest`](../interfaces/AddMAppPermissionRequest.md), `never`\>, `never`\>

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:144](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L144)

***

### appendMAppField()

> **appendMAppField**(`params`, `headers`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`AppendMAppFieldRequest`](../interfaces/AppendMAppFieldRequest.md), `never`\>, `never`\>

• **headers**: [`SIWEHeaders`](../interfaces/SIWEHeaders.md)

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:152](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L152)

***

### canEnableMApps()

> **canEnableMApps**(`params`): `Promise`\<`boolean`\>

#### Parameters

• **params**

• **params.chainId?**: [`ChainId`](../type-aliases/ChainId.md)

• **params.ens**: `string`

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:82](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L82)

***

### checkIfMAppIsEnabled()

> **checkIfMAppIsEnabled**(`params`): `Promise`\<`boolean`\>

#### Parameters

• **params**

• **params.chainId?**: [`ChainId`](../type-aliases/ChainId.md)

• **params.ens**: `string`

• **params.mApp**: `string`

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:39](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L39)

***

### requestAddMAppPermissionChallenge()

> **requestAddMAppPermissionChallenge**(`params`): `Promise`\<[`RequestAddMAppPermissionChallengeResponse`](../interfaces/RequestAddMAppPermissionChallengeResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`RequestAddMAppPermissionChallengeRequest`](../interfaces/RequestAddMAppPermissionChallengeRequest.md), `"origin"` \| `"domain"` \| `"chainId"` \| `"ttl"`\>, `never`\>

#### Returns

`Promise`\<[`RequestAddMAppPermissionChallengeResponse`](../interfaces/RequestAddMAppPermissionChallengeResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:96](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L96)

***

### requestAppendMAppFieldChallenge()

> **requestAppendMAppFieldChallenge**(`params`): `Promise`\<[`RequestAppendMAppFieldChallengeResponse`](../interfaces/RequestAppendMAppFieldChallengeResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`RequestAppendMAppFieldChallengeRequest`](../interfaces/RequestAppendMAppFieldChallengeRequest.md), `"origin"` \| `"domain"` \| `"chainId"` \| `"ttl"`\>, `never`\>

#### Returns

`Promise`\<[`RequestAppendMAppFieldChallengeResponse`](../interfaces/RequestAppendMAppFieldChallengeResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:112](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L112)

***

### requestRevokeMAppPermissionChallenge()

> **requestRevokeMAppPermissionChallenge**(`params`): `Promise`\<[`RequestRevokeMAppPermissionChallengeResponse`](../interfaces/RequestRevokeMAppPermissionChallengeResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`RequestRevokeMAppPermissionChallengeRequest`](../interfaces/RequestRevokeMAppPermissionChallengeRequest.md), `"origin"` \| `"domain"` \| `"chainId"` \| `"ttl"`\>, `never`\>

#### Returns

`Promise`\<[`RequestRevokeMAppPermissionChallengeResponse`](../interfaces/RequestRevokeMAppPermissionChallengeResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:128](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L128)

***

### revokeMAppPermission()

> **revokeMAppPermission**(`params`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`RevokeMAppPermissionRequest`](../interfaces/RevokeMAppPermissionRequest.md), `never`\>, `never`\>

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:163](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L163)

[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / MApps

# Class: MApps

## Constructors

### new MApps()

> **new MApps**(`__namedParameters`): [`MApps`](MApps.md)

#### Parameters

• **\_\_namedParameters**: [`MAppsParams`](../interfaces/MAppsParams.md)

#### Returns

[`MApps`](MApps.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:29](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L29)

## Properties

### chainId

> **chainId**: [`ChainId`](../type-aliases/ChainId.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:25](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L25)

***

### networks

> **networks**: [`NetworksWithProvider`](../type-aliases/NetworksWithProvider.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:27](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L27)

***

### siweConfig?

> `optional` **siweConfig**: `Omit`\<[`SiweConfig`](../interfaces/SiweConfig.md), `"chainId"` \| `"ttl"`\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:24](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L24)

***

### subnames

> **subnames**: [`Subnames`](Subnames.md)

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:26](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L26)

## Methods

### addMAppPermission()

> **addMAppPermission**(`params`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`AddMAppPermissionRequest`](../interfaces/AddMAppPermissionRequest.md), `never`\>, `never`\>

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:141](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L141)

***

### appendMAppField()

> **appendMAppField**(`params`, `headers`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`AppendMAppFieldRequest`](../interfaces/AppendMAppFieldRequest.md), `never`\>, `never`\>

• **headers**: [`SIWEHeaders`](../interfaces/SIWEHeaders.md)

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:149](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L149)

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

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:79](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L79)

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

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:36](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L36)

***

### requestAddMAppPermissionChallenge()

> **requestAddMAppPermissionChallenge**(`params`): `Promise`\<[`RequestAddMAppPermissionChallengeResponse`](../interfaces/RequestAddMAppPermissionChallengeResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`RequestAddMAppPermissionChallengeRequest`](../interfaces/RequestAddMAppPermissionChallengeRequest.md), `"origin"` \| `"domain"` \| `"chainId"` \| `"ttl"`\>, `never`\>

#### Returns

`Promise`\<[`RequestAddMAppPermissionChallengeResponse`](../interfaces/RequestAddMAppPermissionChallengeResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:93](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L93)

***

### requestAppendMAppFieldChallenge()

> **requestAppendMAppFieldChallenge**(`params`): `Promise`\<[`RequestAppendMAppFieldChallengeResponse`](../interfaces/RequestAppendMAppFieldChallengeResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`RequestAppendMAppFieldChallengeRequest`](../interfaces/RequestAppendMAppFieldChallengeRequest.md), `"origin"` \| `"domain"` \| `"chainId"` \| `"ttl"`\>, `never`\>

#### Returns

`Promise`\<[`RequestAppendMAppFieldChallengeResponse`](../interfaces/RequestAppendMAppFieldChallengeResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:109](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L109)

***

### requestRevokeMAppPermissionChallenge()

> **requestRevokeMAppPermissionChallenge**(`params`): `Promise`\<[`RequestRevokeMAppPermissionChallengeResponse`](../interfaces/RequestRevokeMAppPermissionChallengeResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`RequestRevokeMAppPermissionChallengeRequest`](../interfaces/RequestRevokeMAppPermissionChallengeRequest.md), `"origin"` \| `"domain"` \| `"chainId"` \| `"ttl"`\>, `never`\>

#### Returns

`Promise`\<[`RequestRevokeMAppPermissionChallengeResponse`](../interfaces/RequestRevokeMAppPermissionChallengeResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:125](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L125)

***

### revokeMAppPermission()

> **revokeMAppPermission**(`params`): `Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Parameters

• **params**: `Omit`\<[`MakeOptionalProps`](../type-aliases/MakeOptionalProps.md)\<[`RevokeMAppPermissionRequest`](../interfaces/RevokeMAppPermissionRequest.md), `never`\>, `never`\>

#### Returns

`Promise`\<[`SubnameResponse`](../interfaces/SubnameResponse.md)\>

#### Defined in

[packages/@justaname.id/sdk/src/lib/features/mApps/index.ts:160](https://github.com/JustaName-id/JustaName-sdk/blob/577c5c787ef18bf8ddf8b997f021738a0e8ca336/packages/@justaname.id/sdk/src/lib/features/mApps/index.ts#L160)

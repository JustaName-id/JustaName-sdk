---
id: "modules"
title: "@justaname.id/react"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Interfaces

- [BaseAcceptSubnameRequest](interfaces/BaseAcceptSubnameRequest.md)
- [BaseAddSubnameRequest](interfaces/BaseAddSubnameRequest.md)
- [BaseRevokeSubnameRequest](interfaces/BaseRevokeSubnameRequest.md)
- [JustaNameContextProps](interfaces/JustaNameContextProps.md)
- [JustaNameProvider](interfaces/JustaNameProvider.md)
- [SubnameUpdate](interfaces/SubnameUpdate.md)
- [UseAcceptSubname](interfaces/UseAcceptSubname.md)
- [UseAddSubname](interfaces/UseAddSubname.md)
- [UseCommunitySubnamesOptions](interfaces/UseCommunitySubnamesOptions.md)
- [UseConnectedWalletSubnamesOptions](interfaces/UseConnectedWalletSubnamesOptions.md)
- [UseIsSubnameAvailableOptions](interfaces/UseIsSubnameAvailableOptions.md)
- [UseIsSubnameAvailableResult](interfaces/UseIsSubnameAvailableResult.md)
- [UseRevokeSubname](interfaces/UseRevokeSubname.md)
- [UseSearchSubnamesOptions](interfaces/UseSearchSubnamesOptions.md)
- [UseSubnameOptions](interfaces/UseSubnameOptions.md)
- [UseSubnameSignatureOptions](interfaces/UseSubnameSignatureOptions.md)
- [UseSubnameSignatureResult](interfaces/UseSubnameSignatureResult.md)
- [UseUpdateSubnameResult](interfaces/UseUpdateSubnameResult.md)

## Functions

### JustaNameProvider

▸ **JustaNameProvider**(`props`, `context?`): `ReactNode`

Provides JustaName context to child components, allowing them to access and interact
with the JustaName service.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`JustaNameProvider`](interfaces/JustaNameProvider.md) | The props for the JustaNameProvider component. |
| `context?` | `any` | - |

#### Returns

`ReactNode`

The provider component wrapping children.

**`Component`**

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:59](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L59)

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:74](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L74)

___

### buildAccountInvitationsKey

▸ **buildAccountInvitationsKey**(`address`): (`undefined` \| `string`)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |

#### Returns

(`undefined` \| `string`)[]

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAccountInvitations.ts:11](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useAccountInvitations.ts#L11)

___

### buildAccountSubnamesKey

▸ **buildAccountSubnamesKey**(`address`): (`undefined` \| `string`)[]

Constructs a unique cache key for storing and retrieving subnames data associated with a wallet address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `undefined` \| `string` | The Ethereum address of the connected wallet. |

#### Returns

(`undefined` \| `string`)[]

A unique cache key array for react-query.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAccountSubnames.ts:20](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useAccountSubnames.ts#L20)

___

### buildCommunitySubnamesKey

▸ **buildCommunitySubnamesKey**(`domainName`): (`undefined` \| `string`)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `domainName` | `undefined` \| `string` |

#### Returns

(`undefined` \| `string`)[]

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useCommunitySubnames.ts:9](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useCommunitySubnames.ts#L9)

___

### buildRecordsBySubnameKey

▸ **buildRecordsBySubnameKey**(`subname`, `chainId`): (`string` \| `number`)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `subname` | `string` |
| `chainId` | `number` |

#### Returns

(`string` \| `number`)[]

#### Defined in

packages/@justaname.id/react/src/lib/hooks/useRecords.ts:7

___

### buildSearchSubnamesKey

▸ **buildSearchSubnamesKey**(`subname`): (`undefined` \| `string`)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `subname` | `undefined` \| `string` |

#### Returns

(`undefined` \| `string`)[]

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useSearchSubnames.ts:9](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useSearchSubnames.ts#L9)

___

### buildSignature

▸ **buildSignature**(`address`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`string`[]

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useSubnameSignature.ts:8](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useSubnameSignature.ts#L8)

___

### buildSubnameBySubnameKey

▸ **buildSubnameBySubnameKey**(`subname`): `string`[]

Generates a unique cache key for storing and retrieving subname details.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subname` | `string` | The subname to generate a cache key for. |

#### Returns

`string`[]

A unique cache key array for react-query.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useSubname.ts:13](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useSubname.ts#L13)

___

### getSubnameDetails

▸ **getSubnameDetails**(`fullName`, `justaname`, `chainId`, `providerUrl`): `Promise`<\{ `records`: `SubnameRecordsResponse` = result; `sanitizedRecords`: `SanitizedRecords` = sanitized }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fullName` | `string` |
| `justaname` | `JustaName` |
| `chainId` | `ChainId` |
| `providerUrl` | `string` |

#### Returns

`Promise`<\{ `records`: `SubnameRecordsResponse` = result; `sanitizedRecords`: `SanitizedRecords` = sanitized }\>

#### Defined in

packages/@justaname.id/react/src/lib/hooks/useRecords.ts:10

___

### useAcceptSubname

▸ **useAcceptSubname**<`T`\>(): [`UseAcceptSubname`](interfaces/UseAcceptSubname.md)<`T`\>

Custom hook for performing a mutation to accept a subname.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | The type of additional parameters that can be passed to the accept subname mutation, extending the base request. |

#### Returns

[`UseAcceptSubname`](interfaces/UseAcceptSubname.md)<`T`\>

An object containing the `acceptSubname` async function to initiate the subname accept, and a boolean `acceptSubnamePending` indicating the mutation's pending state.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAcceptSubname.ts:45](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useAcceptSubname.ts#L45)

___

### useAccountInvitations

▸ **useAccountInvitations**(): `UseAccountInvitationsResult`

#### Returns

`UseAccountInvitationsResult`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAccountInvitations.ts:25](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useAccountInvitations.ts#L25)

___

### useAccountSubnames

▸ **useAccountSubnames**(`props?`): `UseAccountSubnamesResult`

Custom hook to fetch subnames associated with the connected wallet's address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`UseConnectedWalletSubnamesOptions`](interfaces/UseConnectedWalletSubnamesOptions.md) | Optional configurations for subname retrieval. |

#### Returns

`UseAccountSubnamesResult`

The result object containing subnames data, loading state, and a refetch function.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAccountSubnames.ts:65](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useAccountSubnames.ts#L65)

___

### useAddSubname

▸ **useAddSubname**<`T`\>(): [`UseAddSubname`](interfaces/UseAddSubname.md)<`T`\>

Custom hook for performing a mutation to add a subname.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | The type of additional parameters that can be passed to the claim subname mutation, extending the base request. |

#### Returns

[`UseAddSubname`](interfaces/UseAddSubname.md)<`T`\>

An object containing the `addSubname` async function to initiate the subname claim, and a boolean `claimSubnamePending` indicating the mutation's pending state.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAddSubname.ts:35](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useAddSubname.ts#L35)

___

### useCommunitySubnames

▸ **useCommunitySubnames**(`props`): `UseCommunitySubnamesResult`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`UseCommunitySubnamesOptions`](interfaces/UseCommunitySubnamesOptions.md) |

#### Returns

`UseCommunitySubnamesResult`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useCommunitySubnames.ts:32](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useCommunitySubnames.ts#L32)

___

### useIsSubnameAvailable

▸ **useIsSubnameAvailable**(`props`): [`UseIsSubnameAvailableResult`](interfaces/UseIsSubnameAvailableResult.md)

Custom hook to check if a subname is available for registration under a given ENS domain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`UseIsSubnameAvailableOptions`](interfaces/UseIsSubnameAvailableOptions.md) | The options including the username and ENS domain to check. |

#### Returns

[`UseIsSubnameAvailableResult`](interfaces/UseIsSubnameAvailableResult.md)

An object containing the availability status of the subname (`isAvailable`)
and the loading state of the query (`isLoading`).

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useIsSubnameAvailable.ts:32](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useIsSubnameAvailable.ts#L32)

___

### useJustaName

▸ **useJustaName**(): [`JustaNameContextProps`](interfaces/JustaNameContextProps.md)

Custom hook for accessing the JustaNameContext.

#### Returns

[`JustaNameContextProps`](interfaces/JustaNameContextProps.md)

The context value with JustaName service instance and configuration.

**`Hook`**

**`Throws`**

If the hook is used outside a JustaNameProvider.

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:121](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L121)

___

### useMounted

▸ **useMounted**(): `boolean`

A custom React hook to determine if a component has been mounted.

#### Returns

`boolean`

A boolean flag indicating whether the component is currently mounted.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useMounted.ts:10](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useMounted.ts#L10)

___

### useRecords

▸ **useRecords**(`props`): `UseRecordsResult`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `UseRecordsProps` |

#### Returns

`UseRecordsResult`

#### Defined in

packages/@justaname.id/react/src/lib/hooks/useRecords.ts:63

___

### useRevokeSubname

▸ **useRevokeSubname**<`T`\>(): [`UseRevokeSubname`](interfaces/UseRevokeSubname.md)<`T`\>

Custom hook for performing a mutation to revoke a subname.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | The type of additional parameters that can be passed to the revoke subname mutation, extending the base request. |

#### Returns

[`UseRevokeSubname`](interfaces/UseRevokeSubname.md)<`T`\>

An object containing the `revokeSubname` async function to initiate the subname revoke, and a boolean `revokeSubnamePending` indicating the mutation's pending state.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useRevokeSubname.ts:39](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useRevokeSubname.ts#L39)

___

### useSearchSubnames

▸ **useSearchSubnames**(`props?`): `UseSearchSubnamesResult`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`UseSearchSubnamesOptions`](interfaces/UseSearchSubnamesOptions.md) |

#### Returns

`UseSearchSubnamesResult`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useSearchSubnames.ts:29](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useSearchSubnames.ts#L29)

___

### useSubname

▸ **useSubname**(`props`): `UseSubnameResult`

Custom hook to query for details about a specific subname using the JustaName service.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`UseSubnameOptions`](interfaces/UseSubnameOptions.md) | The options for fetching the subname. |

#### Returns

`UseSubnameResult`

An object containing the subname data, loading state, and a refetch function.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useSubname.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useSubname.ts#L48)

___

### useSubnameSignature

▸ **useSubnameSignature**(`props`): [`UseSubnameSignatureResult`](interfaces/UseSubnameSignatureResult.md)

Custom hook to request a challenge for a subname and obtain a signature proving ownership of an address.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`UseSubnameSignatureOptions`](interfaces/UseSubnameSignatureOptions.md) |

#### Returns

[`UseSubnameSignatureResult`](interfaces/UseSubnameSignatureResult.md)

An object containing the function to initiate the signing process (`subnameSignature`)
and a boolean indicating if the signature operation is pending (`subnameSignaturePending`).

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useSubnameSignature.ts:25](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useSubnameSignature.ts#L25)

___

### useUpdateSubname

▸ **useUpdateSubname**(): [`UseUpdateSubnameResult`](interfaces/UseUpdateSubnameResult.md)

Custom hook to handle the subname claim or update process.

#### Returns

[`UseUpdateSubnameResult`](interfaces/UseUpdateSubnameResult.md)

An object containing methods and properties to handle the mutation state.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useUpdateSubname.ts:33](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/hooks/useUpdateSubname.ts#L33)

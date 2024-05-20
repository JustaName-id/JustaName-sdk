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
- [BaseRejectSubnameRequest](interfaces/BaseRejectSubnameRequest.md)
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
- [UseRejectSubname](interfaces/UseRejectSubname.md)
- [UseRevokeSubname](interfaces/UseRevokeSubname.md)
- [UseSearchSubnamesOptions](interfaces/UseSearchSubnamesOptions.md)
- [UseSubnameOptions](interfaces/UseSubnameOptions.md)
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

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:58](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L58)

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:73](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L73)

___

### SignatureOnMounted

▸ **SignatureOnMounted**(`props`, `context?`): `ReactNode`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `context?` | `any` |

#### Returns

`ReactNode`

#### Defined in

[packages/@justaname.id/react/src/lib/components/SignatureOnMounted.tsx:5](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/components/SignatureOnMounted.tsx#L5)

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

[packages/@justaname.id/react/src/lib/hooks/useAccountInvitations.ts:11](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useAccountInvitations.ts#L11)

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

[packages/@justaname.id/react/src/lib/hooks/useAccountSubnames.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useAccountSubnames.ts#L21)

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

[packages/@justaname.id/react/src/lib/hooks/useCommunitySubnames.ts:5](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useCommunitySubnames.ts#L5)

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

[packages/@justaname.id/react/src/lib/hooks/useRecords.ts:5](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useRecords.ts#L5)

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

[packages/@justaname.id/react/src/lib/hooks/useSearchSubnames.ts:9](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useSearchSubnames.ts#L9)

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

[packages/@justaname.id/react/src/lib/hooks/useSubnameSignature.ts:9](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useSubnameSignature.ts#L9)

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

[packages/@justaname.id/react/src/lib/hooks/useSubname.ts:13](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useSubname.ts#L13)

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

[packages/@justaname.id/react/src/lib/hooks/useRecords.ts:15](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useRecords.ts#L15)

___

### useAcceptSubname

▸ **useAcceptSubname**(): [`UseAcceptSubname`](interfaces/UseAcceptSubname.md)

Custom hook for performing a mutation to accept a subname.

#### Returns

[`UseAcceptSubname`](interfaces/UseAcceptSubname.md)

An object containing the `acceptSubname` async function to initiate the subname accept, and a boolean `acceptSubnamePending` indicating the mutation's pending state.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAcceptSubname.ts:44](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useAcceptSubname.ts#L44)

___

### useAccountInvitations

▸ **useAccountInvitations**(): `UseAccountInvitationsResult`

#### Returns

`UseAccountInvitationsResult`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAccountInvitations.ts:25](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useAccountInvitations.ts#L25)

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

[packages/@justaname.id/react/src/lib/hooks/useAccountSubnames.ts:66](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useAccountSubnames.ts#L66)

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

[packages/@justaname.id/react/src/lib/hooks/useAddSubname.ts:35](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useAddSubname.ts#L35)

___

### useCommunitySubnames

▸ **useCommunitySubnames**(`props`): `UseInfiniteQueryResult`<`InfiniteData`<`SubnameGetAllByDomainChainIdResponse`, `unknown`\>, `Error`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`UseCommunitySubnamesOptions`](interfaces/UseCommunitySubnamesOptions.md) |

#### Returns

`UseInfiniteQueryResult`<`InfiniteData`<`SubnameGetAllByDomainChainIdResponse`, `unknown`\>, `Error`\>

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useCommunitySubnames.ts:14](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useCommunitySubnames.ts#L14)

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

[packages/@justaname.id/react/src/lib/hooks/useIsSubnameAvailable.ts:32](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useIsSubnameAvailable.ts#L32)

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

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:107](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L107)

___

### useMounted

▸ **useMounted**(): `boolean`

A custom React hook to determine if a component has been mounted.

#### Returns

`boolean`

A boolean flag indicating whether the component is currently mounted.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useMounted.ts:10](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useMounted.ts#L10)

___

### useMountedAccount

▸ **useMountedAccount**(): \{ `address`: `undefined` ; `addresses`: `undefined` ; `chain`: `undefined` ; `chainId`: `undefined` ; `connector`: `undefined` ; `isConnected`: `boolean` ; `isConnecting`: ``false`` ; `isDisconnected`: ``true`` ; `isReconnecting`: ``false`` ; `status`: ``"disconnected"``  } \| \{ `address`: \`0x$\{string}\` ; `addresses`: readonly [\`0x$\{string}\`, \`0x$\{string}\`] ; `chain`: `undefined` \| `Chain` ; `chainId`: `number` ; `connector`: `Connector` ; `isConnected`: `boolean` ; `isConnecting`: ``false`` ; `isDisconnected`: ``false`` ; `isReconnecting`: ``false`` ; `status`: ``"connected"``  } \| \{ `address`: `undefined` \| \`0x$\{string}\` ; `addresses`: `undefined` \| readonly \`0x$\{string}\`[] ; `chain`: `undefined` \| `Chain` ; `chainId`: `undefined` \| `number` ; `connector`: `undefined` \| `Connector` ; `isConnected`: `boolean` ; `isConnecting`: ``false`` ; `isDisconnected`: ``false`` ; `isReconnecting`: ``true`` ; `status`: ``"reconnecting"``  } \| \{ `address`: `undefined` \| \`0x$\{string}\` ; `addresses`: `undefined` \| readonly \`0x$\{string}\`[] ; `chain`: `undefined` \| `Chain` ; `chainId`: `undefined` \| `number` ; `connector`: `undefined` \| `Connector` ; `isConnected`: `boolean` ; `isConnecting`: ``true`` ; `isDisconnected`: ``false`` ; `isReconnecting`: ``false`` ; `status`: ``"connecting"``  }

A custom hook that wraps the `useAccount` hook from wagmi, incorporating a component mount check.

#### Returns

\{ `address`: `undefined` ; `addresses`: `undefined` ; `chain`: `undefined` ; `chainId`: `undefined` ; `connector`: `undefined` ; `isConnected`: `boolean` ; `isConnecting`: ``false`` ; `isDisconnected`: ``true`` ; `isReconnecting`: ``false`` ; `status`: ``"disconnected"``  } \| \{ `address`: \`0x$\{string}\` ; `addresses`: readonly [\`0x$\{string}\`, \`0x$\{string}\`] ; `chain`: `undefined` \| `Chain` ; `chainId`: `number` ; `connector`: `Connector` ; `isConnected`: `boolean` ; `isConnecting`: ``false`` ; `isDisconnected`: ``false`` ; `isReconnecting`: ``false`` ; `status`: ``"connected"``  } \| \{ `address`: `undefined` \| \`0x$\{string}\` ; `addresses`: `undefined` \| readonly \`0x$\{string}\`[] ; `chain`: `undefined` \| `Chain` ; `chainId`: `undefined` \| `number` ; `connector`: `undefined` \| `Connector` ; `isConnected`: `boolean` ; `isConnecting`: ``false`` ; `isDisconnected`: ``false`` ; `isReconnecting`: ``true`` ; `status`: ``"reconnecting"``  } \| \{ `address`: `undefined` \| \`0x$\{string}\` ; `addresses`: `undefined` \| readonly \`0x$\{string}\`[] ; `chain`: `undefined` \| `Chain` ; `chainId`: `undefined` \| `number` ; `connector`: `undefined` \| `Connector` ; `isConnected`: `boolean` ; `isConnecting`: ``true`` ; `isDisconnected`: ``false`` ; `isReconnecting`: ``false`` ; `status`: ``"connecting"``  }

An enhanced account object that includes all properties and methods from `useAccount`,
along with an improved `isConnected` boolean that also takes the component's mount state into consideration.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useMountedAccount.ts:12](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useMountedAccount.ts#L12)

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

[packages/@justaname.id/react/src/lib/hooks/useRecords.ts:68](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useRecords.ts#L68)

___

### useRejectSubname

▸ **useRejectSubname**(): [`UseRejectSubname`](interfaces/UseRejectSubname.md)

Custom hook for performing a mutation to reject a subname.

#### Returns

[`UseRejectSubname`](interfaces/UseRejectSubname.md)

An object containing the `rejectSubname` async function to initiate the subname reject, and a boolean `rejectSubnamePending` indicating the mutation's pending state.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useRejectSubname.ts:38](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useRejectSubname.ts#L38)

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

[packages/@justaname.id/react/src/lib/hooks/useRevokeSubname.ts:39](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useRevokeSubname.ts#L39)

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

[packages/@justaname.id/react/src/lib/hooks/useSearchSubnames.ts:29](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useSearchSubnames.ts#L29)

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

[packages/@justaname.id/react/src/lib/hooks/useSubname.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useSubname.ts#L48)

___

### useSubnameSignature

▸ **useSubnameSignature**(): [`UseSubnameSignatureResult`](interfaces/UseSubnameSignatureResult.md)

Custom hook to request a challenge for a subname and obtain a signature proving ownership of an address.

#### Returns

[`UseSubnameSignatureResult`](interfaces/UseSubnameSignatureResult.md)

An object containing the function to initiate the signing process (`subnameSignature`)
and a boolean indicating if the signature operation is pending (`subnameSignaturePending`).

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useSubnameSignature.ts:22](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useSubnameSignature.ts#L22)

___

### useUpdateSubname

▸ **useUpdateSubname**(): [`UseUpdateSubnameResult`](interfaces/UseUpdateSubnameResult.md)

Custom hook to handle the subname claim or update process.

#### Returns

[`UseUpdateSubnameResult`](interfaces/UseUpdateSubnameResult.md)

An object containing methods and properties to handle the mutation state.

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useUpdateSubname.ts:32](https://github.com/JustaName-id/JustaName-sdk/blob/1dd4ff6/packages/@justaname.id/react/src/lib/hooks/useUpdateSubname.ts#L32)

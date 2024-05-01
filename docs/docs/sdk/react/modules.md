---
id: "modules"
title: "@justaname.id/react"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Interfaces

- [BaseClaimSubnameRequest](interfaces/BaseClaimSubnameRequest.md)
- [JustaNameContextProps](interfaces/JustaNameContextProps.md)
- [JustaNameProvider](interfaces/JustaNameProvider.md)
- [UseConnectedWalletSubnamesOptions](interfaces/UseConnectedWalletSubnamesOptions.md)
- [UseIsSubnameAvailableOptions](interfaces/UseIsSubnameAvailableOptions.md)
- [UseSubnameOptions](interfaces/UseSubnameOptions.md)

## Variables

### defaultRoutes

• `Const` **defaultRoutes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `checkSubnameAvailabilityRoute` | `string` |
| `claimSubnameRoute` | `string` |
| `requestChallengeRoute` | `string` |

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:4](https://github.com/JustaName-id/JustaName-sdk/blob/5db266b/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L4)

## Functions

### JustaNameProvider

▸ **JustaNameProvider**(`props`, `context?`): `ReactNode`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`JustaNameProvider`](interfaces/JustaNameProvider.md) |
| `context?` | `any` |

#### Returns

`ReactNode`

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:23](https://github.com/JustaName-id/JustaName-sdk/blob/5db266b/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L23)

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:29](https://github.com/JustaName-id/JustaName-sdk/blob/5db266b/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L29)

___

### buildAccountSubnamesKey

▸ **buildAccountSubnamesKey**(`address`): (`undefined` \| `string`)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |

#### Returns

(`undefined` \| `string`)[]

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAccountSubnames.ts:7](https://github.com/JustaName-id/JustaName-sdk/blob/5db266b/packages/@justaname.id/react/src/lib/hooks/useAccountSubnames.ts#L7)

___

### buildSubnameBySubnameKey

▸ **buildSubnameBySubnameKey**(`subname`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `subname` | `string` |

#### Returns

`string`[]

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useSubname.ts:5](https://github.com/JustaName-id/JustaName-sdk/blob/5db266b/packages/@justaname.id/react/src/lib/hooks/useSubname.ts#L5)

___

### useAccountSubnames

▸ **useAccountSubnames**(`props?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`UseConnectedWalletSubnamesOptions`](interfaces/UseConnectedWalletSubnamesOptions.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `isLoading` | `boolean` |
| `refetchSubnames` | (`options?`: `RefetchOptions`) => `Promise`<`QueryObserverResult`<`undefined` \| `SubnameGetAllByAddressResponse`[], `Error`\>\> |
| `subnames` | `SubnameGetAllByAddressResponse`[] |

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAccountSubnames.ts:12](https://github.com/JustaName-id/JustaName-sdk/blob/5db266b/packages/@justaname.id/react/src/lib/hooks/useAccountSubnames.ts#L12)

___

### useAddSubname

▸ **useAddSubname**<`T`\>(): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `claimSubname` | (`params`: `T` & [`BaseClaimSubnameRequest`](interfaces/BaseClaimSubnameRequest.md)) => `Promise`<`SubnameClaimResponse`\> |
| `claimSubnamePending` | `boolean` |

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useAddSubname.ts:12](https://github.com/JustaName-id/JustaName-sdk/blob/5db266b/packages/@justaname.id/react/src/lib/hooks/useAddSubname.ts#L12)

___

### useIsSubnameAvailable

▸ **useIsSubnameAvailable**(`props`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`UseIsSubnameAvailableOptions`](interfaces/UseIsSubnameAvailableOptions.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `isAvailable` | `undefined` \| `IsSubnameAvailableResponse` |
| `isLoading` | `boolean` |

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useIsSubnameAvailable.ts:9](https://github.com/JustaName-id/JustaName-sdk/blob/5db266b/packages/@justaname.id/react/src/lib/hooks/useIsSubnameAvailable.ts#L9)

___

### useJustaName

▸ **useJustaName**(): [`JustaNameContextProps`](interfaces/JustaNameContextProps.md)

#### Returns

[`JustaNameContextProps`](interfaces/JustaNameContextProps.md)

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:62](https://github.com/JustaName-id/JustaName-sdk/blob/5db266b/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L62)

___

### useMounted

▸ **useMounted**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useMounted.ts:3](https://github.com/JustaName-id/JustaName-sdk/blob/5db266b/packages/@justaname.id/react/src/lib/hooks/useMounted.ts#L3)

___

### useSubname

▸ **useSubname**(`props`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`UseSubnameOptions`](interfaces/UseSubnameOptions.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `isLoading` | `boolean` |
| `refetchSubname` | (`options?`: `RefetchOptions`) => `Promise`<`QueryObserverResult`<`undefined` \| `SubnameGetBySubnameResponse`, `Error`\>\> |
| `subname` | `undefined` \| `SubnameGetBySubnameResponse` |

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useSubname.ts:11](https://github.com/JustaName-id/JustaName-sdk/blob/5db266b/packages/@justaname.id/react/src/lib/hooks/useSubname.ts#L11)

___

### useSubnameSignature

▸ **useSubnameSignature**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `subnameSignature` | `UseMutateAsyncFunction`<\{ `address`: \`0x$\{string}\` ; `message`: `string` = data.challenge; `signature`: \`0x$\{string}\`  }, `Error`, `void`, `unknown`\> |
| `subnameSignaturePending` | `boolean` |

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/useSubnameSignature.ts:7](https://github.com/JustaName-id/JustaName-sdk/blob/5db266b/packages/@justaname.id/react/src/lib/hooks/useSubnameSignature.ts#L7)

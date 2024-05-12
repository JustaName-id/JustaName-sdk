---
id: "JustaNameProvider"
title: "Interface: JustaNameProvider"
sidebar_label: "JustaNameProvider"
sidebar_position: 0
custom_edit_url: null
---

Props for the JustaNameProvider component.

## Properties

### backendUrl

• `Optional` **backendUrl**: `string`

Optional backend URL for API requests.

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:63](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L63)

___

### chainId

• `Optional` **chainId**: ``1`` \| ``11155111``

Optional blockchain network identifier.

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:62](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L62)

___

### children

• **children**: `ReactNode`

The child components.

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:60](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L60)

___

### routes

• `Optional` **routes**: `Object`

Optional custom API routes.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `acceptSubnameRoute` | `string` |
| `addSubnameRoute` | `string` |
| `checkSubnameAvailabilityRoute` | `string` |
| `requestChallengeRoute` | `string` |
| `revokeSubnameRoute` | `string` |
| `updateSubnameRoute` | `string` |

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:61](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L61)

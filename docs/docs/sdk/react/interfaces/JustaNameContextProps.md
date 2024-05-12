---
id: "JustaNameContextProps"
title: "Interface: JustaNameContextProps"
sidebar_label: "JustaNameContextProps"
sidebar_position: 0
custom_edit_url: null
---

Type definition for the properties available in the JustaNameContext.

## Properties

### backendUrl

• **backendUrl**: `string`

The backend URL for JustaName API requests.

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:37](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L37)

___

### chainId

• **chainId**: ``1`` \| ``11155111``

The blockchain network identifier.

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:38](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L38)

___

### justaname

• **justaname**: ``null`` \| `JustaName`

The JustaName SDK instance.

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:35](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L35)

___

### routes

• **routes**: `Object`

An object containing route definitions.

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

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:36](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L36)

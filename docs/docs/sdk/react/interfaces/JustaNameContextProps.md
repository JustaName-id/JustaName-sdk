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

• `Optional` **backendUrl**: `string`

The backend URL for JustaName API requests.

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:36](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L36)

___

### chainId

• **chainId**: ``1`` \| ``11155111``

The blockchain network identifier.

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:37](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L37)

___

### justaname

• **justaname**: `JustaName`

The JustaName SDK instance.

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:34](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L34)

___

### routes

• **routes**: `Object`

An object containing route definitions.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addSubnameRoute` | `string` |
| `requestChallengeRoute` | `string` |
| `revokeSubnameRoute` | `string` |

#### Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:35](https://github.com/JustaName-id/JustaName-sdk/blob/610ce53/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L35)

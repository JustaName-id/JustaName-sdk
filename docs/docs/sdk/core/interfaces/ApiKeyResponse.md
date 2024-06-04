---
id: "ApiKeyResponse"
title: "Interface: ApiKeyResponse"
sidebar_label: "ApiKeyResponse"
sidebar_position: 0
custom_edit_url: null
---

Defines the structure for API key responses.
This interface extends `IResponse`, including additional fields specific to API keys.

 ApiKeyResponse

## Hierarchy

- [`IResponse`](IResponse.md)

  ↳ **`ApiKeyResponse`**

## Properties

### creatorId

• **creatorId**: `string`

The identifier of the user who created this API key.

#### Defined in

[lib/types/api-key/health-check.ts:25](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L25)

___

### id

• **id**: `string`

The unique identifier of the API key.

#### Defined in

[lib/types/api-key/health-check.ts:17](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L17)

___

### key

• **key**: `string`

The actual API key string used for authentication and authorization.

#### Defined in

[lib/types/api-key/health-check.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L21)

___

### name

• **name**: `string`

The name given to the API key, typically used for easy identification.

#### Defined in

[lib/types/api-key/health-check.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L19)

___

### workspaceId

• **workspaceId**: `string`

The identifier of the workspace to which this API key belongs.

#### Defined in

[lib/types/api-key/health-check.ts:23](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L23)

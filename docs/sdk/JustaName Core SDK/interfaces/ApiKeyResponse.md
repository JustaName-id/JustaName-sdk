[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / ApiKeyResponse

# Interface: ApiKeyResponse

Defines the structure for API key responses.
This interface extends `IResponse`, including additional fields specific to API keys.

 ApiKeyResponse

## Extends

- [`IResponse`](IResponse.md)

## Properties

### creatorId

> **creatorId**: `string`

The identifier of the user who created this API key.

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts:25](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L25)

***

### id

> **id**: `string`

The unique identifier of the API key.

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts:17](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L17)

***

### key

> **key**: `string`

The actual API key string used for authentication and authorization.

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts:21](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L21)

***

### name

> **name**: `string`

The name given to the API key, typically used for easy identification.

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L19)

***

### workspaceId

> **workspaceId**: `string`

The identifier of the workspace to which this API key belongs.

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts:23](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/sdk/src/lib/types/api-key/health-check.ts#L23)

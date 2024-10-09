[**@justaname.id/sdk**](../README.md) • **Docs**

***

[@justaname.id/sdk](../globals.md) / ApiKeyHeaders

# Interface: ApiKeyHeaders

Defines the headers for API requests that require an API key for authentication.
The `xApiKey` header is used to pass the API key associated with the client making the request.
This is a common method for controlling access to restricted API endpoints.

 ApiKeyHeaders

## Properties

### xApiKey?

> `optional` **xApiKey**: `string`

The API key provided to the client. This key should be included in API
                             requests to authenticate and authorize the client's access to the API.

#### Defined in

[packages/@justaname.id/sdk/src/lib/types/headers/index.ts:30](https://github.com/JustaName-id/JustaName-sdk/blob/7430def13fc61cd3fc8b89d25e0869ee390cc2d0/packages/@justaname.id/sdk/src/lib/types/headers/index.ts#L30)

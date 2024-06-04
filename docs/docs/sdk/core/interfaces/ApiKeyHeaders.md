---
id: "ApiKeyHeaders"
title: "Interface: ApiKeyHeaders"
sidebar_label: "ApiKeyHeaders"
sidebar_position: 0
custom_edit_url: null
---

Defines the headers for API requests that require an API key for authentication.
The `xApiKey` header is used to pass the API key associated with the client making the request.
This is a common method for controlling access to restricted API endpoints.

 ApiKeyHeaders

## Properties

### xApiKey

• **xApiKey**: `string`

The API key provided to the client. This key should be included in API
                             requests to authenticate and authorize the client's access to the API.

#### Defined in

[lib/types/headers/index.ts:30](https://github.com/JustaName-id/JustaName-sdk/blob/0b5bd45/packages/@justaname.id/sdk/src/lib/types/headers/index.ts#L30)

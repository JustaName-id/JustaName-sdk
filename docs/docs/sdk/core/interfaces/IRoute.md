---
id: "IRoute"
title: "Interface: IRoute"
sidebar_label: "IRoute"
sidebar_position: 0
custom_edit_url: null
---

Represents a generic API route configuration, encapsulating the types for request and response bodies,
as well as any required headers. This interface serves as a template for defining the contract for
a specific API endpoint, ensuring type safety and consistency in request/response handling.

- `request`: Specifies the expected structure of the request body, derived from `IRequest`.
- `response`: Specifies the expected structure of the response body, derived from `IResponse`.
- `headers`: Specifies the expected structure of the request/response headers, derived from `IHeaders`.

 IRoute

## Hierarchy

- **`IRoute`**

  ↳ [`ApiKeyRoute`](ApiKeyRoute.md)

  ↳ [`SIWERequestChallengeRoute`](SIWERequestChallengeRoute.md)

  ↳ [`SIWEVerifyMessageRoute`](SIWEVerifyMessageRoute.md)

  ↳ [`SubnameAddRoute`](SubnameAddRoute.md)

  ↳ [`IsSubnameAvailableRoute`](IsSubnameAvailableRoute.md)

  ↳ [`SubnameGetAllByAddressRoute`](SubnameGetAllByAddressRoute.md)

  ↳ [`SubnameGetAllByDomainChainIdRoute`](SubnameGetAllByDomainChainIdRoute.md)

  ↳ [`SubnameGetByDomainNameChainIdRoute`](SubnameGetByDomainNameChainIdRoute.md)

  ↳ [`SubnameGetBySubnameRoute`](SubnameGetBySubnameRoute.md)

  ↳ [`SubnameReserveRoute`](SubnameReserveRoute.md)

  ↳ [`SubnameRevokeRoute`](SubnameRevokeRoute.md)

  ↳ [`SubnameSearchRoute`](SubnameSearchRoute.md)

  ↳ [`SubnameUpdateRoute`](SubnameUpdateRoute.md)

  ↳ [`SubnameAcceptRoute`](SubnameAcceptRoute.md)

  ↳ [`SubnameRecordsRoute`](SubnameRecordsRoute.md)

## Properties

### headers

• **headers**: [`IHeaders`](IHeaders.md)

The type of the headers for the request/response.

#### Defined in

[lib/types/common/index.ts:57](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/common/index.ts#L57)

___

### request

• **request**: [`IRequest`](IRequest.md)

The type of the request data.

#### Defined in

[lib/types/common/index.ts:55](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/common/index.ts#L55)

___

### response

• **response**: [`IResponse`](IResponse.md)

The type of the response data.

#### Defined in

[lib/types/common/index.ts:56](https://github.com/JustaName-id/JustaName-sdk/blob/4ff9084/packages/@justaname.id/sdk/src/lib/types/common/index.ts#L56)

[**@justweb3/efp-plugin**](../README.md) • **Docs**

***

[@justweb3/efp-plugin](../globals.md) / UseFollowingResult

# Interface: UseFollowingResult

## Properties

### fetchMoreFollowing()

> **fetchMoreFollowing**: (`options`?) => `Promise`\<`InfiniteQueryObserverResult`\<`InfiniteData`\<[`Following`](Following.md), `unknown`\>, `Error`\>\>

#### Parameters

• **options?**: `FetchNextPageOptions`

#### Returns

`Promise`\<`InfiniteQueryObserverResult`\<`InfiniteData`\<[`Following`](Following.md), `unknown`\>, `Error`\>\>

#### Defined in

[packages/plugins/efp/src/lib/hooks/useFollowing/index.ts:40](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/plugins/efp/src/lib/hooks/useFollowing/index.ts#L40)

***

### following

> **following**: `undefined` \| `InfiniteData`\<[`Following`](Following.md), `unknown`\>

#### Defined in

[packages/plugins/efp/src/lib/hooks/useFollowing/index.ts:39](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/plugins/efp/src/lib/hooks/useFollowing/index.ts#L39)

***

### hasMoreFollowing

> **hasMoreFollowing**: `boolean`

#### Defined in

[packages/plugins/efp/src/lib/hooks/useFollowing/index.ts:45](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/plugins/efp/src/lib/hooks/useFollowing/index.ts#L45)

***

### isFollowingFetching

> **isFollowingFetching**: `boolean`

#### Defined in

[packages/plugins/efp/src/lib/hooks/useFollowing/index.ts:47](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/plugins/efp/src/lib/hooks/useFollowing/index.ts#L47)

***

### isFollowingLoading

> **isFollowingLoading**: `boolean`

#### Defined in

[packages/plugins/efp/src/lib/hooks/useFollowing/index.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/plugins/efp/src/lib/hooks/useFollowing/index.ts#L48)

***

### isFollowingPending

> **isFollowingPending**: `boolean`

#### Defined in

[packages/plugins/efp/src/lib/hooks/useFollowing/index.ts:46](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/plugins/efp/src/lib/hooks/useFollowing/index.ts#L46)

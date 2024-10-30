[**@justweb3/efp-plugin**](../README.md) • **Docs**

***

[@justweb3/efp-plugin](../globals.md) / UseFollowersResult

# Interface: UseFollowersResult

## Properties

### fetchMoreFollowers()

> **fetchMoreFollowers**: (`options`?) => `Promise`\<`InfiniteQueryObserverResult`\<`InfiniteData`\<[`Followers`](Followers.md), `unknown`\>, `Error`\>\>

#### Parameters

• **options?**: `FetchNextPageOptions`

#### Returns

`Promise`\<`InfiniteQueryObserverResult`\<`InfiniteData`\<[`Followers`](Followers.md), `unknown`\>, `Error`\>\>

#### Defined in

[packages/plugins/efp/src/lib/hooks/useFollowers/index.ts:43](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/plugins/efp/src/lib/hooks/useFollowers/index.ts#L43)

***

### followers

> **followers**: `undefined` \| `InfiniteData`\<[`Followers`](Followers.md), `unknown`\>

#### Defined in

[packages/plugins/efp/src/lib/hooks/useFollowers/index.ts:42](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/plugins/efp/src/lib/hooks/useFollowers/index.ts#L42)

***

### hasMoreFollowers

> **hasMoreFollowers**: `boolean`

#### Defined in

[packages/plugins/efp/src/lib/hooks/useFollowers/index.ts:48](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/plugins/efp/src/lib/hooks/useFollowers/index.ts#L48)

***

### isFollowersFetching

> **isFollowersFetching**: `boolean`

#### Defined in

[packages/plugins/efp/src/lib/hooks/useFollowers/index.ts:50](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/plugins/efp/src/lib/hooks/useFollowers/index.ts#L50)

***

### isFollowersLoading

> **isFollowersLoading**: `boolean`

#### Defined in

[packages/plugins/efp/src/lib/hooks/useFollowers/index.ts:51](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/plugins/efp/src/lib/hooks/useFollowers/index.ts#L51)

***

### isFollowersPending

> **isFollowersPending**: `boolean`

#### Defined in

[packages/plugins/efp/src/lib/hooks/useFollowers/index.ts:49](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/plugins/efp/src/lib/hooks/useFollowers/index.ts#L49)

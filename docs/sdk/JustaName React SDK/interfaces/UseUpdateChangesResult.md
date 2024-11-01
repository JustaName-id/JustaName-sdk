[**@justaname.id/react**](../README.md) • **Docs**

***

[@justaname.id/react](../globals.md) / UseUpdateChangesResult

# Interface: UseUpdateChangesResult

## Properties

### canUpdateEns?

> `optional` **canUpdateEns**: `boolean`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:31](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L31)

***

### changes?

> `optional` **changes**: [`GetUpdateChangesResult`](GetUpdateChangesResult.md)

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:35](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L35)

***

### checkIfUpdateIsValid()

> **checkIfUpdateIsValid**: (`params`) => `Promise`\<`boolean`\>

#### Parameters

• **params**: [`GetUpdateChangesParams`](GetUpdateChangesParams.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:40](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L40)

***

### getUpdateChanges()

> **getUpdateChanges**: (`params`) => `Promise`\<[`GetUpdateChangesResult`](GetUpdateChangesResult.md)\>

#### Parameters

• **params**: [`GetUpdateChangesParams`](GetUpdateChangesParams.md)

#### Returns

`Promise`\<[`GetUpdateChangesResult`](GetUpdateChangesResult.md)\>

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:37](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L37)

***

### isUpdateChangesFetching

> **isUpdateChangesFetching**: `boolean`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:33](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L33)

***

### isUpdateChangesLoading

> **isUpdateChangesLoading**: `boolean`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:34](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L34)

***

### isUpdateChangesPending

> **isUpdateChangesPending**: `boolean`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:32](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L32)

***

### refetchUpdateChanges()

> **refetchUpdateChanges**: () => `void`

#### Returns

`void`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts:36](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/subname/useUpdateChanges.ts#L36)

[**@justaname.id/react**](../README.md) • **Docs**

***

[@justaname.id/react](../globals.md) / UseRecordsResult

# Interface: UseRecordsResult

## Properties

### getRecords()

> **getRecords**: (`params`, `forceUpdate`?) => `Promise`\<[`Records`](Records.md)\>

#### Parameters

• **params**: [`GetRecordsParams`](GetRecordsParams.md)

• **forceUpdate?**: `boolean`

#### Returns

`Promise`\<[`Records`](Records.md)\>

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts:42](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts#L42)

***

### isRecordsFetching

> **isRecordsFetching**: `boolean`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts:39](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts#L39)

***

### isRecordsLoading

> **isRecordsLoading**: `boolean`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts:40](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts#L40)

***

### isRecordsPending

> **isRecordsPending**: `boolean`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts:38](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts#L38)

***

### records

> **records**: `undefined` \| [`Records`](Records.md)

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts:41](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts#L41)

***

### recordsStatus

> **recordsStatus**: `"error"` \| `"success"` \| `"pending"`

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts:49](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts#L49)

***

### refetchRecords()

> **refetchRecords**: (`options`?) => `Promise`\<`QueryObserverResult`\<`undefined` \| [`Records`](Records.md), `unknown`\>\>

#### Parameters

• **options?**: `RefetchOptions`

#### Returns

`Promise`\<`QueryObserverResult`\<`undefined` \| [`Records`](Records.md), `unknown`\>\>

#### Defined in

[packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts:46](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/records/useRecords.ts#L46)

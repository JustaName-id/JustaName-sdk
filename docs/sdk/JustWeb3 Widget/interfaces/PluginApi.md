# PluginApi

[**@justweb3/widget**](../../) • **Docs**

***

[@justweb3/widget](../globals.md) / PluginApi

## Interface: PluginApi

### Properties

#### chainId

> **chainId**: `undefined` | `number`

**Defined in**

[packages/@justweb3/widget/src/lib/plugins/index.ts:10](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/plugins/index.ts#L10)

***

#### connectedEns

> **connectedEns**: `undefined` | `null` | `object`

**Defined in**

[packages/@justweb3/widget/src/lib/plugins/index.ts:7](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/plugins/index.ts#L7)

***

#### eventEmitter

> **eventEmitter**: `EventEmitter`

**Defined in**

[packages/@justweb3/widget/src/lib/plugins/index.ts:16](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/plugins/index.ts#L16)

***

#### getState()

> **getState**: <`T`>(`key`) => `undefined` | `T`

**Type Parameters**

• **T**

**Parameters**

• **key**: `string`

**Returns**

`undefined` | `T`

**Defined in**

[packages/@justweb3/widget/src/lib/plugins/index.ts:14](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/plugins/index.ts#L14)

***

#### handleOpenAuthorizeMAppDialog()

> **handleOpenAuthorizeMAppDialog**: (`mApp`, `open`) => `void`

**Parameters**

• **mApp**: `string`

• **open**: `boolean`

**Returns**

`void`

**Defined in**

[packages/@justweb3/widget/src/lib/plugins/index.ts:18](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/plugins/index.ts#L18)

***

#### handleOpenRevokeMAppDialog()

> **handleOpenRevokeMAppDialog**: (`mApp`, `open`) => `void`

**Parameters**

• **mApp**: `string`

• **open**: `boolean`

**Returns**

`void`

**Defined in**

[packages/@justweb3/widget/src/lib/plugins/index.ts:19](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/plugins/index.ts#L19)

***

#### handleOpenSignInDialog()

> **handleOpenSignInDialog**: (`open`) => `void`

**Parameters**

• **open**: `boolean`

**Returns**

`void`

**Defined in**

[packages/@justweb3/widget/src/lib/plugins/index.ts:20](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/plugins/index.ts#L20)

***

#### isEnsAuthPending

> **isEnsAuthPending**: `boolean`

**Defined in**

[packages/@justweb3/widget/src/lib/plugins/index.ts:8](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/plugins/index.ts#L8)

***

#### isLoggedIn

> **isLoggedIn**: `boolean`

**Defined in**

[packages/@justweb3/widget/src/lib/plugins/index.ts:9](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/plugins/index.ts#L9)

***

#### mApps

> **mApps**: `string`\[]

**Defined in**

[packages/@justweb3/widget/src/lib/plugins/index.ts:12](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/plugins/index.ts#L12)

***

#### records

> **records**: `undefined` | `Records`

**Defined in**

[packages/@justweb3/widget/src/lib/plugins/index.ts:11](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/plugins/index.ts#L11)

***

#### setState()

> **setState**: <`T`>(`key`, `value`) => `void`

**Type Parameters**

• **T**

**Parameters**

• **key**: `string`

• **value**: `T`

**Returns**

`void`

**Defined in**

[packages/@justweb3/widget/src/lib/plugins/index.ts:13](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/plugins/index.ts#L13)

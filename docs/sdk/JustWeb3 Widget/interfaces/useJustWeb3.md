[**@justweb3/widget**](../README.md) • **Docs**

***

[@justweb3/widget](../globals.md) / useJustWeb3

# Interface: useJustWeb3

## Properties

### chainId

> **chainId**: `undefined` \| `ChainId`

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:280](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L280)

***

### connectedEns

> **connectedEns**: `undefined` \| `null` \| `object`

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:275](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L275)

***

### handleOpenSignInDialog()

> **handleOpenSignInDialog**: (`open`) => `void`

#### Parameters

• **open**: `boolean`

#### Returns

`void`

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:265](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L265)

***

### isEnsAuthFetching

> **isEnsAuthFetching**: `boolean`

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:273](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L273)

***

### isEnsAuthLoading

> **isEnsAuthLoading**: `boolean`

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:272](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L272)

***

### isEnsAuthPending

> **isEnsAuthPending**: `boolean`

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:271](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L271)

***

### isLoggedIn

> **isLoggedIn**: `boolean`

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:270](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L270)

***

### isSignInOpen

> **isSignInOpen**: `boolean`

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:266](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L266)

***

### openEnsProfile()

> **openEnsProfile**: (`ens`, `chainId`?) => `void`

#### Parameters

• **ens**: `string`

• **chainId?**: `ChainId`

#### Returns

`void`

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:276](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L276)

***

### refreshEnsAuth()

> **refreshEnsAuth**: () => `void`

#### Returns

`void`

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:274](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L274)

***

### signIn

> **signIn**: `UseMutateAsyncFunction`\<`string`, `Error`, `UseEnsSignInFunctionParams`, `unknown`\>

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:267](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L267)

***

### signOut()

> **signOut**: () => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:268](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L268)

***

### status

> **status**: `"pending"` \| `"signedIn"` \| `"signedOut"`

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:269](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L269)

***

### updateRecords()

> **updateRecords**: (`records`) => `Promise`\<`void`\>

#### Parameters

• **records**: `Omit`\<`UseSubnameUpdateFunctionParams`, `"ens"`\> & `object`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:277](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L277)

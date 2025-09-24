# JustWeb3ProviderConfig

[**@justweb3/widget**](../../) • **Docs**

***

[@justweb3/widget](../globals.md) / JustWeb3ProviderConfig

## Interface: JustWeb3ProviderConfig

### Extends

* `JustaNameProviderConfig`.`JustWeb3ThemeProviderConfig`

### Properties

#### allowedEns?

> `optional` **allowedEns**: `"all"` | `string`\[] | `"claimable"`

**Defined in**

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:42](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L42)

***

#### backendUrl?

> `optional` **backendUrl**: `string`

**Inherited from**

`JustaNameProviderConfig.backendUrl`

**Defined in**

packages/@justaname.id/react/dist/src/lib/providers/JustaNameProvider.d.ts:21

***

#### color?

> `optional` **color**: `object`

**background?**

> `optional` **background**: `string`

**destructive?**

> `optional` **destructive**: `string`

**primary?**

> `optional` **primary**: `string`

**Inherited from**

`JustWeb3ThemeProviderConfig.color`

**Defined in**

packages/@justweb3/ui/dist/src/lib/providers/JustWeb3ThemeProvider/index.d.ts:35

***

#### config?

> `optional` **config**: `Configuration`

**Inherited from**

`JustaNameProviderConfig.config`

**Defined in**

packages/@justaname.id/sdk/dist/src/lib/types/justaname/configuration.d.ts:28

***

#### dev?

> `optional` **dev**: `boolean`

**Inherited from**

`JustaNameProviderConfig.dev`

**Defined in**

packages/@justaname.id/sdk/dist/src/lib/types/justaname/configuration.d.ts:32

***

#### disableOverlay?

> `optional` **disableOverlay**: `boolean`

**Defined in**

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:44](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L44)

***

#### ensDomains?

> `optional` **ensDomains**: `EnsDomains`

**Inherited from**

`JustaNameProviderConfig.ensDomains`

**Defined in**

packages/@justaname.id/sdk/dist/src/lib/types/justaname/configuration.d.ts:30

***

#### logo?

> `optional` **logo**: `string`

**Defined in**

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:43](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L43)

***

#### mApps?

> `optional` **mApps**: (`string` | `object`)\[]

**Defined in**

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:45](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L45)

***

#### networks?

> `optional` **networks**: `Networks`

**Inherited from**

`JustaNameProviderConfig.networks`

**Defined in**

packages/@justaname.id/sdk/dist/src/lib/types/justaname/configuration.d.ts:29

***

#### openOnWalletConnect?

> `optional` **openOnWalletConnect**: `boolean`

**Defined in**

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:41](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L41)

***

#### plugins?

> `optional` **plugins**: [`JustaPlugin`](JustaPlugin.md)\[]

**Defined in**

[packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx:46](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justweb3/widget/src/lib/providers/JustWeb3Provider/index.tsx#L46)

***

#### routes?

> `optional` **routes**: `Partial`<`object`>

**Type declaration**

**addSubnameRoute**

> **addSubnameRoute**: `string`

**currentEnsRoute**

> **currentEnsRoute**: `string`

**revokeSubnameRoute**

> **revokeSubnameRoute**: `string`

**signinNonceRoute**

> **signinNonceRoute**: `string`

**signinRoute**

> **signinRoute**: `string`

**signoutRoute**

> **signoutRoute**: `string`

**Inherited from**

`JustaNameProviderConfig.routes`

**Defined in**

packages/@justaname.id/react/dist/src/lib/providers/JustaNameProvider.d.ts:20

***

#### signOnMounted?

> `optional` **signOnMounted**: `boolean`

**Inherited from**

`JustaNameProviderConfig.signOnMounted`

**Defined in**

packages/@justaname.id/react/dist/src/lib/providers/JustaNameProvider.d.ts:22

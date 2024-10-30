[**@justaname.id/react**](../README.md) • **Docs**

***

[@justaname.id/react](../globals.md) / useMountedAccount

# Function: useMountedAccount()

> **useMountedAccount**(): `object` \| `object` \| `object` \| `object`

A custom hook that wraps the `useAccount` hook from wagmi, incorporating a component mount check.

## Returns

`object` \| `object` \| `object` \| `object`

An enhanced account object that includes all properties and methods from `useAccount`,
along with an improved `isConnected` boolean that also takes the component's mount state into consideration.

## Defined in

[packages/@justaname.id/react/src/lib/hooks/account/useMountedAccount.ts:12](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/account/useMountedAccount.ts#L12)

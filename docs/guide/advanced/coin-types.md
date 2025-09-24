# Coin Types

This section provides a comprehensive explanation on how to understand and use coin types, particularly within EVM (Ethereum Virtual Machine) compatible chains. We will reference formal specifications such as [**SLIP-0044**](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) for non-EVM coins and **ENSIP-11** for EVM compatible chains.

## Introduction to Coin Types

Coin types are identifiers used to uniquely specify the address encoding types of various cryptocurrencies, particularly in the context of deterministic wallets. These identifiers ensure that addresses for different types of coins are distinct and non-colliding.

## Coin Types for Non-EVM Chains

For non-EVM compatible chains, coin types are assigned according to the [SLIP-0044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) standard. This document lists various coin types and their respective cryptocurrencies.

## Coin Types for EVM-Compatible Chains

For EVM compatible chains, the **ENSIP-11** specification extends the basic multi-coin resolution principles introduced in **ENSIP-9**. ENSIP-11 provides a systematic way to derive and manage coin types for EVM chains.

### Abstract

ENSIP-11 dedicates a designated range for coin types for EVM chains, ensuring they do not collide with non-EVM coin types.

### Motivation

The primary motivation of ENSIP-11 is to avoid redundant requests for adding EVM compatible chains into SLIP 44 because most of these chains inherit Ethereum's address encoding type.

### Specification

* **MSB Reserved:** The most-significant bit (MSB) is reserved for EVM chain IDs.
* **Coin Type Derivation:** Compute the coin type for EVM chains by bitwise-ORing the chain ID with `0x80000000`:

```typescript
export const evmChainIdToCoinType = (chainId: number) => { 
  return (0x80000000 | chainId) >>> 0; 
}
```

**Reverse Operation:** To infer the chain ID from a coin type, bitwise-AND the coin type with `0x7fffffff`:

```typescript
export const coinTypeToEvmChainId = (coinType: number) => { 
  return (0x7fffffff & coinType) >> 0; 
}
```

### Implementation

An implementation is provided in the [ensdomains/address-encoder repository](https://github.com/ensdomains/address-encoder).

### Example

To compute the new coin type for an EVM chain (e.g., chain ID 61):

```typescript
import { coinTypeToEvmChainId, evmChainIdToCoinType } from "@ensdomains/address-encoder/utils";

console.log(evmChainIdToCoinType(61)); // Outputs: 2147483709
console.log(coinTypeToEvmChainId(2147483709)); // Outputs: 61
```

### Exceptions

Some EVM chains have specific considerations:

* **AVAX:** AVAX has multiple chain address formats, only `c` chain is EVM compatible.
* **RSK:** RSK requires additional validation.

These chains will continue using coin types as defined in SLIP44.

### Backward Compatibility

The following EVM compatible coin types were defined before this new standard and should be appended with `_LEGACY` for backward compatibility:

* NRG
* POA
* TT
* CELO
* CLO
* TOMO
* EWT
* THETA
* GO
* FTM
* XDAI
* ETC

When these are displayed, append `_LEGACY` to the coin type and mark them as read-only.

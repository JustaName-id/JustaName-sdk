---
id: resolve-a-name
title: Resolving a Name
sidebar_label: Resolve a Name
slug: /how-to/resolve-a-name
---

# Resolve a Name

## Overview

This guide demonstrates how to resolve names to their attached addresses in a chain-agnostic manner. This means any address from any blockchain can be associated with a name, and the name can consequently be resolved to any of these attached addresses.

We'll cover two methods for achieving this:

1. Using the `@ensdomains/ensjs` package.
2. Using the `@justaname.id/sdk` package.

## Method 1: Using `@ensdomains/ensjs`

The `@ensdomains/ensjs` package is a powerful tool that enables domain name resolution, particularly for the Ethereum Name Service (ENS). Below, you'll find an example of how to use this package to resolve multiple blockchain addresses associated with a single domain name.

### Installation

First, ensure you have the necessary packages:

```sh
npm install @ensdomains/ensjs viem
```

### Code Example

Below is an example code snippet using `@ensdomains/ensjs`:

```javascript
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { addEnsContracts } from '@ensdomains/ensjs';
import { getRecords } from '@ensdomains/ensjs/public';

const client = createPublicClient({
  chain: addEnsContracts(mainnet),
  transport: http(),
});

const main = async () => {
  const result = await getRecords(client, {
    name: 'justghadi.justan.id',
    texts: ['com.twitter', 'avatar', 'email'],
    coins: ['60', '0', '2147483658', '2147483785', '2147492101', '2147542792'],
    contentHash: true,
  });
  console.log({ result });
};

main();
```

### Explanation

- **Texts**: These are the traditional DNS records like `twitter handle`, `avatar`, `email`, etc.
- **Coins**: These represent different blockchain addresses:
  - `"60"`: Ethereum
  - `"0"`: Bitcoin
  - `"2147483658"`: Optimism
  - `"2147483785"`: Polygon
  - `"2147492101"`: Base
  - `"2147542792"`: Linea
- The `main()` function fetches and prints the records associated with the specified name.

## Method 2: Using `@justaname.id/sdk`

The `@justaname.id/sdk` package is another versatile tool for name resolution, which supports the resolution of names across different chains.

### Installation

Ensure you have the required package:

```sh
npm install @justaname.id/sdk
```

### Code Example

Below is an example code snippet using `@justaname.id/sdk`:

```javascript
import { JustaName } from '@justaname.id/sdk';

const main = async () => {
  const justaName = await JustaName.init({});

  const records = await justaName.subnames.getRecordsByFullName({
    fullName: 'justghadi.justan.id',
    chainId: 1,
    providerUrl: 'https://ethereum-rpc.publicnode.com',
  });

  console.log({ records });
};

main();
```

### Explanation

- **fullName**: The full name to resolve.
- **chainId**: The blockchain ID. `1` stands for Ethereum mainnet.
- **providerUrl**: URL of the ethereum RPC provider.
- The `main()` function initializes the `JustaName` SDK and fetches all records associated with the specified name.

**Note**: The `@justaname.id/sdk` package will return all records attached to the name, making it a comprehensive solution to retrieve all necessary information linked to a name.

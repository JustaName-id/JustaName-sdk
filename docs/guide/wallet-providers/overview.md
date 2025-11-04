---
description: >-
  This section will cover examples of setting up the JustWeb3 Widget with
  different wallet providers:
---

# Overview

**RainbowKit**: A widely-used wallet connection framework that simplifies the integration of multiple wallet providers such as **Argent**, **Trust Wallet**, and **Ledger**. By combining **RainbowKit** with the JustWeb3 Widget, you can provide users with a seamless experience for connecting and managing wallets alongside ENS-based features.

{% content-ref url="rainbowkit.md" %}
[rainbowkit.md](rainbowkit.md)
{% endcontent-ref %}

Privy: An embedded wallet provider that creates wallets automatically upon user login, supporting various authentication methods like email and SMS. This allows users to manage their wallets without needing to set them up manually.

{% content-ref url="privy.md" %}
[privy.md](privy.md)
{% endcontent-ref %}

Coinbase Smart Wallet: A robust and secure wallet solution provided by **Coinbase**, which can be integrated using **Wagmi**. This smart wallet enables users to interact with both mainnet and testnet environments (such as **Sepolia**) while utilizing the JustWeb3 Widget for ENS management and decentralized identity features.

{% content-ref url="coinbase-smart-wallet.md" %}
[coinbase-smart-wallet.md](coinbase-smart-wallet.md)
{% endcontent-ref %}

Each wallet provider has been integrated using **Wagmi** for easy blockchain interaction, and the JustWeb3 Widget is leveraged to handle ENS-based sign-ins, user identity verification, and more.

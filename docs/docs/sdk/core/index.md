---
id: "index"
title: "@justaname.id/sdk"
sidebar_label: "Readme"
sidebar_position: 0
custom_edit_url: null
---

# JustaName Core SDK

The JustaName Core SDK empowers developers to seamlessly integrate robust digital identity and subnaming features into their Web3 applications. It simplifies the complexities of blockchain addresses by enabling the use of human-readable subdomains within the Ethereum Name Service (ENS).

## Key Features
- **User-Friendly Addresses**: Replace unwieldy blockchain addresses with memorable subnames (e.g., 'yourname.eth').
- **Secure Sign-In (SIWE)**: Implement Ethereum-based authentication without centralized systems.
- **Subname Management**: Create, reserve, update, and revoke subdomains with ease.
- **Cross-Chain Compatibility**: Support interactions across various blockchain networks.

## Installation

```bash
npm install @justaname.id/sdk
```

## Configuration

Obtain an API Key and initialize the SDK:

```typescript
import { JustaName } from '@justaname.id/sdk';

async function main() {
  const apiKey = 'your-api-key';
  const justaName = await JustaName.init({ apiKey });
  // Your SDK is now ready to be used!
}

main();
```

## Usage Examples

### SIWE: Request a Secure Sign-In Challenge

```typescript
const requestChallengeResponse = await justaName.siwe.requestChallenge({
  chainId: 1,
  origin: 'http://localhost:3333',
  address: '0x59c44836630760F97b74b569B379ca94c37B93ca',
  domain: 'justaname.id',
});
```

### Subnames: Add a New Subname

```typescript
const addedUser = await justaName.subnames.addSubname({
  username: 'testuser',
  ensDomain: 'justaname.id',
  chainId: 1,
});
```

## Error Handling

```typescript
try {
  // SDK operations
} catch (error) {
  console.error("Error:", error.message);
}
```

## Security

The JustaName SDK prioritizes security and privacy with encrypted communication and responsible data handling practices.

## Get Started!

Explore the full documentation and in-depth examples on the JustaName Developer Portal: [https://docs.justaname.io](https://docs.justaname.io).

## Core Methods

A key functionality aspect of the SDK revolves around its methods. Below is a list of available methods within the JustaName SDK's primary classes:

### `JustaName` Class Methods

- `init(configuration: Configuration): Promise<JustaName>`

### `Subnames` Class Methods
- `claimSubname(params: SubnameClaimRequest, headers: SIWEHeaders): Promise<SubnameClaimResponse>`
- `reserveSubname(params: SubnameReserveRequest): Promise<SubnameReserveResponse>`
- `addSubname(params: SubnameAddRequest, headers: SIWEHeaders): Promise<SubnameAddResponse>`
- `updateSubname(params: SubnameUpdateRequest, headers: SIWEHeaders): Promise<SubnameUpdateResponse>`
- `revokeSubname(params: SubnameRevokeRequest, headers: SIWEHeaders): Promise<SubnameRevokeResponse>`
- `getByDomainNameChainId(params: SubnameGetByDomainNameChainIdRequest): Promise<SubnameGetByDomainNameChainIdResponse>`
- `getBySubname(params: SubnameGetBySubnameRequest): Promise<SubnameGetBySubnameResponse>`
- `getAllByAddress(params: SubnameGetAllByAddressRequest): Promise<SubnameGetAllByAddressResponse[]>`
- `getInvitations(params: SubnameGetAllByAddressRequest): Promise<SubnameGetAllByAddressResponse[]>`
- `checkSubnameAvailable(params: IsSubnameAvailableRequest): Promise<IsSubnameAvailableResponse>`
The SDK addresses operations related to securely signing in users with Ethereum addresses, managing, creating, and utilizing subnames, and integrating these features seamlessly into Web3 applications to enhance user identity and community building. The operations cover a broad array of functionalities, from basic subname management to more complex user-centric digital identity enhancements.

## Error Handling

The SDK provides clear and actionable feedback in case of errors, such as missing API keys or invalid requests, ensuring seamless troubleshooting.

```typescript
try {
  const result = await justaName.subnames.reserveSubname({ /* parameters */ });
} catch (error) {
  console.error("Error reserving subname:", error.message);
}
```

## Security and Privacy

JustaName SDK is designed with security and privacy at its core. All communication is encrypted, and user data is handled according to the highest standards of Web3 privacy practices.

## Conclusion

The JustaName SDK is your gateway to integrating sophisticated digital identity and subnaming functionalities into your applications, improving the overall user experience in the Web3 ecosystem. By simplifying complex processes and enhancing digital interactions, JustaName empowers developers and users alike, paving the way for a more accessible and connected digital world.

For more detailed documentation and additional use cases, please visit [JustaName's Documentation](https://docs.justaname.io).

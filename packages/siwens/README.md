# SIWENS (Sign-In with ENS)

SIWENS is an extension of the **Sign-In with Ethereum (SIWE)** protocol, designed to provide enhanced security and convenience by including ENS (Ethereum Name Service) domain ownership verification in the authentication process. Inspired by the original SIWE specification, SIWENS allows users to sign in using both their Ethereum account and ENS domain, offering a decentralized and user-friendly authentication experience.

## Motivation

Today, most users sign in to online services using centralized identity providers (IdPs), such as large tech companies, which control access to user identifiers like email addresses. This centralization often leads to misaligned incentives between users and service providers.

**SIWENS** introduce a new, decentralized alternative where users can authenticate directly with their Ethereum wallet and ENS domain. SIWENS enhances this experience by not only verifying the Ethereum wallet but also confirming that the wallet address owns the ENS domain used during sign-in. This reduces dependency on centralized systems and gives users more control over their digital identities.

## How SIWENS Works

SIWENS extends the SIWE workflow by adding ENS verification steps, ensuring that the ENS domain used during sign-in is actually owned by the wallet signing the message. Here’s how it works:

1. **User connects their Ethereum wallet** and signs a message, including their ENS domain (e.g., `justaname.eth`).
2. **The signed message, containing the ENS domain,** is sent to the backend server.
3. **Backend server verifies:**
    - The signature matches the Ethereum wallet address.
    - The Ethereum wallet address owns the provided ENS domain.
4. **Once verified, the backend server** can create a session or issue a JSON Web Token (JWT) containing both the user’s wallet address and their ENS domain.

## Benefits of SIWENS

- **Enhanced Security**: SIWENS verifies that the wallet signing the message is the legitimate owner of the ENS domain, adding an additional layer of security compared to standard SIWE.
- **Simplified User Experience**: Users can authenticate using their ENS domain (e.g., `justaname.eth`), which is easier to remember than a long wallet address.
- **Decentralized Authorization**: Platforms can use metadata stored in ENS domains (e.g., user roles, permissions) for role-based access control, allowing for decentralized authorization based on ENS data without relying on centralized servers.

## Quickstart Example

Here’s a step-by-step example of how to use SIWENS to authenticate a user by verifying their Ethereum wallet and ENS domain ownership.

### Installation

Install the package using npm or yarn:

```bash
npm install siwens

# or

yarn add siwens
```

### Example Usage
```typescript
import { SIWENS, InvalidENSException } from 'siwens';
import { Wallet } from 'ethers';

// Define your provider URL (e.g., Infura)
const infuraProjectId = 'YOUR_INFURA_PROJECT_ID';
const providerUrl = 'https://mainnet.infura.io/v3/' + infuraProjectId;

// const signer = Wallet.createRandom();
const signer = new Wallet('YOUR_PRIVATE_KEY');

async function signInUser() {
   const siwens = new SIWENS({
      params: {
         domain: 'example.com',       // The domain you're authenticating for
         uri: 'https://example.com',  // The URI of the dApp
         chainId: 1,                   // The chain ID of the network
         ttl: 3600000,                // Time-to-Live (TTL) in milliseconds (1 hour)
         ens: 'user.example.eth',     // The ENS name being used
         statement: 'Signing into dApp',  // Optional custom sign-in statement
         address: signer.address
      },
      providerUrl
   });
   const message = await siwens.prepareMessage();
   const signature = await signer.signMessage(message);
   return {signature, message};
}

// Verifying a user's sign-in request
async function verifyUserSignature(signature, message) {
   try {
      const siwe =  new SIWENS({
         params: message,
         providerUrl
      })

      const verification = await siwe.verify({
         signature: signature,
      });

      console.log('ENS Sign-in successful!', verification.ens);
   } catch (error) {
      console.error('Error during verification:', error);
      if (error instanceof InvalidENSException) {
         console.error('ENS Verification Failed:', error.message);
      } else {
         console.error('Error during verification:', error);
      }
   }
}

// Example usage
signInUser().then(async ({message, signature}) => {
   await verifyUserSignature(signature, message);
});
```

### Contributing
Contributions are welcome! If you have suggestions or find issues, please open an issue or submit a pull request on the GitHub repository.
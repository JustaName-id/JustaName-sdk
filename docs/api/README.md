# Introduction

JustaName simplifies the management of ENS domains and subnames, offering a set of APIs that facilitate operations such as:

* **Subname Management**: Reserve, accept, add, update, and revoke ENS subnames.
* **Authentication via SIWE**: Authenticate users using the Sign-In with Ethereum (SIWE) protocol.
* **Primary Name Management**: Manage primary ENS names associated with Ethereum addresses.
* **mApp Integration**: Extend functionalities through mApps (metadata Applications), allowing dynamic updates to ENS metadata by trusted third parties.

By leveraging the JustaName API, developers can seamlessly integrate ENS functionalities into their applications, enhancing user experiences with decentralized naming systems.

#### Key Features

* **Simplified ENS Interaction**: Manage ENS subnames without dealing directly with smart contracts.
* **Secure User Authentication**: Utilize SIWE for secure, decentralized authentication.
* **Flexible Integration**: Designed to be flexible and adaptable to various application needs.
* **mApp Support**: Benefit from trustworthy, real-time updates while keeping users in control of their data.
* **Multi-Network Support**: Operate on Ethereum Mainnet (chain ID 1) and Sepolia Testnet (chain ID 11155111).

#### Authentication

Authentication is handled via HTTP headers and, when necessary, signed messages to verify ownership of Ethereum addresses. Common headers used include:

* `x-api-key`: Your API key for authenticated requests (required for certain endpoints).
* `x-signature`: The signature of the message, used to verify ownership.
* `x-message`: The original message that was signed.
* `x-address`: The Ethereum address associated with the signature.

### API Categories

The JustaName API is divided into the following main categories:

#### 1. **SIWE (Sign-In with Ethereum)**

* **Authentication**: Request and verify challenge messages securely.

#### 2. Subname **Management**

* **Reservation**: Reserve subnames for users or applications.
* **Acceptance**: Finalize the claim of reserved subnames.
* **Creation**: Add new subnames under a specified ENS domain.
* **Updating**: Modify addresses, text records, or other data linked to a subname.
* **Revocation**: Remove subnames from active use.

#### 3. **Primary Name Management**

* **Retrieval**: Retrieve primary ENS names associated with Ethereum addresses.
* **Setting**: Set or update primary names for user identities.

#### 4. **mApp Integration**

Manage permissions and data for mobile applications interacting with JustaName.

* **Add mApp Permission:** Grants a trusted third-party application permission to update specific metadata fields of a user's subname dynamically.
* **Append mApp Field** Allows an mApp to append or update data fields in a user's subname metadata.
* **Revoke mApp Permission** Revokes a third-party application's permission to interact with a user's subname metadata.

### Getting Started

To begin using the JustaName API:

1. **Obtain an API Key**: If required, register and obtain an API key from [https://dashboard.justaname.id](https://dashboard.justaname.id)
2. **Explore the API**: Familiarize yourself with the API categories and endpoints.
3. **Integrate Endpoints**: Use the base URLs and appropriate headers to integrate the API into your application.

For detailed information on each API endpoint, including request and response examples, please refer to the specific sections in the documentation.

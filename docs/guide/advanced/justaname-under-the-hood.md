# JustaName - Under the Hood

The principal objective of JustaName is to enable users to write data without needing to execute a transaction on the blockchain.

This is achieved by storing the ENS data offchain. Therefore, while the data necessary to resolve a name to an address or retrieve the metadata attached to an address remains available, these operations can be performed without incurring the gas fees associated with on-chain transactions. This makes JustaName a cost-effective solution for working with ENS data.

JustaName offers the unique advantage of leveraging [CCIP-Read](https://eips.ethereum.org/EIPS/eip-3668) technology.

## Leveraging ERC-3668: CCIP-Read

CCIP-Read enables secure reading of offchain data, providing users with a way to access information residing offchain without compromising on the security standards that blockchain environments are recognized for.

By leveraging the capabilities of CCIP-Read, JustaName ensures that data can be manipulated offchain, while still maintaining trust in the data’s validity and integrity. This is crucial, ensuring that while the data is stored offchain, it remains verifiable and can't be altered or manipulated without detection.

## Resolving a Name with JustaName: A Detailed CCIP-Read Flow

ERC-3668 is at the heart of JustaName’s operation. The steps are meticulous and intricate consisting of fail signaling of the contract, subsequent communication with the Gateway, and callback to the contract. Below we present a detailed breakdown of the steps using the CCIP-Read technique within JustaName.

1. **Querying the Contract** As the request to resolve a name is initiated, it is received by the ENS Registry contract. If the resolver for the requested name points to the JustaName resolver, the name resolution request is directed accordingly. The JustaName Resolver contract, requiring off-chain data, intentionally fails with an **`OffchainLookup`** error. This error message carries vital information – it contains the URL of the gateway, which is the access point to JustaName's offchain storage, and **`extraData`** that is utilized in subsequent steps.
2. **Querying the Gateway** After the **`OffchainLookup`** error, the client retrieves the URL from the error message and makes a call to the gateway. This gateway call is made with the **`callData`** extracted from the **`OffchainLookup`** error message. The gateway is linked with the offchain storage and responds to this call request by providing the requisite data, however, its content, designed to maintain security, is opaque to the client.
3. **Making Transaction to Contract** With the data fetched from the gateway, the client now makes a call back to the original contract i.e., the JustaName Resolver. The client provides the response data received from the gateway along with the **`extraData`** from Step 1. The contract subsequently validates the received data against its offchain counterpart, validating the legitimacy and reliability of the data.

It's essential to note, the JustaName Resolver contract interface is structured to adhere to the CCIP-read protocol specifics. Alongside the failure error method of **`OffchainLookup`**, it also carries a callback function to decode the data returned by the gateway and validate the data's authenticity.

If the sequence of steps – calls and callbacks – are successfully executed, the data from Step 3's call will be relayed to the client as if it was returned by the originally called function. This entire process, though complex, is designed to be seamless and invisible to the client, allowing them to efficiently and securely resolve a name with JustaName, without even knowing they're accessing offchain data.




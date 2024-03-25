import React from 'react'
import {
    configureChains,
    createConfig,
    mainnet,
    sepolia,
    useAccount,
    useConnect,
    useDisconnect, useSignMessage,
    WagmiConfig
} from "wagmi";
import {alchemyProvider} from "wagmi/providers/alchemy";
import {publicProvider} from "wagmi/providers/public";
import {MetaMaskConnector} from "wagmi/connectors/metaMask";
import {CoinbaseWalletConnector} from "wagmi/connectors/coinbaseWallet";
import {WalletConnectConnector} from "wagmi/connectors/walletConnect";
import {InjectedConnector} from "wagmi/connectors/injected";

export const ConnectWallet = () => {

    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()

    return(
        <div>
            {connectors.map((connector) => (
                <button
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                </button>
            ))}

            {error && <div>{error.message}</div>}
        </div>
    )

}

export const SignMessageBox = () => {

    const [message, setMessage] = React.useState('')
    const [signature, setSignature] = React.useState('')
    const { address } =
        useAccount()

    const { signMessageAsync } = useSignMessage()

    const handleSignMessage = async () => {
        const signature = await signMessageAsync({
            message: message.replace(/\\n/g, '\n'),
        })
        setSignature(signature)
    }


    return(
        <div>
            <div>Sign a message:</div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            {
                signature &&
                    <div>
                        <div>
                            Payload:

                            {'\n{\n'}
                            {'  "address": "' + address + '",\n'}
                            {'  "message": "' + message + '",\n'}
                            {'  "signature": "' + signature + '"\n'}
                            {'}'}

                        </div>
                    </div>
            }
            <button onClick={handleSignMessage}>Sign</button>
        </div>
    )
}

export const SignOrConnectComponent = () => {


    const { address} =
        useAccount()
    const { disconnect } = useDisconnect()

    return(
        <div>
            {
                address?
                    <div>
                        <div>Address: {address}</div>
                        <SignMessageBox />
                        <button onClick={() => disconnect()}>Disconnect</button>
                    </div>
                    :
                    <div>
                        Connect your wallet to sign a message.
                        <ConnectWallet/>
                    </div>
            }
        </div>
    )

}

export const SignMessage = () => {

    const { chains, publicClient, webSocketPublicClient } = configureChains(
        [mainnet, sepolia],
        [alchemyProvider({ apiKey: 'kRtwwvKDo90OtAQfwwn6up27KPdraJM' }), publicProvider()],
    )

// Set up wagmi config
    const config = createConfig({
        autoConnect: true,
        connectors: [
            new MetaMaskConnector({ chains }),
            // new CoinbaseWalletConnector({
            //     chains,
            //     options: {
            //         appName: 'wagmi',
            //     },
            // }),
            // new WalletConnectConnector({
            //     chains,
            //     options: {
            //         projectId: '...',
            //     },
            // }),
            new InjectedConnector({
                chains,
                options: {
                    name: 'Injected',
                    shimDisconnect: true,
                },
            }),
        ],
        publicClient,
        webSocketPublicClient,
    })



    return (
        <WagmiConfig config={config}>
            <SignOrConnectComponent/>
        </WagmiConfig>
    )
}
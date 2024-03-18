import "@ethersproject/shims";
import '@walletconnect/react-native-compat';
import 'react-native-url-polyfill/auto';
import { useAccountSubnames, useClaimSubname, useIsSubnameAvailable } from '@justaname.id/react';
import { W3mButton } from '@web3modal/wagmi-react-native';
import { ethers } from "ethers";
import React, { useState } from 'react';
import { ActivityIndicator, Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useDebounced } from "../hooks/useDebounced";


export default function HomeScreen() {
    const [inputValue, setInputValue] = useState('');
    const [randomWallet, setRandomWallet] = useState({} as ethers.HDNodeWallet);
    // Wagmi

    const {
        value: debouncedSubdomain,
    } = useDebounced(
        inputValue,
        200,
    );

    const { subnames } = useAccountSubnames();
    const { isAvailable } = useIsSubnameAvailable({
        subname: debouncedSubdomain,
        ensDomain: process.env.EXPO_PUBLIC_ENS_DOMAIN as string,
    })
    const { claimSubname } = useClaimSubname();

    const handleGenerateWallet = async () => {
        const wallet = ethers.Wallet.createRandom();
        setRandomWallet(wallet);
    }

    const handleAddSubdomain = async () => {
        return await claimSubname({
            username: inputValue,
        });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.text}>JAN WALLET TEST</Text>
                    <Text style={styles.subText}>Connect ur wallet</Text>
                    <W3mButton />
                    <Text style={[styles.subText, { marginTop: 10 }]}>Or generate random wallet on each click</Text>
                    <Button
                        title={"Generate wallet"}
                        onPress={handleGenerateWallet}
                    />
                    <Text style={[styles.subText, { marginTop: 10 }]}>{randomWallet.address ?? "No Generated Wallet"}</Text>
                    <TextInput
                        style={[styles.input, {
                            borderColor: isAvailable
                                ? 'lightgreen'
                                : 'red',
                        }]}
                        placeholder="Enter your string"
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                    <Button
                        title="Claim"
                        onPress={handleAddSubdomain}
                        disabled={!isAvailable}
                    />
                    {debouncedSubdomain.length > 2 &&
                        <ActivityIndicator
                            size="large"
                            color="black"
                            animating={true}
                        />
                    }
                    <Text style={styles.subText}>Current Subdomains</Text>
                    <View>
                        {subnames.map((subdomain) => (
                            <Text key={subdomain.id}>{subdomain.subname}</Text>
                        ))}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        width: '90%',
        marginVertical: 12,
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 20,
    },
});
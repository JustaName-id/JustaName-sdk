import "@ethersproject/shims";
import { useAccountSubnames, useAddSubname, useIsSubnameAvailable } from '@justaname.id/react/src';
import '@walletconnect/react-native-compat';
import { W3mButton } from '@web3modal/wagmi-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import 'react-native-url-polyfill/auto';
import { useDebounced } from "../hooks/useDebounced";


export default function HomeScreen() {
    const [inputValue, setInputValue] = useState('');
    // Wagmi

    const {
        value: debouncedSubdomain,
    } = useDebounced(
        inputValue,
        200,
    );

    const { subnames } = useAccountSubnames();
    const { isAvailable, isLoading } = useIsSubnameAvailable({
        username: debouncedSubdomain,
        ensDomain: process.env.EXPO_PUBLIC_ENS_DOMAIN as string,
    })
    const { claimSubname } = useAddSubname();

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
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input,
                            {
                                borderColor:
                                    isAvailable
                                        ? 'lightgreen'
                                        : 'red',
                            }
                            ]}
                            placeholder="Enter your string"
                            value={inputValue}
                            onChangeText={setInputValue}
                        />
                        <Text style={styles.domainText}>.{process.env.EXPO_PUBLIC_ENS_DOMAIN}</Text>
                    </View>
                    <Button
                        title="Claim"
                        onPress={handleAddSubdomain}
                        disabled={!isAvailable}
                    />
                    {debouncedSubdomain.length > 2 && isLoading &&
                        <ActivityIndicator
                            size="large"
                            color="black"
                            animating={true}
                            style={{ marginTop: 20 }}
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
        paddingHorizontal: 20,
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
        marginTop: 20,
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
    inputContainer: {
        position: 'relative',
        width: '100%',
    },
    domainText: {
        position: 'absolute',
        right: 28,
        top: 22,
        fontSize: 15,
        color: 'black'
    }
});
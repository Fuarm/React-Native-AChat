import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Pressable,
    TextInput,
    ActivityIndicator,
    Alert
} from 'react-native';
import { Voximplant } from 'react-native-voximplant';

import commonStyles from '../../common/style';
import { ACCOUNT_NAME, APPLICATION_NAME } from '../../constants';
import styles from './style';

export default function SignIn() {

    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [signInDisabled, setSignInDisabled] = useState(false);
    
    const navigation = useNavigation();
    const voxClient = Voximplant.getInstance()

    useEffect(() => {
        (async () => {
            const state = await voxClient.getClientState();
            if (state === Voximplant.ClientState.DISCONNECTED) {
                await voxClient?.connect();
            }
            if (state === Voximplant.ClientState.LOGGED_IN) {
                // 重定向
                redirectChat();
            }
        })();
    }, []);

    const signUp = () => navigation.navigate('SignUp');

    const handleSignIn = async () => {
        if ( !username || !password ) return;
        setSignInDisabled(true);
        await login();
        setSignInDisabled(false);
    }

    const login = async () => {
        try {
            const authResult = await voxClient?.login(`${username}@${APPLICATION_NAME}.${ACCOUNT_NAME}.voximplant.com`, password);
            // 登录成功存放token
            // 重定向到token
            console.log("Sign in success!", authResult);
            // 重定向
            redirectChat();
        } catch (e) {
            // 登录失败
            console.log('Sign in error!', e);
            Alert.alert(e.name, `Sign in error! Code: ${e.code}`)
        }
    }

    const redirectChat = () => navigation.reset({index: 0,routes: [{name: 'Root'}]});

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={[commonStyles.flex, commonStyles.background]}
        >
            <ScrollView style={commonStyles.flex} contentContainerStyle={styles.root}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Sign in</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Don’t have an account?</Text>
                        <Pressable onPress={signUp}>
                            <Text style={commonStyles.themeTextColor}>Sign up</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.thirdSignInContainer}>
                    <View style={styles.thirdSignInButton}>
                        {/* <FontAwesome name="google" size={24} color="white" /> */}
                        <Text style={styles.thirdSignInButtonText}>Sign in with Google</Text>
                    </View>
                    <View style={[styles.thirdSignInButton, {backgroundColor: '#333333'}]}>
                        {/* <FontAwesome name="github" size={24} color="white" /> */}
                        <Text style={styles.thirdSignInButtonText}>Sign in with GitHub</Text>
                    </View>
                </View>
                {/* <DashedDivider /> */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email/Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='email/username'
                        clearButtonMode='while-editing'
                        enablesReturnKeyAutomatically
                        returnKeyType='done'
                        value={username}
                        onChangeText={value => setUsername(value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='password'
                        clearButtonMode='while-editing'
                        enablesReturnKeyAutomatically
                        returnKeyType='done'
                        secureTextEntry
                        value={password}
                        onChangeText={value => setPassword(value)}
                    />
                </View>
                <Pressable
                    style={[styles.signInButton, commonStyles.themeBackgroundColor, signInDisabled?styles.signInDisabled:null]}
                    onPress={handleSignIn}
                    disabled={signInDisabled}
                >
                    {
                        signInDisabled
                        ? <ActivityIndicator />
                        : <Text style={styles.signInButtonText}>Sign in</Text>
                    }
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
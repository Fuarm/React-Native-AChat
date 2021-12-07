import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';

import commonStyles from '../../common/style';
import styles from '../SignInScreen/style';
import { useNavigation } from '@react-navigation/native';
import { Fetch } from '../../utils';

export default function SignUpScreen() {
    const [nickname, setNickname] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [signUpDisabled, setSignUpDisabled] = useState(false);
    
    const navigation = useNavigation();

    const signIn = () => navigation.goBack();

    const handleSignUp = async () => {
        if (!nickname || !username || !password ) return;
        setSignUpDisabled(true);
        try {
            const resPromise = await Fetch.get('platform_api/AddUser', {
                user_name: username,
                user_display_name: nickname,
                user_password: password,
            })
            const {result, error} = await resPromise.json();
            if(result) {
                setNickname('');
                setPassword('');
                setUsername('');
                Alert.alert('success', 'Sgin up success!');
            }
            error && Alert.alert('fail', 'code：' + error.code + '，' + error.msg);
        } catch (e) {
            console.log("Sign up error!", e);
        }
        setSignUpDisabled(false);
    }
    
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={[commonStyles.flex, commonStyles.background]}
        >
            <ScrollView style={commonStyles.flex} contentContainerStyle={styles.root}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Sign up</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Already have an account?</Text>
                        <Pressable onPress={signIn}>
                            <Text style={commonStyles.themeTextColor}>Sign in</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='username'
                        clearButtonMode='while-editing'
                        enablesReturnKeyAutomatically
                        returnKeyType='done'
                        value={username}
                        onChangeText={value => setUsername(value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Nickname</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='nickname'
                        clearButtonMode='while-editing'
                        enablesReturnKeyAutomatically
                        returnKeyType='done'
                        value={nickname}
                        onChangeText={value => setNickname(value)}
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
                    style={[styles.signInButton, commonStyles.themeBackgroundColor, signUpDisabled?styles.signInDisabled:null]}
                    onPress={handleSignUp}
                    disabled={signUpDisabled}
                >
                    {
                        signUpDisabled
                        ? <ActivityIndicator />
                        : <Text style={styles.signInButtonText}>Sign up</Text>
                    }
                </Pressable>
                <Text style={styles.signUpTip}>
                    <Text style={styles.text}>By clicking the button, you agree to the </Text>
                    <Text style={commonStyles.themeTextColor}>Terms of service </Text>
                    <Text style={styles.text}>, </Text> 
                    <Text style={commonStyles.themeTextColor}>Acceptable use policy </Text>
                    <Text style={styles.text}>and </Text>
                    <Text style={commonStyles.themeTextColor}>Privacy policy</Text>
                    <Text style={styles.text}>.</Text>
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
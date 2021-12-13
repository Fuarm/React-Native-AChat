import React, { useEffect, useRef, useState } from 'react';
import { Alert, PermissionsAndroid, Platform, StatusBar, Text, View } from 'react-native';

import commonStyles from '../../common/style';
import styles from './style';
import CallFooter from '../../components/CallFooter';
import { useNavigation, useRoute } from '@react-navigation/native';
import { User } from '../../types';

import { Voximplant } from 'react-native-voximplant';

export default function CallingScreen () {
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [callStatus, setCallStatus] = useState('Initialization...');
    const navigation = useNavigation();
    const { user_display_name, user_name, user_id } = useRoute()?.params as User;

    const call = useRef();
    
    const voxClient = Voximplant.getInstance();

    useEffect(() => {
        const getPermisions = async () => {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);

            if (
                granted[PermissionsAndroid.PERMISSIONS.CAMERA] !== 'granted' ||
                granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] !== 'granted'
            ) {
                Alert.alert('Permissions granted');
            } else {
                setPermissionGranted(true);
            }
        }
        Platform.OS === 'android' ? getPermisions() : setPermissionGranted(true);
    }, []);

    useEffect(() => {
        if (!permissionGranted) return;

        const callSettings = {
            video: {
                receiveVideo: true,
                sendVideo: true
            }
        }
        
        const { Failed, ProgressToneStart, Connected, Disconnected } = Voximplant.CallEvents;

        const makeCall = async () => {
            call.current = await voxClient.call(user_name, callSettings);
            subscribeToCallEvent();
        }

        const subscribeToCallEvent = () => {
            call.current?.on(Failed, callEvent => alertError(callEvent.reason));
            call.current?.on(ProgressToneStart, callEvent => setCallStatus('Calling...'));
            call.current?.on(Connected, callEvent => setCallStatus('Connected...'));
            call.current?.on(Disconnected, callEvent => navigation.goBack());
        }

        const unsubscribeToCallEvent = () => {
            call.current?.off(Failed);
            call.current?.off(ProgressToneStart);
            call.current?.off(Connected);
            call.current?.off(Disconnected);
        }

        const alertError = (reason) => {
            Alert.alert('Call Failed', `reason: ${reason}`,[
                {
                    text: 'OK',
                    onPress: navigation.goBack
                }
            ]);
        }

        makeCall();

        return unsubscribeToCallEvent;
    }, [permissionGranted])

    const onHangup = () => call.current?.hangup();

    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={styles.root}>
                <View style={commonStyles.flex}>
                    <Text style={styles.name}>Call {user_display_name}</Text>
                    <Text style={styles.phone}>{callStatus}</Text>
                </View>
                <View style={styles.cardVideo}>
                </View>
                <CallFooter {...{onHangup}} />
            </View>
        </>
    );
}
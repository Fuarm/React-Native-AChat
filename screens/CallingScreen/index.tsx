import React, { useEffect, useRef, useState } from 'react';
import { Alert, PermissionsAndroid, Platform, StatusBar, Text, View } from 'react-native';

import commonStyles from '../../common/style';
import styles from './style';
import CallFooter from '../../components/CallFooter';
import { useNavigation, useRoute } from '@react-navigation/native';
import { User } from '../../types';

import { Voximplant } from 'react-native-voximplant';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

export default function CallingScreen () {
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [callStatus, setCallStatus] = useState('Initialization...');
    const [localVideoStreamId, setLocalVideoStreamId] = useState();
    const [remoteVideoStreamId, setRemoteVideoStreamId] = useState();
    
    const navigation = useNavigation();
    const { user_display_name, user_name, call: incomingCall, isIncomingCall } = useRoute()?.params as User & { call: any, isIncomingCall: boolean };

    const call = useRef(incomingCall);
    const endpoint = useRef(null);
    
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
        
        const {
            Failed,
            ProgressToneStart,
            Connected,
            Disconnected,
            LocalVideoStreamAdded,
            EndpointAdded,
        } = Voximplant.CallEvents;

        const { RemoteVideoStreamAdded } = Voximplant.EndpointEvents;

        const makeCall = async () => {
            call.current = await voxClient.call(user_name, callSettings);
            subscribeToCallEvent();
        }

        const answerCall = async () => {
            subscribeToCallEvent();
            endpoint.current = call.current.getEndpoints()[0];
            subscribeToEndpointEvent();
            call.current?.answer(callSettings);
        }

        const subscribeToCallEvent = () => {
            call.current?.on(Failed, callEvent => alertError(callEvent.reason));
            call.current?.on(ProgressToneStart, callEvent => setCallStatus('Calling...'));
            call.current?.on(Connected, callEvent => setCallStatus('Connected'));
            call.current?.on(Disconnected, callEvent => navigation.goBack());
            call.current?.on(LocalVideoStreamAdded, callEvent => setLocalVideoStreamId(callEvent.videoStream.id));
            call.current?.on(EndpointAdded, callEvent => {
                endpoint.current = callEvent.endpoint;
                subscribeToEndpointEvent();
            });
        }

        const unsubscribeToCallEvent = () => {
            call.current?.off(Failed);
            call.current?.off(ProgressToneStart);
            call.current?.off(Connected);
            call.current?.off(Disconnected);
            call.current?.off(LocalVideoStreamAdded);
            call.current?.off(EndpointAdded);
        }

        const subscribeToEndpointEvent = () => {
            endpoint.current?.on(RemoteVideoStreamAdded, callEvent => {
                setRemoteVideoStreamId(localVideoStreamId);
                setLocalVideoStreamId(callEvent.videoStream.id)
            });
        }

        const unsubscribeToEndpointEvent = () => {
            endpoint.current?.off(RemoteVideoStreamAdded);
        }

        const alertError = (reason) => {
            Alert.alert('Call Failed', `reason: ${reason}`,[
                {
                    text: 'OK',
                    onPress: navigation.goBack
                }
            ]);
        }

        incomingCall ? answerCall() : makeCall();

        return () => {
            unsubscribeToCallEvent();
            unsubscribeToEndpointEvent();
        };
    }, [permissionGranted])

    const onHangup = () => call.current?.hangup();

    return (
        <>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['rgba(255,50,50,0.2)', '#rgba(50,255,50,0.2)', 'rgba(25,25,255,0.4)']}
                start={{x: -0.5, y: 0.1}}
                end={{x: 1.5, y: 0.8}}
                style={commonStyles.flex}
            >
                <BlurView blurAmount={50} blurType="dark" style={[commonStyles.flex, styles.blur]} />
                <View style={styles.root}>
                    <View style={commonStyles.flex}>
                        <Text style={styles.name}>Call {user_display_name}</Text>
                        <Text style={styles.phone}>{callStatus}</Text>
                    </View>
                    {
                        remoteVideoStreamId &&
                        <Voximplant.VideoView
                            style={styles.cardVideo}
                            scaleType={Voximplant.RenderScaleType.SCALE_FILL}
                            videoStreamId={remoteVideoStreamId}
                        />
                    }
                    <CallFooter {...{onHangup}} />
                </View>
                <Voximplant.VideoView
                    style={styles.video}
                    scaleType={Voximplant.RenderScaleType.SCALE_FILL}
                    videoStreamId={localVideoStreamId}
                />
            </LinearGradient>
        </>
    );
}

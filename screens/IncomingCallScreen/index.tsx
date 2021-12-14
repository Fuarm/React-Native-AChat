import { BlurView } from '@react-native-community/blur';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import commonStyles from '../../common/style';
import styles from './style';

import { FontAwesome, MaterialCommunityIcons } from '../../common/icons';
import { dangerColor, successColor } from '../../constants/theme';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Voximplant } from 'react-native-voximplant';

export default function IncomingCallScreen () {
    const [caller, setCaller] = useState();

    const navigation = useNavigation();
    const { call } = useRoute().params;

    useEffect(() => {
        setCaller(call.getEndpoints()[0].displayName);

        const { Disconnected } = Voximplant.CallEvents;
        call.on(Disconnected, () => navigation.goBack());

        return () => call.off(Disconnected);
    }, [])

    const onDecline = () => call.decline();

    const onAccept = () => navigation.replace("Calling", {
        call,
        isIncomingCall: true
    });

    return (
        <>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['rgba(255,50,50,0.5)', '#rgba(50,255,50,0.4)', 'rgba(25,25,255,0.6)']}
                start={{x: -0.5, y: 0.1}}
                end={{x: 1.5, y: 0.8}}
                style={commonStyles.flex}
            >
                
                <BlurView blurAmount={50} blurType="dark" style={[commonStyles.flex, styles.blur]} />
                <View style={[commonStyles.flex, { position: 'relative', zIndex:1}]}>
                    <Text style={styles.name}>From { caller }</Text>
                    <Text style={styles.phone}>AChatApp video</Text>
                </View>
                <View style={[commonStyles.row, styles.buttonContainer, {position: 'relative', zIndex: 1}]}>
                    <Pressable onPress={onDecline} style={[styles.button, {backgroundColor: dangerColor}]}>
                        <MaterialCommunityIcons name="phone-hangup" size={32} color="white" />
                    </Pressable>
                    <Pressable onPress={onAccept} style={[styles.button, {backgroundColor: successColor}]}>
                        <FontAwesome name="check" size={24} color="white" />
                    </Pressable>
                </View>
                <SafeAreaView />
            </LinearGradient>
        </>
    );
}


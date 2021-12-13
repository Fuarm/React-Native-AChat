import { BlurView } from "@react-native-community/blur";
import React, { useEffect, useRef } from "react";
import { Pressable, SafeAreaView, View } from "react-native";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "../../common/icons";

import commonStyles from '../../common/style';
import styles from './style';
import { dangerColor } from "../../constants/theme";

export default function CallFooter({onHangup}) {

    const handleMap = useRef<Map<string, () => void | undefined>>();

    useEffect(() => {
        handleMap.current = new Map();
        handleMap.current.set('reversal', () => {});
        handleMap.current.set('audio', () => {});
        handleMap.current.set('video', () => {});
        handleMap.current.set('hangup', onHangup);
    }, [])

    const onButton = (type: 'reversal' | 'audio' | 'video' | 'hangup') => handleMap.current?.get(type);

    return (
        <View style={styles.bottomContainer}>
            <BlurView blurType="dark" blurAmount={10} >
                <View style={[commonStyles.row, styles.bottonContainer]}>
                    <Pressable style={styles.button}>
                        <Ionicons name="ios-camera-reverse" size={32} color="white" />
                    </Pressable>
                    <Pressable style={styles.button}>
                        <FontAwesome5 name="video-slash" size={24} color="white" />
                    </Pressable>
                    <Pressable style={styles.button}>
                        <FontAwesome5 name="microphone-alt-slash" size={24} color="white" /> 
                    </Pressable>
                    <Pressable onPress={onButton('hangup')} style={[styles.button, {backgroundColor: dangerColor}]}>
                        <MaterialCommunityIcons name="phone-hangup" size={32} color="white" />
                    </Pressable>
                </View>
                <SafeAreaView />
            </BlurView>
        </View>
    );
}
import { BlurView } from "@react-native-community/blur";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "../../utils/icons";

import commonStyles from '../../common/style';
import styles from './style';
import { dangerColor } from "../../constants/theme";

export default function CallFooter() {
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
                    <Pressable style={[styles.button, {backgroundColor: dangerColor}]}>
                        <MaterialCommunityIcons name="phone-hangup" size={32} color="white" />
                    </Pressable>
                </View>
                <SafeAreaView />
            </BlurView>
        </View>
    );
}
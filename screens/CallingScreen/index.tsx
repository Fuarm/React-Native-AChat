import React from 'react';
import { StatusBar, Text, View } from 'react-native';

import commonStyles from '../../common/style';
import styles from './style';
import CallFooter from '../../components/CallFooter';

export default function CallingScreen () {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={styles.root}>
                <View style={commonStyles.flex}>
                    <Text style={styles.name}>From wang</Text>
                    <Text style={styles.phone}>+ 86 188****2121</Text>
                </View>
                <View style={styles.cardVideo}>
                </View>
                <CallFooter />
            </View>
        </>
    );
}
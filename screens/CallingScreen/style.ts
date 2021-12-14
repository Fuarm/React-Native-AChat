import { StatusBar, StyleSheet } from 'react-native';

const statusBarHeight = StatusBar.currentHeight || 0;

export default StyleSheet.create({
    root: {
        flex: 1,
        position: 'relative',
        zIndex: 1,
    },
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 48,
        marginTop: 50 + statusBarHeight,
    },
    phone: {
        color: 'white',
        textAlign: 'center'
    },
    cardVideo: {
        width: 110,
        height: 160,
        borderRadius: 12,
        backgroundColor: 'blue',
        position: 'absolute',
        top: 120 + statusBarHeight,
        right: 24,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    blur: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
})
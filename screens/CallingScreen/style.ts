import { StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#9f5fff'
    },
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 48,
        marginTop: 70,
    },
    phone: {
        color: 'white',
        textAlign: 'center'
    },
    cardVideo: {
        width: 100,
        height: 160,
        borderRadius: 12,
        backgroundColor: 'blue',
        position: 'absolute',
        top: 80 + (StatusBar.currentHeight || 0),
        right: 24,
    }
})
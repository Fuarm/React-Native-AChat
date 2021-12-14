import { StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 48,
        marginTop: 50 + (StatusBar.currentHeight || 0),
    },
    phone: {
        color: 'white',
        textAlign: 'center'
    },
    buttonContainer: {
        // 安卓模拟器中，使用 BlurView 导致的, 不设置此属性， button 的 width height 不起作用
        backgroundColor: 'transparent',
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 70,
        marginBottom: 100,
    },
    blur: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    }
})
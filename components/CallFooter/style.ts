import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    bottomContainer: {
        backgroundColor: 'rgba(0,0,0, 0.8)',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden'
    },
    bottonContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 36,
        // 安卓模拟器中，不设置此属性， button 的 width height 不起作用
        backgroundColor: 'transparent'
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4f4f4f',
        marginTop: 42,
    }
})
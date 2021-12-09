import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    searchContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 8,
        marginVertical: 14,
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 42,
        paddingRight: 12,
        fontSize: 16,
        color: 'white',
    }
})
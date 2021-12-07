import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    root: {
        paddingHorizontal: 15,
        overflow: 'scroll'
    },
    titleContainer: {
        marginTop: 45,
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    title: {
        fontSize: 28,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginRight: 5,
    },
    thirdSignInContainer: {
        paddingBottom: 25,
    },
    thirdSignInButton: {
        marginVertical: 5,
        width: '100%',
        height: 48,
        borderRadius: 4,
        backgroundColor: '#e53935',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thirdSignInButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
    inputContainer: {
        marginTop: 20,
    },
    inputLabel: {
        marginBottom: 8,
        fontSize: 16,
    },
    input: {
        padding: 0,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 4,
        height: 48,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    signInButton: {
        marginVertical: 25,
        height: 48,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInDisabled: {
        backgroundColor: '#ddd'
    },
    signInButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1
    },
    signUpTip: {
        marginBottom: 40,
    }
})
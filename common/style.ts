import { StyleSheet } from 'react-native'
import { themeColor } from '../constants/theme'

export default StyleSheet.create({
    flex: { flex: 1 },
    row: { flexDirection: 'row' },
    background: { backgroundColor: '#f5f5f5' },
    themeTextColor: { color: themeColor },
    themeBackgroundColor: { backgroundColor: themeColor },
    paddingHorizontal: { paddingHorizontal: 12 }
})
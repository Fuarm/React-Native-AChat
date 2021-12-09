import React from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import ContactsItem from '../../components/ContactsItem';

import commonStyles from '../../common/style';
import styles from './style';
import { FontAwesome } from '../../utils/icons';

export default function ContactsScreen() {
    return (
        <View style={[
            commonStyles.flex,
            commonStyles.background,
            commonStyles.paddingHorizontal
        ]}>
            {/* 搜索 */}
            <View style={styles.searchContainer}>
                <FontAwesome name="search" color="white" size={20} style={commonStyles.paddingHorizontal} />
                <TextInput style={styles.searchInput} />
            </View>
            {/* 联系人列表 */}
            <FlatList
                data={[1,2,3]}
                renderItem={({item}) => <ContactsItem />}
                keyExtractor={item => item + ''}
            />
        </View>
    );
}


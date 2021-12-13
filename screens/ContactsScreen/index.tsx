import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, Alert, ActivityIndicator } from 'react-native';
import ContactsItem from '../../components/ContactsItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from '../../common/icons';
import { Fetch } from '../../utils';
import { USER_ACCOUNT } from '../../constants';
import { useNavigation } from '@react-navigation/native';

import commonStyles from '../../common/style';
import styles from './style';
import { User } from '../../types';

export default function ContactsScreen() {

    const [contacts, setContacts] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        setLoading(true);
        try {
            const resPromise = await Fetch.get('platform_api/GetUsers');
            const {result, error} = await resPromise.json();
            const userAccount =  await AsyncStorage.getItem(USER_ACCOUNT);
            if(result) {
                setContacts(result?.filter((user: User) => user.user_name !== userAccount));
            }
            error && Alert.alert('get user list fail', 'code：' + error.code + '，' + error.msg);
        } catch (e) {
            console.log("get user list error!", e);
        }
        setLoading(false);
    }

    const handlerContact = (contact?: User) => {
        return () => navigation.navigate("Calling", contact);
    }

    return (
        <FlatList
            style={[
                commonStyles.flex,
                commonStyles.background,
                commonStyles.paddingHorizontal
            ]}
            ListHeaderComponent={Search}
            refreshing={loading}
            onRefresh={getUsers}
            data={contacts}
            renderItem={({item}) => <ContactsItem name={item.user_display_name} onClick={handlerContact(item)} />}
            keyExtractor={item => item.user_id + ''}
        />
    );
}

function Search() {
    return (
        <View style={styles.searchContainer}>
            <FontAwesome name="search" color="white" size={20} style={commonStyles.paddingHorizontal} />
            <TextInput style={styles.searchInput} />
        </View>
    );
}


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatScreen from '../../screens/ChatScreen';
import ContactsScreen from '../../screens/ContactsScreen';
import UserScreen from '../../screens/UserScreen';

import { RootTabParamList } from '../../types';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
        <BottomTab.Screen name="Chat" component={ChatScreen}/>
        <BottomTab.Screen name="Contacts" component={ContactsScreen} />
        <BottomTab.Screen name="User" component={UserScreen} />
    </BottomTab.Navigator>
  );
}
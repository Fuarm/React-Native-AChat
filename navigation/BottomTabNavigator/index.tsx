import React, { Fragment, FunctionComponent } from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatScreen from '../../screens/ChatScreen';
import ContactsScreen from '../../screens/ContactsScreen';
import UserScreen from '../../screens/UserScreen';
import BottomTabBar from '../BottomTabBar';

import { RootTabParamList, RootTabScreenProps } from '../../types';
import { FontAwesome } from '../../utils/icons';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const bottomTabScreenOptions = (options?: BottomTabNavigationOptions) => ({ navigation }: RootTabScreenProps<keyof RootTabParamList>) => options || {}

const bottomTabScreens: {name: keyof RootTabParamList, component: FunctionComponent<any>, options?: BottomTabNavigationOptions}[] = [
	{
		name: 'Chat',
		component: ChatScreen,
    options: {
      tabBarIcon: ({ color }) => <FontAwesome name="wechat" size={24} color={color} />,
    }
	},
	{
		name: 'Contacts',
		component: ContactsScreen,
    options: {
      tabBarIcon: ({ color }) => <FontAwesome name="google" size={24} color={color} />,
    }
	},
	{
		name: 'User',
		component: UserScreen,
    options: {
      tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
    }
	},
]

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} theme={'red'} />}>
      {
				bottomTabScreens.map(screen => 
          <BottomTab.Screen {...screen} options={bottomTabScreenOptions(screen.options)}  key={screen.name} />
				)
			}
    </BottomTab.Navigator>
  );
}

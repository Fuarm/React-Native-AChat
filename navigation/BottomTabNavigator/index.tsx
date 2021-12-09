import React, { FunctionComponent } from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from 'react-native-bottom-animate-tabbar';

import ChatScreen from '../../screens/ChatScreen';
import ContactsScreen from '../../screens/ContactsScreen';
import UserScreen from '../../screens/UserScreen';
// import BottomTabBar from '../BottomTabBar';

import { RootTabParamList, RootTabScreenProps } from '../../types';
import { FontAwesome } from '../../utils/icons';

// const bottomTabScreenOptions = (options?: BottomTabNavigationOptions) => ({ navigation }: RootTabScreenProps<keyof RootTabParamList>) => options || {}

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

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
    >
      {
				bottomTabScreens.map(screen => 
          <BottomTab.Screen {...screen} options={
            {
              ...screen.options
            }
          }  key={screen.name} />
				)
			}
    </BottomTab.Navigator>
  );
}

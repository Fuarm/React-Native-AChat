import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import BottomTabNavigator from "../BottomTabNavigator";

import NotFoundScreen from '../../screens/NotFoundScreen';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from "../../screens/SignUpScreen";
import CallingScreen from "../../screens/CallingScreen";
import IncomingCallScreen from "../../screens/IncomingCallScreen";

import { RootStackParamList } from "../../types";

const stackScreens: {name: keyof RootStackParamList, component: FunctionComponent<any>, options?: StackNavigationOptions}[] = [
	{
		name: 'SignIn',
		component: SignInScreen,
		options: { headerShown: false }
	},
	{
		name: 'SignUp',
		component: SignUpScreen,
		options: { headerShown: false }
	},
	{
		name: 'Root',
		component: BottomTabNavigator,
		options: { headerShown: false }
	},
	{
		name: 'Calling',
		component: CallingScreen,
		options: { headerShown: false }
	},
	{
		name: 'IncomingCall',
		component: IncomingCallScreen,
		options: { headerShown: false }
	},
	{
		name: 'NotFound',
		component: NotFoundScreen,
		options: { title: 'Oops!' }
	}
]


const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
	return (
		<Stack.Navigator>
			{
				stackScreens.map(screen => 
					<Stack.Screen {...screen} key={screen.name} />
				)
			}
		</Stack.Navigator>
	);
}


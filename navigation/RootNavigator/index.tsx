import React, { FunctionComponent } from "react";
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import NotFoundScreen from '../../screens/NotFoundScreen';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from "../../screens/SignUpScreen";

import { RootStackParamList } from "../../types";
import BottomTabNavigator from "../BottomTabNavigator";

const Stack = createStackNavigator<RootStackParamList>();

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
		component: BottomTabNavigator
	},
	{
		name: 'NotFound',
		component: NotFoundScreen,
		options: { title: 'Oops!' }
	}
]

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


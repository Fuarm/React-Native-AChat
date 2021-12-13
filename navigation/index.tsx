import React, { createRef } from "react";
import { Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootNavigator";
import linking from "./LinkingConfig";


export const navigationRef = createRef();

export default function Navigation() {
    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<Text>Loading...</Text>}
        >
            <RootNavigator />
        </NavigationContainer>
    );
}
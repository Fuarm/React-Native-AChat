import React from "react";
import { Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootNavigator";
import linking from "./LinkingConfig";

export default function Navigation() {
    return (
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <RootNavigator />
        </NavigationContainer>
    );
}
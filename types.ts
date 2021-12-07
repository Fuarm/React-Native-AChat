/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList, RootTabParamList {}
    }
}

export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    Calling: undefined;
    IncomingCall: undefined;
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = StackScreenProps<
    RootStackParamList,
    Screen
>;

export type RootTabParamList = {
    Chat: undefined;
    User: undefined;
    Contacts: undefined;
};

 
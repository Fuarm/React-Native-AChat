/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ["https://www.achat.com", "achat://"],
  config: {
    screens: {
      Root: {
        screens: {
          Chat: {
            screens: {
              ChatScreen: 'Chat',
            },
          },
          Contacts: {
            screens: {
              ContactScreen: 'Contacts',
            },
          },
          User: {
            screens: {
              UserScreen: 'User',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;

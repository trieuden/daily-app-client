import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Account from './account/Account';
import Navigation from './components/Navigation';
import Budget from './budget/Budget';
import Setting from './setting/Setting';
import Overview from './overview/Overview';

const Main = ({setKey}) => {

  const Stack = createStackNavigator();

  return (
    <View style={{ height: '100%'}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
          <Stack.Screen name="Budget" component={Budget} options={{ headerShown: false }} />
          <Stack.Screen name="Overview" component={Overview} options={{ headerShown: false }} />
          <Stack.Screen name="Setting" options={{ headerShown: false }} >
            {(props) => <Setting {...props} setKey={setKey} />}
          </Stack.Screen>
        </Stack.Navigator>
        <Navigation />
      </NavigationContainer>
    </View>
  );
};

export default Main;

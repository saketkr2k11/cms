import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import {WRootToastApp} from 'react-native-smart-tip';
import {Provider} from 'react-redux';

import {Colors} from './app/lib/constants';
import configureStore from './app/store/configureStore';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {NavigatorParams} from './app/lib/types';
import {Provider as PaperProvider} from 'react-native-paper';
import 'react-native-gesture-handler';
import CustomDrawerContent from './app/screens/CustomDrawerContent';
import ManageCategory from './app/screens/ManageCategory';
import DashBoard from './app/screens/DashBoard';
import CategoryListView from './app/screens/CategoryListView';

const finalStores = configureStore();

const Drawer = createDrawerNavigator<NavigatorParams>();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <WRootToastApp>
        <Provider store={finalStores.store}>
          <PaperProvider>
            <NavigationContainer>
              <Drawer.Navigator
                // eslint-disable-next-line react/no-unstable-nested-components
                drawerContent={(props: DrawerContentComponentProps) => (
                  <CustomDrawerContent {...props} />
                )}>
                <Drawer.Screen name="Dashboard" component={DashBoard} />
                <Drawer.Screen
                  name="ManageCategory"
                  component={ManageCategory}
                  options={({}) => ({title: 'Manage Category'})}
                />
                <Drawer.Screen
                  name="CategoryListView"
                  component={CategoryListView}
                  options={({route}) => ({title: route?.params?.name})}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </Provider>
      </WRootToastApp>
    </SafeAreaView>
  );
}

export default App;

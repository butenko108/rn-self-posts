import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { THEME } from '../theme';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';

const Stack = createStackNavigator();
const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const navigatorOptions = {
  headerStyle: { backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff' },
  headerTintColor: Platform.OS === 'android' ? 'white' : THEME.MAIN_COLOR,
};

const postOption = ({ route }) => {
  const { date } = route.params;
  const normalizedDate = new Date(date).toLocaleDateString();

  return {
    title: `Post from ${normalizedDate}`,
    headerRight: () => <Button title="Update count" />,
  };
};

const mainOptions = ({ navigation }) => ({
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title="Take photo" iconName="ios-camera" onPress={() => navigation.navigate('CreateNavigator')} />
    </HeaderButtons>
  ),
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title="Toggle Drawer" iconName="ios-menu" onPress={() => navigation.toggleDrawer()} />
    </HeaderButtons>
  ),
});

const PostNavigator = () => (
  <Stack.Navigator screenOptions={navigatorOptions}>
    <Stack.Screen name="Main" component={MainScreen} options={mainOptions} />
    <Stack.Screen name="Post" component={PostScreen} options={postOption} />
  </Stack.Navigator>
);

const generalOptions = ({ navigation }) => ({
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title="Toggle Drawer" iconName="ios-menu" onPress={() => navigation.toggleDrawer()} />
    </HeaderButtons>
  ),
});

const BookedNavigator = () => (
  <Stack.Navigator initialRouteName="Main" screenOptions={navigatorOptions}>
    <Stack.Screen name="Booked" component={BookedScreen} options={generalOptions} />
    <Stack.Screen name="Post" component={PostScreen} options={postOption} />
  </Stack.Navigator>
);

const BottomNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      ...navigatorOptions,
      headerShown: false,
      tabBarActiveTintColor: Platform.OS === 'android' ? 'white' : THEME.MAIN_COLOR,
    }}
    barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
    activeColor="#fff"
    inactiveColor="#b2adad"
    shifting={true}
  >
    <Tab.Screen
      name="All"
      component={PostNavigator}
      options={{ tabBarIcon: ({ color }) => <Ionicons name="ios-albums" size={25} color={color} /> }}
    />
    <Tab.Screen
      name="Bookmarked"
      component={BookedNavigator}
      options={{
        tabBarLabel: 'Booked',
        tabBarIcon: ({ color }) => <Ionicons name="ios-star" size={25} color={color} />,
      }}
    />
  </Tab.Navigator>
);

const AboutNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      <Stack.Screen name="About" component={AboutScreen} options={generalOptions} />
    </Stack.Navigator>
  );
};

const CreateNavigator = () => {
  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      <Stack.Screen name="Create" component={CreateScreen} options={generalOptions} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: THEME.MAIN_COLOR,
        drawerLabelStyle: {
          fontFamily: 'openBold',
        },
      }}
    >
      <Drawer.Screen name="PostTabs" component={BottomNavigator} options={{ drawerLabel: 'Main' }} />
      <Drawer.Screen name="AboutNavigator" component={AboutNavigator} options={{ title: 'About app' }} />
      <Drawer.Screen name="CreateNavigator" component={CreateNavigator} options={{ title: 'Create new post' }} />
    </Drawer.Navigator>
  );
};

export const AppNavigation = ({ onReady }) => {
  return (
    <NavigationContainer onReady={onReady}>
      <MainNavigator />
    </NavigationContainer>
  );
};

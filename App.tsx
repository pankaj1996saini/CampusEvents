import React from 'react';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider } from './src/context/AppContext';
import { useTheme } from './src/theme';
import { RootStackParamList, TabParamList } from './src/types';
import HomeScreen from './src/screens/HomeScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import MyRegistrationsScreen from './src/screens/MyRegistrationsScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import RegistrationFormScreen from './src/screens/RegistrationFormScreen';
import RegistrationSuccessScreen from './src/screens/RegistrationSuccessScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  const c = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.muted,
        tabBarStyle: { backgroundColor: c.card, borderTopColor: c.border },
        headerStyle: { backgroundColor: c.primary },
        headerTintColor: '#fff',
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'calendar',
            Dashboard: 'stats-chart',
            MyRegistrations: 'checkmark-done-circle',
          } as const;
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Campus Events' }} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="MyRegistrations" component={MyRegistrationsScreen} options={{ title: 'My Registrations' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const c = useTheme();

  return (
    <AppProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: c.primary },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Event Details' }} />
          <Stack.Screen name="Registration" component={RegistrationFormScreen} options={{ title: 'Register' }} />
          <Stack.Screen
            name="RegistrationSuccess"
            component={RegistrationSuccessScreen}
            options={{ title: 'Registration' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

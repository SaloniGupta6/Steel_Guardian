import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import SafetyScreen from '../screens/safety/SafetyScreen';
import ReportIncidentScreen from '../screens/safety/ReportIncidentScreen';
import MaterialScreen from '../screens/material/MaterialScreen';
import MaintenanceScreen from '../screens/maintenance/MaintenanceScreen';
import EnvironmentScreen from '../screens/environment/EnvironmentScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Safety Stack Navigator
function SafetyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SafetyMain" component={SafetyScreen} />
      <Stack.Screen name="ReportIncident" component={ReportIncidentScreen} />
    </Stack.Navigator>
  );
}

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Safety':
              iconName = 'security';
              break;
            case 'Material':
              iconName = 'inventory';
              break;
            case 'Maintenance':
              iconName = 'build';
              break;
            case 'Environment':
              iconName = 'eco';
              break;
            default:
              iconName = 'help';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#2d2d2d',
          borderTopColor: '#404040',
        },
        headerStyle: {
          backgroundColor: '#2d2d2d',
        },
        headerTintColor: '#ffffff',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Safety" component={SafetyStack} />
      <Tab.Screen name="Material" component={MaterialScreen} />
      <Tab.Screen name="Maintenance" component={MaintenanceScreen} />
      <Tab.Screen name="Environment" component={EnvironmentScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;

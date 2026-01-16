import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Card, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { commonStyles } from '../../utils/theme';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Refresh data here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const statsData = [
    {
      title: 'Safety Incidents',
      value: '12',
      subtitle: 'This month',
      icon: 'security',
      color: '#FF5722',
    },
    {
      title: 'Active Machines',
      value: '87%',
      subtitle: 'Operational',
      icon: 'build',
      color: '#4CAF50',
    },
    {
      title: 'Material Flow',
      value: '156',
      subtitle: 'Tons today',
      icon: 'inventory',
      color: '#2196F3',
    },
    {
      title: 'Energy Usage',
      value: '1.2M',
      subtitle: 'kWh today',
      icon: 'eco',
      color: '#FF9800',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.firstName || 'User'}</Text>
        </View>
        <Button
          mode="outlined"
          onPress={handleLogout}
          textColor="#FF6B35"
          style={styles.logoutButton}
        >
          Logout
        </Button>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        
        <View style={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <MaterialIcons
                  name={stat.icon}
                  size={32}
                  color={stat.color}
                  style={styles.statIcon}
                />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        
        <Card style={styles.alertCard}>
          <Card.Content>
            <View style={styles.alertItem}>
              <MaterialIcons name="warning" size={24} color="#FF9800" />
              <View style={styles.alertText}>
                <Text style={styles.alertTitle}>High Temperature Alert</Text>
                <Text style={styles.alertSubtitle}>Furnace 3 - 2 minutes ago</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.alertCard}>
          <Card.Content>
            <View style={styles.alertItem}>
              <MaterialIcons name="security" size={24} color="#F44336" />
              <View style={styles.alertText}>
                <Text style={styles.alertTitle}>Safety Incident Reported</Text>
                <Text style={styles.alertSubtitle}>Area B - 15 minutes ago</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#2d2d2d',
  },
  greeting: {
    fontSize: 16,
    color: '#999999',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoutButton: {
    borderColor: '#FF6B35',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    marginBottom: 12,
    backgroundColor: '#2d2d2d',
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
  alertCard: {
    marginBottom: 12,
    backgroundColor: '#2d2d2d',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    marginLeft: 16,
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  alertSubtitle: {
    fontSize: 14,
    color: '#999999',
    marginTop: 2,
  },
});

export default DashboardScreen;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { commonStyles } from '../../utils/theme';

const MaintenanceScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Maintenance</Text>
      </View>
      
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <MaterialIcons name="build" size={48} color="#9C27B0" />
            <Text style={styles.cardTitle}>Predictive Maintenance</Text>
            <Text style={styles.cardSubtitle}>
              Monitor machine health and schedule maintenance
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#2d2d2d',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#2d2d2d',
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
});

export default MaintenanceScreen;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { commonStyles } from '../../utils/theme';

const EnvironmentScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Environment</Text>
      </View>
      
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <MaterialIcons name="eco" size={48} color="#4CAF50" />
            <Text style={styles.cardTitle}>Environmental Dashboard</Text>
            <Text style={styles.cardSubtitle}>
              Monitor CO₂ emissions, energy usage, and sustainability metrics
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

export default EnvironmentScreen;

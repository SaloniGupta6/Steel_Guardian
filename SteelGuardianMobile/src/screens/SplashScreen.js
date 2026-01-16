import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { commonStyles } from '../utils/theme';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SteelGuardian</Text>
      <Text style={styles.subtitle}>Industrial Safety & Operations Monitor</Text>
      <ActivityIndicator 
        size="large" 
        color="#FF6B35" 
        style={styles.loader} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;

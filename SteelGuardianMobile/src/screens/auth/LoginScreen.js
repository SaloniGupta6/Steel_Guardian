import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../store/slices/authSlice';
import { commonStyles } from '../../utils/theme';

const LoginScreen = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleLogin = async () => {
    if (!employeeId.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both Employee ID and Password');
      return;
    }

    try {
      await dispatch(login({ employeeId: employeeId.trim(), password }));
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  React.useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>SteelGuardian</Text>
        <Text style={styles.subtitle}>Industrial Safety Monitor</Text>
        
        <View style={styles.form}>
          <TextInput
            label="Employee ID"
            value={employeeId}
            onChangeText={setEmployeeId}
            mode="outlined"
            style={styles.input}
            theme={{ colors: { primary: '#FF6B35' } }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            theme={{ colors: { primary: '#FF6B35' } }}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
            buttonColor="#FF6B35"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </View>
        
        <Text style={styles.footer}>
          Secure access for authorized personnel only
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 48,
  },
  form: {
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#2d2d2d',
  },
  button: {
    marginTop: 24,
    paddingVertical: 8,
  },
  footer: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LoginScreen;

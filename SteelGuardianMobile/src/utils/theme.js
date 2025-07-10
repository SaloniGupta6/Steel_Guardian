import { DefaultTheme } from 'react-native-paper';

export const darkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B35', // Orange accent
    accent: '#FFB74D', // Lighter orange
    background: '#1a1a1a', // Dark background
    surface: '#2d2d2d', // Card background
    text: '#ffffff', // White text
    placeholder: '#999999', // Placeholder text
    disabled: '#666666', // Disabled elements
    error: '#FF5252', // Error color
    success: '#4CAF50', // Success color
    warning: '#FFC107', // Warning color
    info: '#2196F3', // Info color
    safety: '#FF5722', // Safety alert color
    maintenance: '#9C27B0', // Maintenance color
    environment: '#4CAF50', // Environment color
    material: '#607D8B', // Material flow color
    card: '#2d2d2d',
    border: '#404040',
    notification: '#FF6B35',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
};

export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  card: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    backgroundColor: '#2d2d2d',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button: {
    borderRadius: 8,
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  input: {
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    marginVertical: 8,
  },
  text: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#999999',
  },
  safetyColors: {
    low: '#4CAF50',
    medium: '#FFC107',
    high: '#FF9800',
    critical: '#F44336',
  },
  statusColors: {
    reported: '#2196F3',
    investigating: '#FF9800',
    resolved: '#4CAF50',
    escalated: '#F44336',
  },
};

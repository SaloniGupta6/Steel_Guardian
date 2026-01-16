import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  SegmentedButtons,
  Chip,
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { reportIncident, clearReportSuccess } from '../../store/slices/safetySlice';
import { commonStyles } from '../../utils/theme';

const ReportIncidentScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { reporting, reportSuccess, error } = useSelector(state => state.safety);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
    category: 'equipment',
    location: {
      area: '',
      building: '',
      floor: '',
    },
  });

  const severityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ];

  const categoryOptions = [
    'equipment',
    'environmental',
    'behavioral',
    'procedural',
    'other',
  ];

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      await dispatch(reportIncident(formData)).unwrap();
      Alert.alert(
        'Success',
        'Incident reported successfully',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(clearReportSuccess());
              navigation.goBack();
            },
          },
        ]
      );
    } catch (err) {
      Alert.alert('Error', err || 'Failed to report incident');
    }
  };

  const updateFormData = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="#ffffff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Report Incident</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Incident Details</Text>
            
            <TextInput
              label="Incident Title *"
              value={formData.title}
              onChangeText={(value) => updateFormData('title', value)}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#FF6B35' } }}
            />

            <TextInput
              label="Description *"
              value={formData.description}
              onChangeText={(value) => updateFormData('description', value)}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={styles.input}
              theme={{ colors: { primary: '#FF6B35' } }}
            />

            <Text style={styles.fieldLabel}>Severity Level</Text>
            <SegmentedButtons
              value={formData.severity}
              onValueChange={(value) => updateFormData('severity', value)}
              buttons={severityOptions}
              style={styles.segmentedButtons}
            />

            <Text style={styles.fieldLabel}>Category</Text>
            <View style={styles.chipContainer}>
              {categoryOptions.map((category) => (
                <Chip
                  key={category}
                  selected={formData.category === category}
                  onPress={() => updateFormData('category', category)}
                  style={[
                    styles.chip,
                    formData.category === category && styles.selectedChip,
                  ]}
                  textStyle={
                    formData.category === category ? styles.selectedChipText : styles.chipText
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Location Information</Text>
            
            <TextInput
              label="Area/Department"
              value={formData.location.area}
              onChangeText={(value) => updateFormData('location.area', value)}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#FF6B35' } }}
            />

            <TextInput
              label="Building"
              value={formData.location.building}
              onChangeText={(value) => updateFormData('location.building', value)}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#FF6B35' } }}
            />

            <TextInput
              label="Floor/Level"
              value={formData.location.floor}
              onChangeText={(value) => updateFormData('location.floor', value)}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: '#FF6B35' } }}
            />
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={reporting}
          disabled={reporting}
          style={styles.submitButton}
          buttonColor="#FF6B35"
        >
          {reporting ? 'Reporting...' : 'Report Incident'}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#2d2d2d',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#2d2d2d',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#2d2d2d',
  },
  fieldLabel: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
    marginTop: 8,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    margin: 4,
    backgroundColor: '#404040',
  },
  selectedChip: {
    backgroundColor: '#FF6B35',
  },
  chipText: {
    color: '#ffffff',
  },
  selectedChipText: {
    color: '#ffffff',
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 32,
    paddingVertical: 8,
  },
});

export default ReportIncidentScreen;

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, FAB, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncidents } from '../../store/slices/safetySlice';
import { commonStyles } from '../../utils/theme';

const SafetyScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { incidents, loading } = useSelector(state => state.safety);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await dispatch(fetchIncidents());
    } catch (error) {
      console.error('Failed to load incidents:', error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const getSeverityColor = (severity) => {
    const colors = {
      low: '#4CAF50',
      medium: '#FFC107',
      high: '#FF9800',
      critical: '#F44336',
    };
    return colors[severity] || '#999999';
  };

  const getStatusColor = (status) => {
    const colors = {
      reported: '#2196F3',
      investigating: '#FF9800',
      resolved: '#4CAF50',
      escalated: '#F44336',
    };
    return colors[status] || '#999999';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Safety Monitoring</Text>
      </View>
      
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Quick Stats</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{incidents.length}</Text>
                <Text style={styles.statLabel}>Total Incidents</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {incidents.filter(i => i.status === 'reported').length}
                </Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {incidents.filter(i => i.severity === 'critical').length}
                </Text>
                <Text style={styles.statLabel}>Critical</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Text style={styles.sectionTitle}>Recent Incidents</Text>
        
        {incidents.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <MaterialIcons name="security" size={48} color="#666666" />
              <Text style={styles.emptyTitle}>No incidents reported</Text>
              <Text style={styles.emptySubtitle}>
                Tap the + button to report your first safety incident
              </Text>
            </Card.Content>
          </Card>
        ) : (
          incidents.map((incident) => (
            <Card key={incident._id} style={styles.incidentCard}>
              <Card.Content>
                <View style={styles.incidentHeader}>
                  <Text style={styles.incidentTitle}>{incident.title}</Text>
                  <View style={styles.badgeContainer}>
                    <Chip 
                      style={[styles.severityChip, { backgroundColor: getSeverityColor(incident.severity) }]}
                      textStyle={styles.chipText}
                    >
                      {incident.severity}
                    </Chip>
                  </View>
                </View>
                <Text style={styles.incidentDescription} numberOfLines={2}>
                  {incident.description}
                </Text>
                <View style={styles.incidentFooter}>
                  <View style={styles.locationContainer}>
                    <MaterialIcons name="location-on" size={16} color="#999999" />
                    <Text style={styles.locationText}>
                      {incident.location?.area || 'Unknown Location'}
                    </Text>
                  </View>
                  <Chip 
                    style={[styles.statusChip, { backgroundColor: getStatusColor(incident.status) }]}
                    textStyle={styles.chipText}
                  >
                    {incident.status}
                  </Chip>
                </View>
                <Text style={styles.incidentDate}>
                  Reported: {formatDate(incident.createdAt)}
                </Text>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        label="Report Incident"
        onPress={() => navigation.navigate('ReportIncident')}
      />
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 16,
  },
  statsCard: {
    backgroundColor: '#2d2d2d',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  statLabel: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
  emptyCard: {
    backgroundColor: '#2d2d2d',
    marginBottom: 16,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
  incidentCard: {
    backgroundColor: '#2d2d2d',
    marginBottom: 12,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  incidentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    marginRight: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  severityChip: {
    height: 24,
  },
  statusChip: {
    height: 24,
  },
  chipText: {
    color: '#ffffff',
    fontSize: 12,
  },
  incidentDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 12,
    lineHeight: 20,
  },
  incidentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
  },
  incidentDate: {
    fontSize: 12,
    color: '#666666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B35',
  },
});

export default SafetyScreen;

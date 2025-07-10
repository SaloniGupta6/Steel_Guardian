import apiService from './api';

const ENVIRONMENTAL_ENDPOINTS = {
  METRICS: '/environmental/metrics',
  SENSORS: '/environmental/sensors',
  SUSTAINABILITY: '/environmental/sustainability',
  EMISSIONS: '/environmental/emissions',
  ENERGY: '/environmental/energy',
  WASTE: '/environmental/waste',
  WATER: '/environmental/water',
  ALERTS: '/environmental/alerts',
  REPORTS: '/environmental/reports',
  COMPLIANCE: '/environmental/compliance',
  GOALS: '/environmental/goals',
  BENCHMARKS: '/environmental/benchmarks',
  ANALYTICS: '/environmental/analytics',
  FORECASTS: '/environmental/forecasts',
  DEPARTMENTS: '/environmental/departments',
  LEADERBOARD: '/environmental/leaderboard',
  BADGES: '/environmental/badges',
  CARBON_FOOTPRINT: '/environmental/carbon-footprint',
  RENEWABLE_ENERGY: '/environmental/renewable-energy',
  NOTIFICATIONS: '/environmental/notifications',
  EXPORT: '/environmental/export',
  IMPORT: '/environmental/import',
  TEMPLATES: '/environmental/templates',
  AUDITS: '/environmental/audits',
  CERTIFICATIONS: '/environmental/certifications',
  POLICIES: '/environmental/policies',
  TRAINING: '/environmental/training',
  WEBSOCKET: '/environmental/websocket'
};

class EnvironmentalApiService {
  // Environmental Metrics
  async getMetrics(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.METRICS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch environmental metrics: ${error.message}`);
    }
  }

  async getMetricById(metricId) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.METRICS}/${metricId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch metric: ${error.message}`);
    }
  }

  async createMetric(metricData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.METRICS, metricData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create metric: ${error.message}`);
    }
  }

  async updateMetric(metricId, metricData) {
    try {
      const response = await apiService.put(`${ENVIRONMENTAL_ENDPOINTS.METRICS}/${metricId}`, metricData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update metric: ${error.message}`);
    }
  }

  async deleteMetric(metricId) {
    try {
      const response = await apiService.delete(`${ENVIRONMENTAL_ENDPOINTS.METRICS}/${metricId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete metric: ${error.message}`);
    }
  }

  // Sensor Management
  async getSensors(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.SENSORS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch sensors: ${error.message}`);
    }
  }

  async getSensorById(sensorId) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.SENSORS}/${sensorId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch sensor: ${error.message}`);
    }
  }

  async createSensor(sensorData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.SENSORS, sensorData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create sensor: ${error.message}`);
    }
  }

  async updateSensor(sensorId, sensorData) {
    try {
      const response = await apiService.put(`${ENVIRONMENTAL_ENDPOINTS.SENSORS}/${sensorId}`, sensorData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update sensor: ${error.message}`);
    }
  }

  async deleteSensor(sensorId) {
    try {
      const response = await apiService.delete(`${ENVIRONMENTAL_ENDPOINTS.SENSORS}/${sensorId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete sensor: ${error.message}`);
    }
  }

  async getSensorReadings(sensorId, params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.SENSORS}/${sensorId}/readings`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch sensor readings: ${error.message}`);
    }
  }

  async calibrateSensor(sensorId, calibrationData) {
    try {
      const response = await apiService.post(`${ENVIRONMENTAL_ENDPOINTS.SENSORS}/${sensorId}/calibrate`, calibrationData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to calibrate sensor: ${error.message}`);
    }
  }

  // Sustainability Goals
  async getSustainabilityGoals(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.SUSTAINABILITY, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch sustainability goals: ${error.message}`);
    }
  }

  async createSustainabilityGoal(goalData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.SUSTAINABILITY, goalData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create sustainability goal: ${error.message}`);
    }
  }

  async updateSustainabilityGoal(goalId, goalData) {
    try {
      const response = await apiService.put(`${ENVIRONMENTAL_ENDPOINTS.SUSTAINABILITY}/${goalId}`, goalData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update sustainability goal: ${error.message}`);
    }
  }

  async deleteSustainabilityGoal(goalId) {
    try {
      const response = await apiService.delete(`${ENVIRONMENTAL_ENDPOINTS.SUSTAINABILITY}/${goalId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete sustainability goal: ${error.message}`);
    }
  }

  async getSustainabilityProgress(goalId, params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.SUSTAINABILITY}/${goalId}/progress`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch sustainability progress: ${error.message}`);
    }
  }

  // Emissions Tracking
  async getEmissions(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.EMISSIONS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch emissions data: ${error.message}`);
    }
  }

  async recordEmission(emissionData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.EMISSIONS, emissionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to record emission: ${error.message}`);
    }
  }

  async getEmissionsByType(type, params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.EMISSIONS}/type/${type}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch emissions by type: ${error.message}`);
    }
  }

  async getEmissionsTrend(params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.EMISSIONS}/trend`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch emissions trend: ${error.message}`);
    }
  }

  // Energy Management
  async getEnergyData(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.ENERGY, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch energy data: ${error.message}`);
    }
  }

  async recordEnergyConsumption(energyData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.ENERGY, energyData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to record energy consumption: ${error.message}`);
    }
  }

  async getEnergyEfficiency(params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.ENERGY}/efficiency`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch energy efficiency: ${error.message}`);
    }
  }

  async getRenewableEnergyData(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.RENEWABLE_ENERGY, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch renewable energy data: ${error.message}`);
    }
  }

  // Waste Management
  async getWasteData(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.WASTE, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch waste data: ${error.message}`);
    }
  }

  async recordWaste(wasteData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.WASTE, wasteData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to record waste: ${error.message}`);
    }
  }

  async getWasteByCategory(category, params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.WASTE}/category/${category}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch waste by category: ${error.message}`);
    }
  }

  async getRecyclingData(params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.WASTE}/recycling`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch recycling data: ${error.message}`);
    }
  }

  // Water Management
  async getWaterData(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.WATER, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch water data: ${error.message}`);
    }
  }

  async recordWaterUsage(waterData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.WATER, waterData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to record water usage: ${error.message}`);
    }
  }

  async getWaterQuality(params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.WATER}/quality`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch water quality: ${error.message}`);
    }
  }

  // Environmental Alerts
  async getAlerts(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.ALERTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch environmental alerts: ${error.message}`);
    }
  }

  async createAlert(alertData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.ALERTS, alertData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create alert: ${error.message}`);
    }
  }

  async updateAlert(alertId, alertData) {
    try {
      const response = await apiService.put(`${ENVIRONMENTAL_ENDPOINTS.ALERTS}/${alertId}`, alertData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update alert: ${error.message}`);
    }
  }

  async acknowledgeAlert(alertId) {
    try {
      const response = await apiService.post(`${ENVIRONMENTAL_ENDPOINTS.ALERTS}/${alertId}/acknowledge`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to acknowledge alert: ${error.message}`);
    }
  }

  async resolveAlert(alertId, resolution) {
    try {
      const response = await apiService.post(`${ENVIRONMENTAL_ENDPOINTS.ALERTS}/${alertId}/resolve`, { resolution });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to resolve alert: ${error.message}`);
    }
  }

  // Reports
  async getReports(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.REPORTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch environmental reports: ${error.message}`);
    }
  }

  async generateReport(reportData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.REPORTS, reportData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to generate report: ${error.message}`);
    }
  }

  async getReportById(reportId) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.REPORTS}/${reportId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch report: ${error.message}`);
    }
  }

  async downloadReport(reportId, format = 'pdf') {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.REPORTS}/${reportId}/download`, { format });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to download report: ${error.message}`);
    }
  }

  // Compliance
  async getComplianceData(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.COMPLIANCE, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch compliance data: ${error.message}`);
    }
  }

  async createComplianceRecord(complianceData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.COMPLIANCE, complianceData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create compliance record: ${error.message}`);
    }
  }

  async getComplianceStatus(params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.COMPLIANCE}/status`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch compliance status: ${error.message}`);
    }
  }

  // Goals Management
  async getGoals(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.GOALS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch environmental goals: ${error.message}`);
    }
  }

  async createGoal(goalData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.GOALS, goalData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create goal: ${error.message}`);
    }
  }

  async updateGoal(goalId, goalData) {
    try {
      const response = await apiService.put(`${ENVIRONMENTAL_ENDPOINTS.GOALS}/${goalId}`, goalData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update goal: ${error.message}`);
    }
  }

  async deleteGoal(goalId) {
    try {
      const response = await apiService.delete(`${ENVIRONMENTAL_ENDPOINTS.GOALS}/${goalId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete goal: ${error.message}`);
    }
  }

  async getGoalProgress(goalId, params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.GOALS}/${goalId}/progress`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch goal progress: ${error.message}`);
    }
  }

  // Benchmarks
  async getBenchmarks(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.BENCHMARKS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch benchmarks: ${error.message}`);
    }
  }

  async createBenchmark(benchmarkData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.BENCHMARKS, benchmarkData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create benchmark: ${error.message}`);
    }
  }

  async compareToBenchmark(benchmarkId, params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.BENCHMARKS}/${benchmarkId}/compare`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to compare to benchmark: ${error.message}`);
    }
  }

  // Analytics
  async getAnalytics(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.ANALYTICS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch environmental analytics: ${error.message}`);
    }
  }

  async getAnalyticsByType(type, params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.ANALYTICS}/${type}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch analytics by type: ${error.message}`);
    }
  }

  async getKPIs(params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.ANALYTICS}/kpis`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch environmental KPIs: ${error.message}`);
    }
  }

  // Forecasts
  async getForecasts(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.FORECASTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch environmental forecasts: ${error.message}`);
    }
  }

  async createForecast(forecastData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.FORECASTS, forecastData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create forecast: ${error.message}`);
    }
  }

  async getForecastById(forecastId) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.FORECASTS}/${forecastId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
  }

  // Department Management
  async getDepartments(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.DEPARTMENTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch departments: ${error.message}`);
    }
  }

  async getDepartmentMetrics(departmentId, params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.DEPARTMENTS}/${departmentId}/metrics`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch department metrics: ${error.message}`);
    }
  }

  async compareDepartments(params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.DEPARTMENTS}/compare`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to compare departments: ${error.message}`);
    }
  }

  // Leaderboard
  async getLeaderboard(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.LEADERBOARD, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch leaderboard: ${error.message}`);
    }
  }

  async getLeaderboardByCategory(category, params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.LEADERBOARD}/${category}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch leaderboard by category: ${error.message}`);
    }
  }

  // Badges
  async getBadges(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.BADGES, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch badges: ${error.message}`);
    }
  }

  async getUserBadges(userId, params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.BADGES}/user/${userId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user badges: ${error.message}`);
    }
  }

  async awardBadge(badgeData) {
    try {
      const response = await apiService.post(`${ENVIRONMENTAL_ENDPOINTS.BADGES}/award`, badgeData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to award badge: ${error.message}`);
    }
  }

  // Carbon Footprint
  async getCarbonFootprint(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.CARBON_FOOTPRINT, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch carbon footprint: ${error.message}`);
    }
  }

  async calculateCarbonFootprint(calculationData) {
    try {
      const response = await apiService.post(`${ENVIRONMENTAL_ENDPOINTS.CARBON_FOOTPRINT}/calculate`, calculationData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to calculate carbon footprint: ${error.message}`);
    }
  }

  async getCarbonOffsets(params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.CARBON_FOOTPRINT}/offsets`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch carbon offsets: ${error.message}`);
    }
  }

  // Notifications
  async getNotifications(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.NOTIFICATIONS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }
  }

  async markNotificationAsRead(notificationId) {
    try {
      const response = await apiService.put(`${ENVIRONMENTAL_ENDPOINTS.NOTIFICATIONS}/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to mark notification as read: ${error.message}`);
    }
  }

  async getNotificationSettings(userId) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.NOTIFICATIONS}/settings/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch notification settings: ${error.message}`);
    }
  }

  async updateNotificationSettings(userId, settings) {
    try {
      const response = await apiService.put(`${ENVIRONMENTAL_ENDPOINTS.NOTIFICATIONS}/settings/${userId}`, settings);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update notification settings: ${error.message}`);
    }
  }

  // Data Export/Import
  async exportData(exportParams) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.EXPORT, exportParams);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to export data: ${error.message}`);
    }
  }

  async importData(importData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.IMPORT, importData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to import data: ${error.message}`);
    }
  }

  async getImportStatus(importId) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.IMPORT}/${importId}/status`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch import status: ${error.message}`);
    }
  }

  // Templates
  async getTemplates(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.TEMPLATES, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch templates: ${error.message}`);
    }
  }

  async createTemplate(templateData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.TEMPLATES, templateData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create template: ${error.message}`);
    }
  }

  async useTemplate(templateId, params = {}) {
    try {
      const response = await apiService.post(`${ENVIRONMENTAL_ENDPOINTS.TEMPLATES}/${templateId}/use`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to use template: ${error.message}`);
    }
  }

  // Audits
  async getAudits(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.AUDITS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch audits: ${error.message}`);
    }
  }

  async createAudit(auditData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.AUDITS, auditData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create audit: ${error.message}`);
    }
  }

  async getAuditById(auditId) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.AUDITS}/${auditId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch audit: ${error.message}`);
    }
  }

  async updateAudit(auditId, auditData) {
    try {
      const response = await apiService.put(`${ENVIRONMENTAL_ENDPOINTS.AUDITS}/${auditId}`, auditData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update audit: ${error.message}`);
    }
  }

  // Certifications
  async getCertifications(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.CERTIFICATIONS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch certifications: ${error.message}`);
    }
  }

  async createCertification(certificationData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.CERTIFICATIONS, certificationData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create certification: ${error.message}`);
    }
  }

  async getCertificationStatus(certificationId) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.CERTIFICATIONS}/${certificationId}/status`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch certification status: ${error.message}`);
    }
  }

  // Policies
  async getPolicies(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.POLICIES, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch policies: ${error.message}`);
    }
  }

  async createPolicy(policyData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.POLICIES, policyData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create policy: ${error.message}`);
    }
  }

  async updatePolicy(policyId, policyData) {
    try {
      const response = await apiService.put(`${ENVIRONMENTAL_ENDPOINTS.POLICIES}/${policyId}`, policyData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update policy: ${error.message}`);
    }
  }

  // Training
  async getTrainingModules(params = {}) {
    try {
      const response = await apiService.get(ENVIRONMENTAL_ENDPOINTS.TRAINING, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch training modules: ${error.message}`);
    }
  }

  async createTrainingModule(moduleData) {
    try {
      const response = await apiService.post(ENVIRONMENTAL_ENDPOINTS.TRAINING, moduleData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create training module: ${error.message}`);
    }
  }

  async getTrainingProgress(userId, params = {}) {
    try {
      const response = await apiService.get(`${ENVIRONMENTAL_ENDPOINTS.TRAINING}/progress/${userId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch training progress: ${error.message}`);
    }
  }

  async completeTrainingModule(moduleId, userId, completionData) {
    try {
      const response = await apiService.post(`${ENVIRONMENTAL_ENDPOINTS.TRAINING}/${moduleId}/complete`, {
        userId,
        ...completionData
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to complete training module: ${error.message}`);
    }
  }

  // WebSocket Connection
  subscribeToEnvironmentalUpdates(callback) {
    try {
      return apiService.subscribeToWebSocket(ENVIRONMENTAL_ENDPOINTS.WEBSOCKET, callback);
    } catch (error) {
      throw new Error(`Failed to subscribe to environmental updates: ${error.message}`);
    }
  }

  unsubscribeFromEnvironmentalUpdates(subscription) {
    try {
      return apiService.unsubscribeFromWebSocket(subscription);
    } catch (error) {
      throw new Error(`Failed to unsubscribe from environmental updates: ${error.message}`);
    }
  }

  // File Upload
  async uploadFile(file, type = 'document') {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await apiService.post('/environmental/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  // Health Check
  async healthCheck() {
    try {
      const response = await apiService.get('/environmental/health');
      return response.data;
    } catch (error) {
      throw new Error(`Environmental service health check failed: ${error.message}`);
    }
  }
}

export default new EnvironmentalApiService();

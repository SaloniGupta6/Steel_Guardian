import apiService from './api';

const MACHINE_MAINTENANCE_ENDPOINTS = {
  EQUIPMENT: '/machine-maintenance/equipment',
  MAINTENANCE_SCHEDULES: '/machine-maintenance/schedules',
  WORK_ORDERS: '/machine-maintenance/work-orders',
  HISTORY: '/machine-maintenance/history',
  SPARE_PARTS: '/machine-maintenance/spare-parts',
  PERFORMANCE: '/machine-maintenance/performance',
  PREDICTIVE: '/machine-maintenance/predictive',
  CHECKLISTS: '/machine-maintenance/checklists',
  TECHNICIANS: '/machine-maintenance/technicians',
  NOTIFICATIONS: '/machine-maintenance/notifications',
  REPORTS: '/machine-maintenance/reports',
  COSTS: '/machine-maintenance/costs',
  DOWNTIME: '/machine-maintenance/downtime',
  ANALYTICS: '/machine-maintenance/analytics',
  ALERTS: '/machine-maintenance/alerts',
  SENSORS: '/machine-maintenance/sensors',
  CALIBRATION: '/machine-maintenance/calibration',
  COMPLIANCE: '/machine-maintenance/compliance',
  MANUALS: '/machine-maintenance/manuals',
  VENDORS: '/machine-maintenance/vendors',
  CONTRACTS: '/machine-maintenance/contracts',
  INVENTORY: '/machine-maintenance/inventory',
  INSPECTIONS: '/machine-maintenance/inspections',
  DASHBOARD: '/machine-maintenance/dashboard',
  AUDIT_TRAIL: '/machine-maintenance/audit-trail',
  SAFETY: '/machine-maintenance/safety',
  TRAINING: '/machine-maintenance/training',
  MOBILE: '/machine-maintenance/mobile',
  INTEGRATION: '/machine-maintenance/integration',
  WEBSOCKET: '/machine-maintenance/websocket'
};

class MachineMaintenanceApiService {
  // Equipment Management
  async getEquipment(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.EQUIPMENT, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch equipment: ${error.message}`);
    }
  }

  async getEquipmentById(equipmentId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.EQUIPMENT}/${equipmentId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch equipment: ${error.message}`);
    }
  }

  async createEquipment(equipmentData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.EQUIPMENT, equipmentData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create equipment: ${error.message}`);
    }
  }

  async updateEquipment(equipmentId, equipmentData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.EQUIPMENT}/${equipmentId}`, equipmentData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update equipment: ${error.message}`);
    }
  }

  async deleteEquipment(equipmentId) {
    try {
      const response = await apiService.delete(`${MACHINE_MAINTENANCE_ENDPOINTS.EQUIPMENT}/${equipmentId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete equipment: ${error.message}`);
    }
  }

  async getEquipmentStatus(equipmentId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.EQUIPMENT}/${equipmentId}/status`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch equipment status: ${error.message}`);
    }
  }

  async updateEquipmentStatus(equipmentId, status) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.EQUIPMENT}/${equipmentId}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update equipment status: ${error.message}`);
    }
  }

  async getEquipmentSpecifications(equipmentId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.EQUIPMENT}/${equipmentId}/specifications`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch equipment specifications: ${error.message}`);
    }
  }

  async updateEquipmentSpecifications(equipmentId, specifications) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.EQUIPMENT}/${equipmentId}/specifications`, specifications);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update equipment specifications: ${error.message}`);
    }
  }

  async getEquipmentLocation(equipmentId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.EQUIPMENT}/${equipmentId}/location`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch equipment location: ${error.message}`);
    }
  }

  async updateEquipmentLocation(equipmentId, location) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.EQUIPMENT}/${equipmentId}/location`, location);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update equipment location: ${error.message}`);
    }
  }

  // Maintenance Schedules
  async getMaintenanceSchedules(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.MAINTENANCE_SCHEDULES, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch maintenance schedules: ${error.message}`);
    }
  }

  async getMaintenanceScheduleById(scheduleId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.MAINTENANCE_SCHEDULES}/${scheduleId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch maintenance schedule: ${error.message}`);
    }
  }

  async createMaintenanceSchedule(scheduleData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.MAINTENANCE_SCHEDULES, scheduleData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create maintenance schedule: ${error.message}`);
    }
  }

  async updateMaintenanceSchedule(scheduleId, scheduleData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.MAINTENANCE_SCHEDULES}/${scheduleId}`, scheduleData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update maintenance schedule: ${error.message}`);
    }
  }

  async deleteMaintenanceSchedule(scheduleId) {
    try {
      const response = await apiService.delete(`${MACHINE_MAINTENANCE_ENDPOINTS.MAINTENANCE_SCHEDULES}/${scheduleId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete maintenance schedule: ${error.message}`);
    }
  }

  async getScheduleByEquipment(equipmentId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.MAINTENANCE_SCHEDULES}/equipment/${equipmentId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch schedules for equipment: ${error.message}`);
    }
  }

  async getUpcomingSchedules(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.MAINTENANCE_SCHEDULES}/upcoming`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch upcoming schedules: ${error.message}`);
    }
  }

  async getOverdueSchedules(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.MAINTENANCE_SCHEDULES}/overdue`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch overdue schedules: ${error.message}`);
    }
  }

  async generateSchedule(scheduleData) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.MAINTENANCE_SCHEDULES}/generate`, scheduleData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to generate schedule: ${error.message}`);
    }
  }

  // Work Orders
  async getWorkOrders(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch work orders: ${error.message}`);
    }
  }

  async getWorkOrderById(workOrderId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch work order: ${error.message}`);
    }
  }

  async createWorkOrder(workOrderData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS, workOrderData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create work order: ${error.message}`);
    }
  }

  async updateWorkOrder(workOrderId, workOrderData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}`, workOrderData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update work order: ${error.message}`);
    }
  }

  async deleteWorkOrder(workOrderId) {
    try {
      const response = await apiService.delete(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete work order: ${error.message}`);
    }
  }

  async assignWorkOrder(workOrderId, assignmentData) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}/assign`, assignmentData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to assign work order: ${error.message}`);
    }
  }

  async startWorkOrder(workOrderId) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}/start`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to start work order: ${error.message}`);
    }
  }

  async completeWorkOrder(workOrderId, completionData) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}/complete`, completionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to complete work order: ${error.message}`);
    }
  }

  async pauseWorkOrder(workOrderId, reason) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}/pause`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to pause work order: ${error.message}`);
    }
  }

  async resumeWorkOrder(workOrderId) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}/resume`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to resume work order: ${error.message}`);
    }
  }

  async cancelWorkOrder(workOrderId, reason) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to cancel work order: ${error.message}`);
    }
  }

  async getWorkOrderStatus(workOrderId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}/status`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch work order status: ${error.message}`);
    }
  }

  async getWorkOrderTimeLog(workOrderId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}/time-log`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch work order time log: ${error.message}`);
    }
  }

  async addWorkOrderTimeEntry(workOrderId, timeEntry) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}/time-log`, timeEntry);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add time entry: ${error.message}`);
    }
  }

  async getWorkOrderComments(workOrderId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}/comments`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch work order comments: ${error.message}`);
    }
  }

  async addWorkOrderComment(workOrderId, comment) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.WORK_ORDERS}/${workOrderId}/comments`, comment);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add comment: ${error.message}`);
    }
  }

  // Maintenance History
  async getMaintenanceHistory(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.HISTORY, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch maintenance history: ${error.message}`);
    }
  }

  async getEquipmentMaintenanceHistory(equipmentId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.HISTORY}/equipment/${equipmentId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch equipment maintenance history: ${error.message}`);
    }
  }

  async getMaintenanceHistoryById(historyId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.HISTORY}/${historyId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch maintenance history record: ${error.message}`);
    }
  }

  async createMaintenanceRecord(recordData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.HISTORY, recordData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create maintenance record: ${error.message}`);
    }
  }

  async updateMaintenanceRecord(recordId, recordData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.HISTORY}/${recordId}`, recordData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update maintenance record: ${error.message}`);
    }
  }

  async deleteMaintenanceRecord(recordId) {
    try {
      const response = await apiService.delete(`${MACHINE_MAINTENANCE_ENDPOINTS.HISTORY}/${recordId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete maintenance record: ${error.message}`);
    }
  }

  // Spare Parts Management
  async getSpareParts(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.SPARE_PARTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch spare parts: ${error.message}`);
    }
  }

  async getSparePartById(partId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.SPARE_PARTS}/${partId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch spare part: ${error.message}`);
    }
  }

  async createSparePart(partData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.SPARE_PARTS, partData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create spare part: ${error.message}`);
    }
  }

  async updateSparePart(partId, partData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.SPARE_PARTS}/${partId}`, partData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update spare part: ${error.message}`);
    }
  }

  async deleteSparePart(partId) {
    try {
      const response = await apiService.delete(`${MACHINE_MAINTENANCE_ENDPOINTS.SPARE_PARTS}/${partId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete spare part: ${error.message}`);
    }
  }

  async getSparePartInventory(partId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.SPARE_PARTS}/${partId}/inventory`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch spare part inventory: ${error.message}`);
    }
  }

  async updateSparePartInventory(partId, inventoryData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.SPARE_PARTS}/${partId}/inventory`, inventoryData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update spare part inventory: ${error.message}`);
    }
  }

  async getSparePartsByEquipment(equipmentId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.SPARE_PARTS}/equipment/${equipmentId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch spare parts for equipment: ${error.message}`);
    }
  }

  async getLowStockParts(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.SPARE_PARTS}/low-stock`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch low stock parts: ${error.message}`);
    }
  }

  async requestSparePartOrder(orderData) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.SPARE_PARTS}/order`, orderData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to request spare part order: ${error.message}`);
    }
  }

  // Performance Monitoring
  async getPerformanceMetrics(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.PERFORMANCE, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch performance metrics: ${error.message}`);
    }
  }

  async getEquipmentPerformance(equipmentId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.PERFORMANCE}/equipment/${equipmentId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch equipment performance: ${error.message}`);
    }
  }

  async recordPerformanceData(performanceData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.PERFORMANCE, performanceData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to record performance data: ${error.message}`);
    }
  }

  async getPerformanceTrends(equipmentId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.PERFORMANCE}/trends/${equipmentId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch performance trends: ${error.message}`);
    }
  }

  async getPerformanceKPIs(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.PERFORMANCE}/kpis`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch performance KPIs: ${error.message}`);
    }
  }

  async getEfficiencyMetrics(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.PERFORMANCE}/efficiency`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch efficiency metrics: ${error.message}`);
    }
  }

  async getReliabilityMetrics(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.PERFORMANCE}/reliability`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch reliability metrics: ${error.message}`);
    }
  }

  // Predictive Maintenance
  async getPredictiveAnalysis(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.PREDICTIVE, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch predictive analysis: ${error.message}`);
    }
  }

  async getEquipmentPrediction(equipmentId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.PREDICTIVE}/equipment/${equipmentId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch equipment prediction: ${error.message}`);
    }
  }

  async runPredictiveModel(modelData) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.PREDICTIVE}/model`, modelData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to run predictive model: ${error.message}`);
    }
  }

  async getFailurePredictions(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.PREDICTIVE}/failures`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch failure predictions: ${error.message}`);
    }
  }

  async getMaintenanceRecommendations(equipmentId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.PREDICTIVE}/recommendations/${equipmentId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch maintenance recommendations: ${error.message}`);
    }
  }

  async getAnomalyDetection(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.PREDICTIVE}/anomalies`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch anomaly detection: ${error.message}`);
    }
  }

  async getConditionMonitoring(equipmentId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.PREDICTIVE}/condition/${equipmentId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch condition monitoring: ${error.message}`);
    }
  }

  // Maintenance Checklists
  async getChecklists(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.CHECKLISTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch checklists: ${error.message}`);
    }
  }

  async getChecklistById(checklistId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.CHECKLISTS}/${checklistId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch checklist: ${error.message}`);
    }
  }

  async createChecklist(checklistData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.CHECKLISTS, checklistData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create checklist: ${error.message}`);
    }
  }

  async updateChecklist(checklistId, checklistData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.CHECKLISTS}/${checklistId}`, checklistData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update checklist: ${error.message}`);
    }
  }

  async deleteChecklist(checklistId) {
    try {
      const response = await apiService.delete(`${MACHINE_MAINTENANCE_ENDPOINTS.CHECKLISTS}/${checklistId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete checklist: ${error.message}`);
    }
  }

  async completeChecklist(checklistId, completionData) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.CHECKLISTS}/${checklistId}/complete`, completionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to complete checklist: ${error.message}`);
    }
  }

  async getChecklistsByEquipment(equipmentId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.CHECKLISTS}/equipment/${equipmentId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch checklists for equipment: ${error.message}`);
    }
  }

  async getChecklistTemplates(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.CHECKLISTS}/templates`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch checklist templates: ${error.message}`);
    }
  }

  // Technician Management
  async getTechnicians(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.TECHNICIANS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch technicians: ${error.message}`);
    }
  }

  async getTechnicianById(technicianId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.TECHNICIANS}/${technicianId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch technician: ${error.message}`);
    }
  }

  async createTechnician(technicianData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.TECHNICIANS, technicianData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create technician: ${error.message}`);
    }
  }

  async updateTechnician(technicianId, technicianData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.TECHNICIANS}/${technicianId}`, technicianData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update technician: ${error.message}`);
    }
  }

  async deleteTechnician(technicianId) {
    try {
      const response = await apiService.delete(`${MACHINE_MAINTENANCE_ENDPOINTS.TECHNICIANS}/${technicianId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete technician: ${error.message}`);
    }
  }

  async getTechnicianSkills(technicianId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.TECHNICIANS}/${technicianId}/skills`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch technician skills: ${error.message}`);
    }
  }

  async updateTechnicianSkills(technicianId, skills) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.TECHNICIANS}/${technicianId}/skills`, skills);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update technician skills: ${error.message}`);
    }
  }

  async getTechnicianSchedule(technicianId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.TECHNICIANS}/${technicianId}/schedule`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch technician schedule: ${error.message}`);
    }
  }

  async getTechnicianWorkload(technicianId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.TECHNICIANS}/${technicianId}/workload`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch technician workload: ${error.message}`);
    }
  }

  async getAvailableTechnicians(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.TECHNICIANS}/available`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch available technicians: ${error.message}`);
    }
  }

  // Notifications
  async getNotifications(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.NOTIFICATIONS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }
  }

  async createNotification(notificationData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.NOTIFICATIONS, notificationData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create notification: ${error.message}`);
    }
  }

  async markNotificationAsRead(notificationId) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.NOTIFICATIONS}/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to mark notification as read: ${error.message}`);
    }
  }

  async deleteNotification(notificationId) {
    try {
      const response = await apiService.delete(`${MACHINE_MAINTENANCE_ENDPOINTS.NOTIFICATIONS}/${notificationId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete notification: ${error.message}`);
    }
  }

  async getNotificationSettings(userId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.NOTIFICATIONS}/settings/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch notification settings: ${error.message}`);
    }
  }

  async updateNotificationSettings(userId, settings) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.NOTIFICATIONS}/settings/${userId}`, settings);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update notification settings: ${error.message}`);
    }
  }

  // Reports
  async getReports(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.REPORTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch reports: ${error.message}`);
    }
  }

  async generateReport(reportData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.REPORTS, reportData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to generate report: ${error.message}`);
    }
  }

  async getReportById(reportId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.REPORTS}/${reportId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch report: ${error.message}`);
    }
  }

  async downloadReport(reportId, format = 'pdf') {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.REPORTS}/${reportId}/download`, { format });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to download report: ${error.message}`);
    }
  }

  async getMaintenanceReport(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.REPORTS}/maintenance`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch maintenance report: ${error.message}`);
    }
  }

  async getDowntimeReport(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.REPORTS}/downtime`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch downtime report: ${error.message}`);
    }
  }

  async getCostReport(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.REPORTS}/cost`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch cost report: ${error.message}`);
    }
  }

  async getPerformanceReport(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.REPORTS}/performance`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch performance report: ${error.message}`);
    }
  }

  // Cost Management
  async getCosts(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.COSTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch costs: ${error.message}`);
    }
  }

  async recordCost(costData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.COSTS, costData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to record cost: ${error.message}`);
    }
  }

  async updateCost(costId, costData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.COSTS}/${costId}`, costData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update cost: ${error.message}`);
    }
  }

  async deleteCost(costId) {
    try {
      const response = await apiService.delete(`${MACHINE_MAINTENANCE_ENDPOINTS.COSTS}/${costId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete cost: ${error.message}`);
    }
  }

  async getCostsByEquipment(equipmentId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.COSTS}/equipment/${equipmentId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch costs for equipment: ${error.message}`);
    }
  }

  async getCostAnalysis(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.COSTS}/analysis`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch cost analysis: ${error.message}`);
    }
  }

  async getCostBudget(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.COSTS}/budget`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch cost budget: ${error.message}`);
    }
  }

  async updateCostBudget(budgetData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.COSTS}/budget`, budgetData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update cost budget: ${error.message}`);
    }
  }

  // Downtime Management
  async getDowntime(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.DOWNTIME, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch downtime: ${error.message}`);
    }
  }

  async recordDowntime(downtimeData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.DOWNTIME, downtimeData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to record downtime: ${error.message}`);
    }
  }

  async updateDowntime(downtimeId, downtimeData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.DOWNTIME}/${downtimeId}`, downtimeData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update downtime: ${error.message}`);
    }
  }

  async getDowntimeByEquipment(equipmentId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.DOWNTIME}/equipment/${equipmentId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch downtime for equipment: ${error.message}`);
    }
  }

  async getDowntimeAnalysis(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.DOWNTIME}/analysis`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch downtime analysis: ${error.message}`);
    }
  }

  async getDowntimeTrends(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.DOWNTIME}/trends`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch downtime trends: ${error.message}`);
    }
  }

  // Analytics
  async getAnalytics(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.ANALYTICS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch analytics: ${error.message}`);
    }
  }

  async getMaintenanceAnalytics(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.ANALYTICS}/maintenance`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch maintenance analytics: ${error.message}`);
    }
  }

  async getEquipmentAnalytics(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.ANALYTICS}/equipment`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch equipment analytics: ${error.message}`);
    }
  }

  async getKPIAnalytics(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.ANALYTICS}/kpis`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch KPI analytics: ${error.message}`);
    }
  }

  async getTrendAnalytics(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.ANALYTICS}/trends`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch trend analytics: ${error.message}`);
    }
  }

  // Alerts
  async getAlerts(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.ALERTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch alerts: ${error.message}`);
    }
  }

  async createAlert(alertData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.ALERTS, alertData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create alert: ${error.message}`);
    }
  }

  async updateAlert(alertId, alertData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.ALERTS}/${alertId}`, alertData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update alert: ${error.message}`);
    }
  }

  async acknowledgeAlert(alertId) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.ALERTS}/${alertId}/acknowledge`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to acknowledge alert: ${error.message}`);
    }
  }

  async resolveAlert(alertId, resolution) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.ALERTS}/${alertId}/resolve`, { resolution });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to resolve alert: ${error.message}`);
    }
  }

  async getAlertRules(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.ALERTS}/rules`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch alert rules: ${error.message}`);
    }
  }

  async createAlertRule(ruleData) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.ALERTS}/rules`, ruleData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create alert rule: ${error.message}`);
    }
  }

  // Sensor Management
  async getSensors(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.SENSORS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch sensors: ${error.message}`);
    }
  }

  async getSensorById(sensorId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.SENSORS}/${sensorId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch sensor: ${error.message}`);
    }
  }

  async createSensor(sensorData) {
    try {
      const response = await apiService.post(MACHINE_MAINTENANCE_ENDPOINTS.SENSORS, sensorData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create sensor: ${error.message}`);
    }
  }

  async updateSensor(sensorId, sensorData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.SENSORS}/${sensorId}`, sensorData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update sensor: ${error.message}`);
    }
  }

  async deleteSensor(sensorId) {
    try {
      const response = await apiService.delete(`${MACHINE_MAINTENANCE_ENDPOINTS.SENSORS}/${sensorId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete sensor: ${error.message}`);
    }
  }

  async getSensorData(sensorId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.SENSORS}/${sensorId}/data`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch sensor data: ${error.message}`);
    }
  }

  async getSensorsByEquipment(equipmentId) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.SENSORS}/equipment/${equipmentId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch sensors for equipment: ${error.message}`);
    }
  }

  async calibrateSensor(sensorId, calibrationData) {
    try {
      const response = await apiService.post(`${MACHINE_MAINTENANCE_ENDPOINTS.SENSORS}/${sensorId}/calibrate`, calibrationData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to calibrate sensor: ${error.message}`);
    }
  }

  // Dashboard
  async getDashboard(params = {}) {
    try {
      const response = await apiService.get(MACHINE_MAINTENANCE_ENDPOINTS.DASHBOARD, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch dashboard: ${error.message}`);
    }
  }

  async getDashboardWidget(widgetId, params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.DASHBOARD}/widget/${widgetId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch dashboard widget: ${error.message}`);
    }
  }

  async updateDashboardWidget(widgetId, widgetData) {
    try {
      const response = await apiService.put(`${MACHINE_MAINTENANCE_ENDPOINTS.DASHBOARD}/widget/${widgetId}`, widgetData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update dashboard widget: ${error.message}`);
    }
  }

  async getDashboardMetrics(params = {}) {
    try {
      const response = await apiService.get(`${MACHINE_MAINTENANCE_ENDPOINTS.DASHBOARD}/metrics`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch dashboard metrics: ${error.message}`);
    }
  }

  // WebSocket Connection
  subscribeToMaintenanceUpdates(callback) {
    try {
      return apiService.subscribeToWebSocket(MACHINE_MAINTENANCE_ENDPOINTS.WEBSOCKET, callback);
    } catch (error) {
      throw new Error(`Failed to subscribe to maintenance updates: ${error.message}`);
    }
  }

  unsubscribeFromMaintenanceUpdates(subscription) {
    try {
      return apiService.unsubscribeFromWebSocket(subscription);
    } catch (error) {
      throw new Error(`Failed to unsubscribe from maintenance updates: ${error.message}`);
    }
  }

  // File Upload
  async uploadFile(file, type = 'document') {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await apiService.post('/machine-maintenance/upload', formData, {
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
      const response = await apiService.get('/machine-maintenance/health');
      return response.data;
    } catch (error) {
      throw new Error(`Machine maintenance service health check failed: ${error.message}`);
    }
  }
}

export default new MachineMaintenanceApiService();

import { apiService } from './api';

class MachineMaintenanceApiService {
  constructor() {
    this.baseEndpoint = '/machine-maintenance';
  }

  // Equipment management
  async getEquipmentList(page = 1, limit = 20, filters = {}) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = value.toString();
          }
          return acc;
        }, {})
      });

      const response = await apiService.get(`${this.baseEndpoint}/equipment?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching equipment list:', error);
      throw error;
    }
  }

  async getEquipmentById(equipmentId) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/equipment/${equipmentId}`);
      return response;
    } catch (error) {
      console.error('Error fetching equipment:', error);
      throw error;
    }
  }

  async createEquipment(equipmentData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/equipment`, equipmentData);
      return response;
    } catch (error) {
      console.error('Error creating equipment:', error);
      throw error;
    }
  }

  async updateEquipment(equipmentId, updateData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/equipment/${equipmentId}`, updateData);
      return response;
    } catch (error) {
      console.error('Error updating equipment:', error);
      throw error;
    }
  }

  async deleteEquipment(equipmentId) {
    try {
      const response = await apiService.delete(`${this.baseEndpoint}/equipment/${equipmentId}`);
      return response;
    } catch (error) {
      console.error('Error deleting equipment:', error);
      throw error;
    }
  }

  // Maintenance schedule management
  async getMaintenanceSchedule(page = 1, limit = 20, filters = {}) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = value.toString();
          }
          return acc;
        }, {})
      });

      const response = await apiService.get(`${this.baseEndpoint}/schedule?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching maintenance schedule:', error);
      throw error;
    }
  }

  async createMaintenanceSchedule(scheduleData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/schedule`, scheduleData);
      return response;
    } catch (error) {
      console.error('Error creating maintenance schedule:', error);
      throw error;
    }
  }

  async updateMaintenanceSchedule(scheduleId, updateData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/schedule/${scheduleId}`, updateData);
      return response;
    } catch (error) {
      console.error('Error updating maintenance schedule:', error);
      throw error;
    }
  }

  async deleteMaintenanceSchedule(scheduleId) {
    try {
      const response = await apiService.delete(`${this.baseEndpoint}/schedule/${scheduleId}`);
      return response;
    } catch (error) {
      console.error('Error deleting maintenance schedule:', error);
      throw error;
    }
  }

  // Work order management
  async getWorkOrders(page = 1, limit = 20, filters = {}) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = value.toString();
          }
          return acc;
        }, {})
      });

      const response = await apiService.get(`${this.baseEndpoint}/work-orders?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching work orders:', error);
      throw error;
    }
  }

  async getWorkOrderById(workOrderId) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/work-orders/${workOrderId}`);
      return response;
    } catch (error) {
      console.error('Error fetching work order:', error);
      throw error;
    }
  }

  async createWorkOrder(workOrderData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/work-orders`, workOrderData);
      return response;
    } catch (error) {
      console.error('Error creating work order:', error);
      throw error;
    }
  }

  async updateWorkOrder(workOrderId, updateData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/work-orders/${workOrderId}`, updateData);
      return response;
    } catch (error) {
      console.error('Error updating work order:', error);
      throw error;
    }
  }

  async assignWorkOrder(workOrderId, assigneeId) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/work-orders/${workOrderId}/assign`, {
        assigneeId
      });
      return response;
    } catch (error) {
      console.error('Error assigning work order:', error);
      throw error;
    }
  }

  async completeWorkOrder(workOrderId, completionData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/work-orders/${workOrderId}/complete`, completionData);
      return response;
    } catch (error) {
      console.error('Error completing work order:', error);
      throw error;
    }
  }

  // Maintenance history
  async getMaintenanceHistory(equipmentId, page = 1, limit = 20) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      const response = await apiService.get(`${this.baseEndpoint}/equipment/${equipmentId}/history?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching maintenance history:', error);
      throw error;
    }
  }

  async getAllMaintenanceHistory(page = 1, limit = 20, filters = {}) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = value.toString();
          }
          return acc;
        }, {})
      });

      const response = await apiService.get(`${this.baseEndpoint}/history?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching all maintenance history:', error);
      throw error;
    }
  }

  // Spare parts management
  async getSpareParts(page = 1, limit = 20, filters = {}) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = value.toString();
          }
          return acc;
        }, {})
      });

      const response = await apiService.get(`${this.baseEndpoint}/spare-parts?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching spare parts:', error);
      throw error;
    }
  }

  async createSparePart(sparePartData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/spare-parts`, sparePartData);
      return response;
    } catch (error) {
      console.error('Error creating spare part:', error);
      throw error;
    }
  }

  async updateSparePartStock(sparePartId, stockData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/spare-parts/${sparePartId}/stock`, stockData);
      return response;
    } catch (error) {
      console.error('Error updating spare part stock:', error);
      throw error;
    }
  }

  async requestSparePart(sparePartId, requestData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/spare-parts/${sparePartId}/request`, requestData);
      return response;
    } catch (error) {
      console.error('Error requesting spare part:', error);
      throw error;
    }
  }

  // Performance monitoring
  async getEquipmentPerformance(equipmentId, period = 'week') {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/equipment/${equipmentId}/performance?period=${period}`);
      return response;
    } catch (error) {
      console.error('Error fetching equipment performance:', error);
      throw error;
    }
  }

  async getMaintenanceMetrics(period = 'month') {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/metrics?period=${period}`);
      return response;
    } catch (error) {
      console.error('Error fetching maintenance metrics:', error);
      throw error;
    }
  }

  async getPredictiveMaintenanceAlerts() {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/predictive-alerts`);
      return response;
    } catch (error) {
      console.error('Error fetching predictive maintenance alerts:', error);
      throw error;
    }
  }

  // Checklist management
  async getMaintenanceChecklists(equipmentType) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/checklists?equipmentType=${equipmentType}`);
      return response;
    } catch (error) {
      console.error('Error fetching maintenance checklists:', error);
      throw error;
    }
  }

  async createMaintenanceChecklist(checklistData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/checklists`, checklistData);
      return response;
    } catch (error) {
      console.error('Error creating maintenance checklist:', error);
      throw error;
    }
  }

  async completeMaintenanceChecklist(checklistId, completionData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/checklists/${checklistId}/complete`, completionData);
      return response;
    } catch (error) {
      console.error('Error completing maintenance checklist:', error);
      throw error;
    }
  }

  // Reporting
  async generateMaintenanceReport(reportType, parameters = {}) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/reports/generate`, {
        type: reportType,
        parameters
      });
      return response;
    } catch (error) {
      console.error('Error generating maintenance report:', error);
      throw error;
    }
  }

  async getMaintenanceCosts(startDate, endDate, filters = {}) {
    try {
      const params = new URLSearchParams({
        startDate,
        endDate,
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = value.toString();
          }
          return acc;
        }, {})
      });

      const response = await apiService.get(`${this.baseEndpoint}/costs?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching maintenance costs:', error);
      throw error;
    }
  }

  // File uploads
  async uploadMaintenanceDocument(workOrderId, file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('workOrderId', workOrderId);

      const response = await apiService.postFormData(`${this.baseEndpoint}/documents/upload`, formData);
      return response;
    } catch (error) {
      console.error('Error uploading maintenance document:', error);
      throw error;
    }
  }

  async getMaintenanceDocuments(workOrderId) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/work-orders/${workOrderId}/documents`);
      return response;
    } catch (error) {
      console.error('Error fetching maintenance documents:', error);
      throw error;
    }
  }

  // Real-time updates
  subscribeToMaintenanceUpdates(callback) {
    return apiService.webSocketService.subscribe('maintenance-updates', callback);
  }

  subscribeToWorkOrderUpdates(callback) {
    return apiService.webSocketService.subscribe('work-order-updates', callback);
  }

  subscribeToEquipmentAlerts(callback) {
    return apiService.webSocketService.subscribe('equipment-alerts', callback);
  }

  subscribeToPredictiveAlerts(callback) {
    return apiService.webSocketService.subscribe('predictive-alerts', callback);
  }
}

// Create and export singleton instance
export const machineMaintenanceApiService = new MachineMaintenanceApiService();
export default machineMaintenanceApiService;

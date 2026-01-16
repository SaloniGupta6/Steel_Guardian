import { apiService } from './api';

class MaterialFlowApiService {
  constructor() {
    this.baseEndpoint = '/material-flow';
  }

  // Material tracking operations
  async createMaterialRecord(materialData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/materials`, materialData);
      return response;
    } catch (error) {
      console.error('Error creating material record:', error);
      throw error;
    }
  }

  async getMaterials(page = 1, limit = 20, filters = {}) {
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

      const response = await apiService.get(`${this.baseEndpoint}/materials?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching materials:', error);
      throw error;
    }
  }

  async getMaterialById(materialId) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/materials/${materialId}`);
      return response;
    } catch (error) {
      console.error('Error fetching material:', error);
      throw error;
    }
  }

  async updateMaterial(materialId, updateData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/materials/${materialId}`, updateData);
      return response;
    } catch (error) {
      console.error('Error updating material:', error);
      throw error;
    }
  }

  async deleteMaterial(materialId) {
    try {
      const response = await apiService.delete(`${this.baseEndpoint}/materials/${materialId}`);
      return response;
    } catch (error) {
      console.error('Error deleting material:', error);
      throw error;
    }
  }

  // Material flow tracking
  async trackMaterialMovement(movementData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/movements`, movementData);
      return response;
    } catch (error) {
      console.error('Error tracking material movement:', error);
      throw error;
    }
  }

  async getMovementHistory(materialId, page = 1, limit = 20) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      const response = await apiService.get(`${this.baseEndpoint}/materials/${materialId}/movements?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching movement history:', error);
      throw error;
    }
  }

  async getAllMovements(page = 1, limit = 20, filters = {}) {
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

      const response = await apiService.get(`${this.baseEndpoint}/movements?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching all movements:', error);
      throw error;
    }
  }

  // Inventory management
  async getInventoryStatus(locationId = null) {
    try {
      const endpoint = locationId 
        ? `${this.baseEndpoint}/inventory/status?location=${locationId}`
        : `${this.baseEndpoint}/inventory/status`;
      
      const response = await apiService.get(endpoint);
      return response;
    } catch (error) {
      console.error('Error fetching inventory status:', error);
      throw error;
    }
  }

  async updateInventoryLevel(materialId, locationId, quantity, reason = '') {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/inventory/update`, {
        materialId,
        locationId,
        quantity,
        reason
      });
      return response;
    } catch (error) {
      console.error('Error updating inventory level:', error);
      throw error;
    }
  }

  async getInventoryAlerts() {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/inventory/alerts`);
      return response;
    } catch (error) {
      console.error('Error fetching inventory alerts:', error);
      throw error;
    }
  }

  // Quality control
  async recordQualityCheck(qualityData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/quality-checks`, qualityData);
      return response;
    } catch (error) {
      console.error('Error recording quality check:', error);
      throw error;
    }
  }

  async getQualityChecks(materialId, page = 1, limit = 20) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      const response = await apiService.get(`${this.baseEndpoint}/materials/${materialId}/quality-checks?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching quality checks:', error);
      throw error;
    }
  }

  // Analytics and reporting
  async getMaterialFlowAnalytics(startDate, endDate, filters = {}) {
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

      const response = await apiService.get(`${this.baseEndpoint}/analytics?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching material flow analytics:', error);
      throw error;
    }
  }

  async getEfficiencyMetrics(period = 'week') {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/metrics/efficiency?period=${period}`);
      return response;
    } catch (error) {
      console.error('Error fetching efficiency metrics:', error);
      throw error;
    }
  }

  async generateFlowReport(reportType, parameters = {}) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/reports/generate`, {
        type: reportType,
        parameters
      });
      return response;
    } catch (error) {
      console.error('Error generating flow report:', error);
      throw error;
    }
  }

  // Location management
  async getLocations() {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/locations`);
      return response;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }

  async createLocation(locationData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/locations`, locationData);
      return response;
    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  }

  async updateLocation(locationId, updateData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/locations/${locationId}`, updateData);
      return response;
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  }

  // Real-time updates
  subscribeToMaterialUpdates(callback) {
    return apiService.webSocketService.subscribe('material-updates', callback);
  }

  subscribeToInventoryAlerts(callback) {
    return apiService.webSocketService.subscribe('inventory-alerts', callback);
  }

  subscribeToMovementTracking(callback) {
    return apiService.webSocketService.subscribe('movement-tracking', callback);
  }
}

// Create and export singleton instance
export const materialFlowApiService = new MaterialFlowApiService();
export default materialFlowApiService;

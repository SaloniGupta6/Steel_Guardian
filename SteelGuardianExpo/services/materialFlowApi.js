import apiService from './api';

const MATERIAL_FLOW_ENDPOINTS = {
  FLOWS: '/material-flow/flows',
  INVENTORY: '/material-flow/inventory',
  TRACKING: '/material-flow/tracking',
  LOGISTICS: '/material-flow/logistics',
  SUPPLY_CHAIN: '/material-flow/supply-chain',
  ROUTES: '/material-flow/routes',
  WAREHOUSES: '/material-flow/warehouses',
  SUPPLIERS: '/material-flow/suppliers',
  ORDERS: '/material-flow/orders',
  SHIPMENTS: '/material-flow/shipments',
  QUALITY_CONTROL: '/material-flow/quality-control',
  BATCH_TRACKING: '/material-flow/batch-tracking',
  ANALYTICS: '/material-flow/analytics',
  FORECASTING: '/material-flow/forecasting',
  OPTIMIZATION: '/material-flow/optimization',
  ALERTS: '/material-flow/alerts',
  REPORTS: '/material-flow/reports',
  COMPLIANCE: '/material-flow/compliance',
  TEMPERATURE_MONITORING: '/material-flow/temperature',
  RFID: '/material-flow/rfid',
  BARCODE: '/material-flow/barcode',
  AUTOMATION: '/material-flow/automation',
  INTEGRATION: '/material-flow/integration',
  DASHBOARD: '/material-flow/dashboard',
  NOTIFICATIONS: '/material-flow/notifications',
  AUDIT_TRAIL: '/material-flow/audit-trail',
  COSTS: '/material-flow/costs',
  PERFORMANCE: '/material-flow/performance',
  WEBSOCKET: '/material-flow/websocket'
};

class MaterialFlowApiService {
  // Material Flow Management
  async getMaterialFlows(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.FLOWS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch material flows: ${error.message}`);
    }
  }

  async getMaterialFlowById(flowId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.FLOWS}/${flowId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch material flow: ${error.message}`);
    }
  }

  async createMaterialFlow(flowData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.FLOWS, flowData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create material flow: ${error.message}`);
    }
  }

  async updateMaterialFlow(flowId, flowData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.FLOWS}/${flowId}`, flowData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update material flow: ${error.message}`);
    }
  }

  async deleteMaterialFlow(flowId) {
    try {
      const response = await apiService.delete(`${MATERIAL_FLOW_ENDPOINTS.FLOWS}/${flowId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete material flow: ${error.message}`);
    }
  }

  async getFlowStatus(flowId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.FLOWS}/${flowId}/status`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch flow status: ${error.message}`);
    }
  }

  async updateFlowStatus(flowId, status) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.FLOWS}/${flowId}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update flow status: ${error.message}`);
    }
  }

  // Inventory Management
  async getInventory(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.INVENTORY, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch inventory: ${error.message}`);
    }
  }

  async getInventoryItem(itemId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.INVENTORY}/${itemId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch inventory item: ${error.message}`);
    }
  }

  async updateInventoryItem(itemId, itemData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.INVENTORY}/${itemId}`, itemData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update inventory item: ${error.message}`);
    }
  }

  async addInventoryItem(itemData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.INVENTORY, itemData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add inventory item: ${error.message}`);
    }
  }

  async removeInventoryItem(itemId) {
    try {
      const response = await apiService.delete(`${MATERIAL_FLOW_ENDPOINTS.INVENTORY}/${itemId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to remove inventory item: ${error.message}`);
    }
  }

  async getInventoryLevels(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.INVENTORY}/levels`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch inventory levels: ${error.message}`);
    }
  }

  async getLowStockItems(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.INVENTORY}/low-stock`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch low stock items: ${error.message}`);
    }
  }

  async performStockTake(stockTakeData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.INVENTORY}/stock-take`, stockTakeData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to perform stock take: ${error.message}`);
    }
  }

  // Tracking
  async trackMaterial(materialId, params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.TRACKING}/${materialId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to track material: ${error.message}`);
    }
  }

  async updateMaterialLocation(materialId, locationData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.TRACKING}/${materialId}/location`, locationData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update material location: ${error.message}`);
    }
  }

  async getTrackingHistory(materialId, params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.TRACKING}/${materialId}/history`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch tracking history: ${error.message}`);
    }
  }

  async getLocationMaterials(locationId, params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.TRACKING}/location/${locationId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch location materials: ${error.message}`);
    }
  }

  async bulkUpdateLocations(updates) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.TRACKING}/bulk-update`, updates);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to bulk update locations: ${error.message}`);
    }
  }

  // Logistics
  async getLogistics(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.LOGISTICS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch logistics: ${error.message}`);
    }
  }

  async createLogisticsOrder(orderData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.LOGISTICS, orderData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create logistics order: ${error.message}`);
    }
  }

  async updateLogisticsOrder(orderId, orderData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.LOGISTICS}/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update logistics order: ${error.message}`);
    }
  }

  async getLogisticsOrder(orderId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.LOGISTICS}/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch logistics order: ${error.message}`);
    }
  }

  async cancelLogisticsOrder(orderId, reason) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.LOGISTICS}/${orderId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to cancel logistics order: ${error.message}`);
    }
  }

  // Supply Chain
  async getSupplyChain(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.SUPPLY_CHAIN, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch supply chain: ${error.message}`);
    }
  }

  async getSupplyChainVisibility(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.SUPPLY_CHAIN}/visibility`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch supply chain visibility: ${error.message}`);
    }
  }

  async getSupplyChainRisks(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.SUPPLY_CHAIN}/risks`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch supply chain risks: ${error.message}`);
    }
  }

  async createSupplyChainAlert(alertData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.SUPPLY_CHAIN}/alerts`, alertData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create supply chain alert: ${error.message}`);
    }
  }

  // Routes
  async getRoutes(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.ROUTES, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch routes: ${error.message}`);
    }
  }

  async createRoute(routeData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.ROUTES, routeData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create route: ${error.message}`);
    }
  }

  async updateRoute(routeId, routeData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.ROUTES}/${routeId}`, routeData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update route: ${error.message}`);
    }
  }

  async deleteRoute(routeId) {
    try {
      const response = await apiService.delete(`${MATERIAL_FLOW_ENDPOINTS.ROUTES}/${routeId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete route: ${error.message}`);
    }
  }

  async optimizeRoute(routeId, params = {}) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.ROUTES}/${routeId}/optimize`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to optimize route: ${error.message}`);
    }
  }

  async getRouteProgress(routeId, params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.ROUTES}/${routeId}/progress`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch route progress: ${error.message}`);
    }
  }

  // Warehouses
  async getWarehouses(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.WAREHOUSES, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch warehouses: ${error.message}`);
    }
  }

  async getWarehouse(warehouseId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.WAREHOUSES}/${warehouseId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch warehouse: ${error.message}`);
    }
  }

  async createWarehouse(warehouseData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.WAREHOUSES, warehouseData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create warehouse: ${error.message}`);
    }
  }

  async updateWarehouse(warehouseId, warehouseData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.WAREHOUSES}/${warehouseId}`, warehouseData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update warehouse: ${error.message}`);
    }
  }

  async deleteWarehouse(warehouseId) {
    try {
      const response = await apiService.delete(`${MATERIAL_FLOW_ENDPOINTS.WAREHOUSES}/${warehouseId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete warehouse: ${error.message}`);
    }
  }

  async getWarehouseCapacity(warehouseId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.WAREHOUSES}/${warehouseId}/capacity`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch warehouse capacity: ${error.message}`);
    }
  }

  async getWarehouseUtilization(warehouseId, params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.WAREHOUSES}/${warehouseId}/utilization`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch warehouse utilization: ${error.message}`);
    }
  }

  // Suppliers
  async getSuppliers(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.SUPPLIERS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch suppliers: ${error.message}`);
    }
  }

  async getSupplier(supplierId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.SUPPLIERS}/${supplierId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch supplier: ${error.message}`);
    }
  }

  async createSupplier(supplierData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.SUPPLIERS, supplierData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create supplier: ${error.message}`);
    }
  }

  async updateSupplier(supplierId, supplierData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.SUPPLIERS}/${supplierId}`, supplierData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update supplier: ${error.message}`);
    }
  }

  async deleteSupplier(supplierId) {
    try {
      const response = await apiService.delete(`${MATERIAL_FLOW_ENDPOINTS.SUPPLIERS}/${supplierId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete supplier: ${error.message}`);
    }
  }

  async getSupplierPerformance(supplierId, params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.SUPPLIERS}/${supplierId}/performance`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch supplier performance: ${error.message}`);
    }
  }

  async rateSupplier(supplierId, ratingData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.SUPPLIERS}/${supplierId}/rate`, ratingData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to rate supplier: ${error.message}`);
    }
  }

  // Orders
  async getOrders(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.ORDERS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }

  async getOrder(orderId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.ORDERS}/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch order: ${error.message}`);
    }
  }

  async createOrder(orderData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.ORDERS, orderData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async updateOrder(orderId, orderData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.ORDERS}/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update order: ${error.message}`);
    }
  }

  async cancelOrder(orderId, reason) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.ORDERS}/${orderId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to cancel order: ${error.message}`);
    }
  }

  async approveOrder(orderId, approvalData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.ORDERS}/${orderId}/approve`, approvalData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to approve order: ${error.message}`);
    }
  }

  async rejectOrder(orderId, rejectionData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.ORDERS}/${orderId}/reject`, rejectionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to reject order: ${error.message}`);
    }
  }

  async getOrderStatus(orderId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.ORDERS}/${orderId}/status`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch order status: ${error.message}`);
    }
  }

  // Shipments
  async getShipments(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.SHIPMENTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch shipments: ${error.message}`);
    }
  }

  async getShipment(shipmentId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.SHIPMENTS}/${shipmentId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch shipment: ${error.message}`);
    }
  }

  async createShipment(shipmentData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.SHIPMENTS, shipmentData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create shipment: ${error.message}`);
    }
  }

  async updateShipment(shipmentId, shipmentData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.SHIPMENTS}/${shipmentId}`, shipmentData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update shipment: ${error.message}`);
    }
  }

  async trackShipment(shipmentId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.SHIPMENTS}/${shipmentId}/track`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to track shipment: ${error.message}`);
    }
  }

  async confirmShipmentDelivery(shipmentId, deliveryData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.SHIPMENTS}/${shipmentId}/delivery`, deliveryData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to confirm shipment delivery: ${error.message}`);
    }
  }

  // Quality Control
  async getQualityControls(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.QUALITY_CONTROL, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch quality controls: ${error.message}`);
    }
  }

  async createQualityControl(qualityData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.QUALITY_CONTROL, qualityData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create quality control: ${error.message}`);
    }
  }

  async updateQualityControl(qualityId, qualityData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.QUALITY_CONTROL}/${qualityId}`, qualityData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update quality control: ${error.message}`);
    }
  }

  async performQualityInspection(inspectionData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.QUALITY_CONTROL}/inspection`, inspectionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to perform quality inspection: ${error.message}`);
    }
  }

  async getQualityReport(materialId, params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.QUALITY_CONTROL}/${materialId}/report`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch quality report: ${error.message}`);
    }
  }

  // Batch Tracking
  async getBatches(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.BATCH_TRACKING, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch batches: ${error.message}`);
    }
  }

  async getBatch(batchId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.BATCH_TRACKING}/${batchId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch batch: ${error.message}`);
    }
  }

  async createBatch(batchData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.BATCH_TRACKING, batchData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create batch: ${error.message}`);
    }
  }

  async updateBatch(batchId, batchData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.BATCH_TRACKING}/${batchId}`, batchData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update batch: ${error.message}`);
    }
  }

  async getBatchHistory(batchId, params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.BATCH_TRACKING}/${batchId}/history`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch batch history: ${error.message}`);
    }
  }

  async splitBatch(batchId, splitData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.BATCH_TRACKING}/${batchId}/split`, splitData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to split batch: ${error.message}`);
    }
  }

  async mergeBatches(mergeData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.BATCH_TRACKING}/merge`, mergeData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to merge batches: ${error.message}`);
    }
  }

  // Analytics
  async getAnalytics(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.ANALYTICS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch analytics: ${error.message}`);
    }
  }

  async getFlowAnalytics(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.ANALYTICS}/flow`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch flow analytics: ${error.message}`);
    }
  }

  async getPerformanceMetrics(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.ANALYTICS}/performance`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch performance metrics: ${error.message}`);
    }
  }

  async getKPIs(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.ANALYTICS}/kpis`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch KPIs: ${error.message}`);
    }
  }

  async getEfficiencyMetrics(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.ANALYTICS}/efficiency`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch efficiency metrics: ${error.message}`);
    }
  }

  // Forecasting
  async getForecasts(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.FORECASTING, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch forecasts: ${error.message}`);
    }
  }

  async createForecast(forecastData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.FORECASTING, forecastData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create forecast: ${error.message}`);
    }
  }

  async getDemandForecast(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.FORECASTING}/demand`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch demand forecast: ${error.message}`);
    }
  }

  async getSupplyForecast(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.FORECASTING}/supply`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch supply forecast: ${error.message}`);
    }
  }

  // Optimization
  async getOptimizations(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.OPTIMIZATION, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch optimizations: ${error.message}`);
    }
  }

  async optimizeFlow(optimizationData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.OPTIMIZATION}/flow`, optimizationData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to optimize flow: ${error.message}`);
    }
  }

  async optimizeInventory(optimizationData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.OPTIMIZATION}/inventory`, optimizationData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to optimize inventory: ${error.message}`);
    }
  }

  async optimizeLogistics(optimizationData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.OPTIMIZATION}/logistics`, optimizationData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to optimize logistics: ${error.message}`);
    }
  }

  // Alerts
  async getAlerts(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.ALERTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch alerts: ${error.message}`);
    }
  }

  async createAlert(alertData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.ALERTS, alertData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create alert: ${error.message}`);
    }
  }

  async updateAlert(alertId, alertData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.ALERTS}/${alertId}`, alertData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update alert: ${error.message}`);
    }
  }

  async acknowledgeAlert(alertId) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.ALERTS}/${alertId}/acknowledge`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to acknowledge alert: ${error.message}`);
    }
  }

  async resolveAlert(alertId, resolution) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.ALERTS}/${alertId}/resolve`, { resolution });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to resolve alert: ${error.message}`);
    }
  }

  // Reports
  async getReports(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.REPORTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch reports: ${error.message}`);
    }
  }

  async generateReport(reportData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.REPORTS, reportData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to generate report: ${error.message}`);
    }
  }

  async getReportById(reportId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.REPORTS}/${reportId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch report: ${error.message}`);
    }
  }

  async downloadReport(reportId, format = 'pdf') {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.REPORTS}/${reportId}/download`, { format });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to download report: ${error.message}`);
    }
  }

  // Compliance
  async getCompliance(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.COMPLIANCE, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch compliance: ${error.message}`);
    }
  }

  async createComplianceRecord(complianceData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.COMPLIANCE, complianceData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create compliance record: ${error.message}`);
    }
  }

  async getComplianceStatus(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.COMPLIANCE}/status`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch compliance status: ${error.message}`);
    }
  }

  // Temperature Monitoring
  async getTemperatureData(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.TEMPERATURE_MONITORING, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch temperature data: ${error.message}`);
    }
  }

  async recordTemperature(temperatureData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.TEMPERATURE_MONITORING, temperatureData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to record temperature: ${error.message}`);
    }
  }

  async getTemperatureAlerts(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.TEMPERATURE_MONITORING}/alerts`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch temperature alerts: ${error.message}`);
    }
  }

  // RFID
  async getRFIDData(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.RFID, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch RFID data: ${error.message}`);
    }
  }

  async scanRFID(rfidData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.RFID}/scan`, rfidData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to scan RFID: ${error.message}`);
    }
  }

  async registerRFID(rfidData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.RFID}/register`, rfidData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to register RFID: ${error.message}`);
    }
  }

  // Barcode
  async getBarcodeData(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.BARCODE, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch barcode data: ${error.message}`);
    }
  }

  async scanBarcode(barcodeData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.BARCODE}/scan`, barcodeData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to scan barcode: ${error.message}`);
    }
  }

  async generateBarcode(barcodeData) {
    try {
      const response = await apiService.post(`${MATERIAL_FLOW_ENDPOINTS.BARCODE}/generate`, barcodeData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to generate barcode: ${error.message}`);
    }
  }

  // Dashboard
  async getDashboard(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.DASHBOARD, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch dashboard: ${error.message}`);
    }
  }

  async getDashboardWidget(widgetId, params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.DASHBOARD}/widget/${widgetId}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch dashboard widget: ${error.message}`);
    }
  }

  async updateDashboardWidget(widgetId, widgetData) {
    try {
      const response = await apiService.put(`${MATERIAL_FLOW_ENDPOINTS.DASHBOARD}/widget/${widgetId}`, widgetData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update dashboard widget: ${error.message}`);
    }
  }

  // Audit Trail
  async getAuditTrail(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.AUDIT_TRAIL, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch audit trail: ${error.message}`);
    }
  }

  async getAuditRecord(recordId) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.AUDIT_TRAIL}/${recordId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch audit record: ${error.message}`);
    }
  }

  async createAuditRecord(auditData) {
    try {
      const response = await apiService.post(MATERIAL_FLOW_ENDPOINTS.AUDIT_TRAIL, auditData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create audit record: ${error.message}`);
    }
  }

  // Costs
  async getCosts(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.COSTS, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch costs: ${error.message}`);
    }
  }

  async getCostAnalysis(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.COSTS}/analysis`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch cost analysis: ${error.message}`);
    }
  }

  async getCostBreakdown(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.COSTS}/breakdown`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch cost breakdown: ${error.message}`);
    }
  }

  // Performance
  async getPerformance(params = {}) {
    try {
      const response = await apiService.get(MATERIAL_FLOW_ENDPOINTS.PERFORMANCE, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch performance: ${error.message}`);
    }
  }

  async getPerformanceMetrics(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.PERFORMANCE}/metrics`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch performance metrics: ${error.message}`);
    }
  }

  async getPerformanceTrends(params = {}) {
    try {
      const response = await apiService.get(`${MATERIAL_FLOW_ENDPOINTS.PERFORMANCE}/trends`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch performance trends: ${error.message}`);
    }
  }

  // WebSocket Connection
  subscribeToMaterialFlowUpdates(callback) {
    try {
      return apiService.subscribeToWebSocket(MATERIAL_FLOW_ENDPOINTS.WEBSOCKET, callback);
    } catch (error) {
      throw new Error(`Failed to subscribe to material flow updates: ${error.message}`);
    }
  }

  unsubscribeFromMaterialFlowUpdates(subscription) {
    try {
      return apiService.unsubscribeFromWebSocket(subscription);
    } catch (error) {
      throw new Error(`Failed to unsubscribe from material flow updates: ${error.message}`);
    }
  }

  // File Upload
  async uploadFile(file, type = 'document') {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await apiService.post('/material-flow/upload', formData, {
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
      const response = await apiService.get('/material-flow/health');
      return response.data;
    } catch (error) {
      throw new Error(`Material flow service health check failed: ${error.message}`);
    }
  }
}

export default new MaterialFlowApiService();

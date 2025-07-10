import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService';

export const fetchMaintenanceData = createAsyncThunk(
  'maintenance/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/maintenance');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch maintenance data');
    }
  }
);

export const createMaintenanceAlert = createAsyncThunk(
  'maintenance/createAlert',
  async (alertData, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/maintenance/alert', alertData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create alert');
    }
  }
);

const maintenanceSlice = createSlice({
  name: 'maintenance',
  initialState: {
    machines: [],
    alerts: [],
    schedule: [],
    stats: {
      totalMachines: 0,
      healthyMachines: 0,
      criticalMachines: 0,
      uptime: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateMachineStatus: (state, action) => {
      const { machineId, status } = action.payload;
      const machine = state.machines.find(m => m._id === machineId);
      if (machine) {
        machine.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaintenanceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaintenanceData.fulfilled, (state, action) => {
        state.loading = false;
        state.machines = action.payload.machines;
        state.alerts = action.payload.alerts;
        state.schedule = action.payload.schedule;
        state.stats = action.payload.stats;
      })
      .addCase(fetchMaintenanceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, updateMachineStatus } = maintenanceSlice.actions;
export default maintenanceSlice.reducer;

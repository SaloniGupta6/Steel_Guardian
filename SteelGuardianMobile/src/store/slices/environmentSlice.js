import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService';

export const fetchEnvironmentData = createAsyncThunk(
  'environment/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/environment');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch environment data');
    }
  }
);

const environmentSlice = createSlice({
  name: 'environment',
  initialState: {
    metrics: {
      co2Emissions: 0,
      energyUsage: 0,
      waterUsage: 0,
      wasteGeneration: 0,
    },
    targets: {
      co2Reduction: 20,
      energyEfficiency: 15,
      waterConservation: 25,
      wasteReduction: 30,
    },
    departmentComparison: [],
    trends: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnvironmentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnvironmentData.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload.metrics;
        state.targets = action.payload.targets;
        state.departmentComparison = action.payload.departmentComparison;
        state.trends = action.payload.trends;
      })
      .addCase(fetchEnvironmentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = environmentSlice.actions;
export default environmentSlice.reducer;

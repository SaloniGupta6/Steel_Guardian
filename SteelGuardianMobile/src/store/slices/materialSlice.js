import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService';

export const fetchMaterialFlow = createAsyncThunk(
  'material/fetchFlow',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/material/flow');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch material flow');
    }
  }
);

export const updateMaterialLocation = createAsyncThunk(
  'material/updateLocation',
  async ({ materialId, location }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(`/material/${materialId}/location`, { location });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update location');
    }
  }
);

const materialSlice = createSlice({
  name: 'material',
  initialState: {
    materials: [],
    flowData: [],
    stats: {
      totalMaterials: 0,
      inTransit: 0,
      processed: 0,
      efficiency: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateMaterialStatus: (state, action) => {
      const { materialId, status } = action.payload;
      const material = state.materials.find(m => m._id === materialId);
      if (material) {
        material.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterialFlow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaterialFlow.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload.materials;
        state.flowData = action.payload.flowData;
        state.stats = action.payload.stats;
      })
      .addCase(fetchMaterialFlow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMaterialLocation.fulfilled, (state, action) => {
        const index = state.materials.findIndex(m => m._id === action.payload._id);
        if (index !== -1) {
          state.materials[index] = action.payload;
        }
      });
  },
});

export const { clearError, updateMaterialStatus } = materialSlice.actions;
export default materialSlice.reducer;

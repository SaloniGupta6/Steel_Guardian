import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService';

// Async thunks
export const reportIncident = createAsyncThunk(
  'safety/reportIncident',
  async (incidentData, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/safety/report', incidentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to report incident'
      );
    }
  }
);

export const fetchIncidents = createAsyncThunk(
  'safety/fetchIncidents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/safety');
      return response.data.incidents;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch incidents'
      );
    }
  }
);

export const updateIncident = createAsyncThunk(
  'safety/updateIncident',
  async ({ incidentId, updateData }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(`/safety/${incidentId}`, updateData);
      return response.data.incident;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update incident'
      );
    }
  }
);

export const fetchIncidentStats = createAsyncThunk(
  'safety/fetchStats',
  async (timeframe = '30d', { rejectWithValue }) => {
    try {
      const response = await apiService.get(`/safety/stats?timeframe=${timeframe}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch stats'
      );
    }
  }
);

const safetySlice = createSlice({
  name: 'safety',
  initialState: {
    incidents: [],
    stats: {
      totalIncidents: 0,
      resolvedIncidents: 0,
      pendingIncidents: 0,
      criticalIncidents: 0,
      averageResolutionTime: 0,
      incidentsByCategory: [],
      incidentsBySeverity: [],
      trendsData: [],
    },
    loading: false,
    error: null,
    reporting: false,
    reportSuccess: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearReportSuccess: (state) => {
      state.reportSuccess = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addIncidentToList: (state, action) => {
      state.incidents.unshift(action.payload);
    },
    updateIncidentInList: (state, action) => {
      const index = state.incidents.findIndex(
        incident => incident._id === action.payload._id
      );
      if (index !== -1) {
        state.incidents[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    // Report incident
    builder
      .addCase(reportIncident.pending, (state) => {
        state.reporting = true;
        state.error = null;
        state.reportSuccess = false;
      })
      .addCase(reportIncident.fulfilled, (state, action) => {
        state.reporting = false;
        state.reportSuccess = true;
        state.incidents.unshift(action.payload.incident);
      })
      .addCase(reportIncident.rejected, (state, action) => {
        state.reporting = false;
        state.error = action.payload;
        state.reportSuccess = false;
      });

    // Fetch incidents
    builder
      .addCase(fetchIncidents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.loading = false;
        state.incidents = action.payload;
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update incident
    builder
      .addCase(updateIncident.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIncident.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.incidents.findIndex(
          incident => incident._id === action.payload._id
        );
        if (index !== -1) {
          state.incidents[index] = action.payload;
        }
      })
      .addCase(updateIncident.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch stats
    builder
      .addCase(fetchIncidentStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncidentStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchIncidentStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearReportSuccess,
  setLoading,
  addIncidentToList,
  updateIncidentInList,
} = safetySlice.actions;

export default safetySlice.reducer;

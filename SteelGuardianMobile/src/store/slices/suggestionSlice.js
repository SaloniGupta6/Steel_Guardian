import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService';

export const fetchSuggestions = createAsyncThunk(
  'suggestions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/suggestions');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch suggestions');
    }
  }
);

export const submitSuggestion = createAsyncThunk(
  'suggestions/submit',
  async (suggestionData, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/suggestions', suggestionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit suggestion');
    }
  }
);

export const voteSuggestion = createAsyncThunk(
  'suggestions/vote',
  async ({ suggestionId, voteType }, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`/suggestions/${suggestionId}/vote`, { voteType });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to vote');
    }
  }
);

const suggestionSlice = createSlice({
  name: 'suggestions',
  initialState: {
    suggestions: [],
    categories: [
      'Safety Improvement',
      'Process Optimization',
      'Environmental',
      'Cost Reduction',
      'Technology',
      'Other'
    ],
    stats: {
      totalSuggestions: 0,
      implementedSuggestions: 0,
      pendingReview: 0,
      myContributions: 0,
    },
    loading: false,
    error: null,
    submitting: false,
    submitSuccess: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSubmitSuccess: (state) => {
      state.submitSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload.suggestions;
        state.stats = action.payload.stats;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitSuggestion.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(submitSuggestion.fulfilled, (state, action) => {
        state.submitting = false;
        state.submitSuccess = true;
        state.suggestions.unshift(action.payload.suggestion);
      })
      .addCase(submitSuggestion.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
        state.submitSuccess = false;
      })
      .addCase(voteSuggestion.fulfilled, (state, action) => {
        const index = state.suggestions.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.suggestions[index] = action.payload;
        }
      });
  },
});

export const { clearError, clearSubmitSuccess } = suggestionSlice.actions;
export default suggestionSlice.reducer;

import { apiService } from './api';

class SuggestionSystemApiService {
  constructor() {
    this.baseEndpoint = '/suggestions';
  }

  // Suggestion management
  async getSuggestions(page = 1, limit = 20, filters = {}) {
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

      const response = await apiService.get(`${this.baseEndpoint}?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      throw error;
    }
  }

  async getSuggestionById(suggestionId) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/${suggestionId}`);
      return response;
    } catch (error) {
      console.error('Error fetching suggestion:', error);
      throw error;
    }
  }

  async createSuggestion(suggestionData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}`, suggestionData);
      return response;
    } catch (error) {
      console.error('Error creating suggestion:', error);
      throw error;
    }
  }

  async updateSuggestion(suggestionId, updateData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/${suggestionId}`, updateData);
      return response;
    } catch (error) {
      console.error('Error updating suggestion:', error);
      throw error;
    }
  }

  async deleteSuggestion(suggestionId) {
    try {
      const response = await apiService.delete(`${this.baseEndpoint}/${suggestionId}`);
      return response;
    } catch (error) {
      console.error('Error deleting suggestion:', error);
      throw error;
    }
  }

  // AI-powered suggestions
  async getAISuggestions(context = {}) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/ai-generate`, context);
      return response;
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      throw error;
    }
  }

  async getPersonalizedSuggestions(userId, preferences = {}) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/personalized`, {
        userId,
        preferences
      });
      return response;
    } catch (error) {
      console.error('Error getting personalized suggestions:', error);
      throw error;
    }
  }

  async analyzeSuggestionFeasibility(suggestionId) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/${suggestionId}/analyze`);
      return response;
    } catch (error) {
      console.error('Error analyzing suggestion feasibility:', error);
      throw error;
    }
  }

  // Voting system
  async voteSuggestion(suggestionId, voteData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/${suggestionId}/vote`, voteData);
      return response;
    } catch (error) {
      console.error('Error voting on suggestion:', error);
      throw error;
    }
  }

  async updateVote(suggestionId, voteId, voteData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/${suggestionId}/vote/${voteId}`, voteData);
      return response;
    } catch (error) {
      console.error('Error updating vote:', error);
      throw error;
    }
  }

  async removeVote(suggestionId, voteId) {
    try {
      const response = await apiService.delete(`${this.baseEndpoint}/${suggestionId}/vote/${voteId}`);
      return response;
    } catch (error) {
      console.error('Error removing vote:', error);
      throw error;
    }
  }

  async getVoteStatistics(suggestionId) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/${suggestionId}/votes/stats`);
      return response;
    } catch (error) {
      console.error('Error fetching vote statistics:', error);
      throw error;
    }
  }

  // Comments and feedback
  async getSuggestionComments(suggestionId, page = 1, limit = 20) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      const response = await apiService.get(`${this.baseEndpoint}/${suggestionId}/comments?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching suggestion comments:', error);
      throw error;
    }
  }

  async addSuggestionComment(suggestionId, commentData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/${suggestionId}/comments`, commentData);
      return response;
    } catch (error) {
      console.error('Error adding suggestion comment:', error);
      throw error;
    }
  }

  async updateSuggestionComment(suggestionId, commentId, updateData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/${suggestionId}/comments/${commentId}`, updateData);
      return response;
    } catch (error) {
      console.error('Error updating suggestion comment:', error);
      throw error;
    }
  }

  async deleteSuggestionComment(suggestionId, commentId) {
    try {
      const response = await apiService.delete(`${this.baseEndpoint}/${suggestionId}/comments/${commentId}`);
      return response;
    } catch (error) {
      console.error('Error deleting suggestion comment:', error);
      throw error;
    }
  }

  // Categories and tags
  async getSuggestionCategories() {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/categories`);
      return response;
    } catch (error) {
      console.error('Error fetching suggestion categories:', error);
      throw error;
    }
  }

  async createSuggestionCategory(categoryData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/categories`, categoryData);
      return response;
    } catch (error) {
      console.error('Error creating suggestion category:', error);
      throw error;
    }
  }

  async getSuggestionTags() {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/tags`);
      return response;
    } catch (error) {
      console.error('Error fetching suggestion tags:', error);
      throw error;
    }
  }

  async createSuggestionTag(tagData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/tags`, tagData);
      return response;
    } catch (error) {
      console.error('Error creating suggestion tag:', error);
      throw error;
    }
  }

  // Implementation tracking
  async getSuggestionImplementations(page = 1, limit = 20, filters = {}) {
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

      const response = await apiService.get(`${this.baseEndpoint}/implementations?${params}`);
      return response;
    } catch (error) {
      console.error('Error fetching suggestion implementations:', error);
      throw error;
    }
  }

  async createImplementation(suggestionId, implementationData) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/${suggestionId}/implementations`, implementationData);
      return response;
    } catch (error) {
      console.error('Error creating implementation:', error);
      throw error;
    }
  }

  async updateImplementationStatus(suggestionId, implementationId, statusData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/${suggestionId}/implementations/${implementationId}/status`, statusData);
      return response;
    } catch (error) {
      console.error('Error updating implementation status:', error);
      throw error;
    }
  }

  async completeImplementation(suggestionId, implementationId, completionData) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/${suggestionId}/implementations/${implementationId}/complete`, completionData);
      return response;
    } catch (error) {
      console.error('Error completing implementation:', error);
      throw error;
    }
  }

  // Leaderboard and gamification
  async getUserLeaderboard(period = 'month', limit = 20) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/leaderboard?period=${period}&limit=${limit}`);
      return response;
    } catch (error) {
      console.error('Error fetching user leaderboard:', error);
      throw error;
    }
  }

  async getUserPoints(userId) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/users/${userId}/points`);
      return response;
    } catch (error) {
      console.error('Error fetching user points:', error);
      throw error;
    }
  }

  async getUserAchievements(userId) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/users/${userId}/achievements`);
      return response;
    } catch (error) {
      console.error('Error fetching user achievements:', error);
      throw error;
    }
  }

  async getAvailableBadges() {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/badges`);
      return response;
    } catch (error) {
      console.error('Error fetching available badges:', error);
      throw error;
    }
  }

  // Analytics and reporting
  async getSuggestionAnalytics(period = 'month', filters = {}) {
    try {
      const params = new URLSearchParams({
        period,
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
      console.error('Error fetching suggestion analytics:', error);
      throw error;
    }
  }

  async getImplementationMetrics(period = 'month') {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/metrics/implementation?period=${period}`);
      return response;
    } catch (error) {
      console.error('Error fetching implementation metrics:', error);
      throw error;
    }
  }

  async getVotingTrends(period = 'month') {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/metrics/voting?period=${period}`);
      return response;
    } catch (error) {
      console.error('Error fetching voting trends:', error);
      throw error;
    }
  }

  async generateSuggestionReport(reportType, parameters = {}) {
    try {
      const response = await apiService.post(`${this.baseEndpoint}/reports/generate`, {
        type: reportType,
        parameters
      });
      return response;
    } catch (error) {
      console.error('Error generating suggestion report:', error);
      throw error;
    }
  }

  // Search and filtering
  async searchSuggestions(query, filters = {}) {
    try {
      const params = new URLSearchParams({
        q: query,
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = value.toString();
          }
          return acc;
        }, {})
      });

      const response = await apiService.get(`${this.baseEndpoint}/search?${params}`);
      return response;
    } catch (error) {
      console.error('Error searching suggestions:', error);
      throw error;
    }
  }

  async getPopularSuggestions(period = 'week', limit = 10) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/popular?period=${period}&limit=${limit}`);
      return response;
    } catch (error) {
      console.error('Error fetching popular suggestions:', error);
      throw error;
    }
  }

  async getTrendingSuggestions(limit = 10) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/trending?limit=${limit}`);
      return response;
    } catch (error) {
      console.error('Error fetching trending suggestions:', error);
      throw error;
    }
  }

  // Notification preferences
  async getUserNotificationPreferences(userId) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/users/${userId}/notification-preferences`);
      return response;
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      throw error;
    }
  }

  async updateNotificationPreferences(userId, preferences) {
    try {
      const response = await apiService.put(`${this.baseEndpoint}/users/${userId}/notification-preferences`, preferences);
      return response;
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw error;
    }
  }

  // File uploads
  async uploadSuggestionAttachment(suggestionId, file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('suggestionId', suggestionId);

      const response = await apiService.postFormData(`${this.baseEndpoint}/attachments/upload`, formData);
      return response;
    } catch (error) {
      console.error('Error uploading suggestion attachment:', error);
      throw error;
    }
  }

  async getSuggestionAttachments(suggestionId) {
    try {
      const response = await apiService.get(`${this.baseEndpoint}/${suggestionId}/attachments`);
      return response;
    } catch (error) {
      console.error('Error fetching suggestion attachments:', error);
      throw error;
    }
  }

  // Real-time updates
  subscribeToSuggestionUpdates(callback) {
    return apiService.webSocketService.subscribe('suggestion-updates', callback);
  }

  subscribeToVotingUpdates(callback) {
    return apiService.webSocketService.subscribe('voting-updates', callback);
  }

  subscribeToImplementationUpdates(callback) {
    return apiService.webSocketService.subscribe('implementation-updates', callback);
  }

  subscribeToUserActivityUpdates(callback) {
    return apiService.webSocketService.subscribe('user-activity-updates', callback);
  }

  subscribeToLeaderboardUpdates(callback) {
    return apiService.webSocketService.subscribe('leaderboard-updates', callback);
  }
}

// Create and export singleton instance
export const suggestionSystemApiService = new SuggestionSystemApiService();
export default suggestionSystemApiService;

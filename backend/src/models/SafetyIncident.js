const mongoose = require('mongoose');

const safetyIncidentSchema = new mongoose.Schema({
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  incidentId: {
    type: String,
    unique: true,
    sparse: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true
  },
  category: {
    type: String,
    enum: ['equipment', 'environmental', 'behavioral', 'procedural', 'other'],
    required: true
  },
  location: {
    area: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    floor: String,
    building: String
  },
  photos: [{
    filename: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  audioNote: {
    filename: String,
    url: String,
    duration: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  status: {
    type: String,
    enum: ['reported', 'investigating', 'resolved', 'escalated'],
    default: 'reported'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  aiAnalysis: {
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    suggestedActions: [String],
    keywords: [String],
    confidenceScore: {
      type: Number,
      min: 0,
      max: 1
    }
  },
  resolution: {
    description: String,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: Date,
    preventiveMeasures: [String]
  },
  escalationHistory: [{
    escalatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    escalatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    escalatedAt: {
      type: Date,
      default: Date.now
    },
    reason: String
  }],
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate incident ID
safetyIncidentSchema.pre('validate', function(next) {
  if (this.isNew && !this.incidentId) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    this.incidentId = `SI-${year}${month}${day}-${random}`;
  }
  next();
});

// Get incident age in hours
safetyIncidentSchema.virtual('ageInHours').get(function() {
  const now = new Date();
  const created = new Date(this.createdAt);
  return Math.floor((now - created) / (1000 * 60 * 60));
});

// Check if incident is overdue
safetyIncidentSchema.virtual('isOverdue').get(function() {
  const maxHours = {
    'low': 72,
    'medium': 24,
    'high': 8,
    'critical': 2
  };
  
  return this.ageInHours > maxHours[this.severity];
});

// Ensure virtuals are included in JSON
safetyIncidentSchema.set('toJSON', { virtuals: true });
safetyIncidentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('SafetyIncident', safetyIncidentSchema);

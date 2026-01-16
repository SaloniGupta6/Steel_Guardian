const mongoose = require('mongoose');

const environmentMetricSchema = new mongoose.Schema({
  metricId: {
    type: String,
    required: true,
    unique: true
  },
  metricName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  unit: {
    type: String,
    required: true,
    enum: ['ton', 'megawatt_hour', 'cubic_meter']
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  target: {
    type: Number,
    required: true,
    min: 0
  },
  deviation: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    min: 0,
    max: 100
  },
  category: {
    type: String,
    enum: ['co2_emission', 'energy_usage', 'water_usage'],
    required: true
  },
  subCategory: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    enum: ['production', 'maintenance', 'safety', 'quality', 'logistics', 'admin']
  },
  plant: {
    type: String,
    required: true
  },
  collectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  collectionDate: {
    type: Date,
    default: Date.now
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verificationDate: Date,
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  dataHistory: [{
    updatedValue: Number,
    updatedAt: {
      type: Date,
      default: Date.now
    },
    remarks: String
  }],
  alerts: [{
    message: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: Date
  }],
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comment: String,
    commentedAt: {
      type: Date,
      default: Date.now
    },
    likes: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      likedAt: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  trends: [{
    date: Date,
    value: Number
  }],
  analysis: {
    performance: {
      type: String,
      enum: ['excellent', 'good', 'average', 'below_average']
    },
    insights: String,
    recommendations: String
  },
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

// Generate metric ID
environmentMetricSchema.pre('save', function(next) {
  if (this.isNew) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    this.metricId = `ENV-${year}${month}${day}-${random}`;
  }
  next();
});

// Calculate deviation percentage
environmentMetricSchema.virtual('deviationPercentage').get(function() {
  if (this.target === 0) return 0; // Avoid division by zero
  return ((this.value - this.target) / this.target) * 100;
});

// Ensure virtuals are included in JSON
environmentMetricSchema.set('toJSON', { virtuals: true });
environmentMetricSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('EnvironmentMetric', environmentMetricSchema);

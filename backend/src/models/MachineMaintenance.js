const mongoose = require('mongoose');

const machineMaintenanceSchema = new mongoose.Schema({
  machineId: {
    type: String,
    required: true,
    unique: true
  },
  machineName: {
    type: String,
    required: true,
    trim: true
  },
  machineType: {
    type: String,
    required: true,
    enum: ['furnace', 'conveyor', 'crane', 'press', 'cutter', 'compressor', 'pump', 'generator', 'other']
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
    building: String,
    exactPosition: String
  },
  currentStatus: {
    type: String,
    enum: ['operational', 'maintenance', 'breakdown', 'scheduled_maintenance', 'decommissioned'],
    default: 'operational'
  },
  healthScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  sensors: [{
    sensorType: {
      type: String,
      enum: ['temperature', 'vibration', 'pressure', 'humidity', 'sound', 'current', 'voltage']
    },
    currentValue: Number,
    unit: String,
    normalRange: {
      min: Number,
      max: Number
    },
    alertThreshold: {
      min: Number,
      max: Number
    },
    lastReadingAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['normal', 'warning', 'alert', 'critical'],
      default: 'normal'
    }
  }],
  maintenanceHistory: [{
    maintenanceId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['preventive', 'corrective', 'emergency', 'inspection'],
      required: true
    },
    description: String,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    scheduledDate: Date,
    actualDate: Date,
    duration: Number, // in minutes
    cost: Number,
    partsReplaced: [{
      partName: String,
      partNumber: String,
      quantity: Number,
      cost: Number
    }],
    notes: String,
    photos: [String],
    status: {
      type: String,
      enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  predictiveAlerts: [{
    alertType: {
      type: String,
      enum: ['vibration_anomaly', 'temperature_spike', 'pressure_drop', 'current_fluctuation', 'general_degradation']
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    message: String,
    recommendedAction: String,
    predictedFailureDate: Date,
    confidence: {
      type: Number,
      min: 0,
      max: 1
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    acknowledgedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    acknowledgedAt: Date,
    resolvedAt: Date,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  maintenanceCalendar: [{
    taskName: String,
    taskType: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'custom']
    },
    nextDueDate: Date,
    lastCompletedDate: Date,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    estimatedDuration: Number, // in minutes
    instructions: String,
    isActive: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      enum: ['pending', 'overdue', 'completed', 'cancelled'],
      default: 'pending'
    }
  }],
  specifications: {
    manufacturer: String,
    model: String,
    serialNumber: String,
    yearOfInstallation: Number,
    capacity: String,
    powerRating: String,
    operatingTemperature: {
      min: Number,
      max: Number
    },
    operatingPressure: {
      min: Number,
      max: Number
    },
    warrantyExpiry: Date,
    manualUrl: String
  },
  performanceMetrics: {
    availability: {
      type: Number,
      min: 0,
      max: 100,
      default: 100
    },
    efficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 100
    },
    meanTimeBetweenFailures: Number, // in hours
    meanTimeToRepair: Number, // in hours
    totalOperatingHours: {
      type: Number,
      default: 0
    },
    lastMaintenanceDate: Date,
    nextMaintenanceDate: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

// Generate machine ID
machineMaintenanceSchema.pre('save', function(next) {
  if (this.isNew) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    this.machineId = `MCH-${year}${month}${day}-${random}`;
  }
  next();
});

// Calculate overall health status
machineMaintenanceSchema.virtual('healthStatus').get(function() {
  if (this.healthScore >= 80) return 'excellent';
  if (this.healthScore >= 60) return 'good';
  if (this.healthScore >= 40) return 'fair';
  if (this.healthScore >= 20) return 'poor';
  return 'critical';
});

// Get overdue maintenance tasks
machineMaintenanceSchema.virtual('overdueTasks').get(function() {
  const now = new Date();
  return this.maintenanceCalendar.filter(task => 
    task.isActive && 
    task.nextDueDate < now && 
    task.status === 'pending'
  );
});

// Get active critical alerts
machineMaintenanceSchema.virtual('criticalAlerts').get(function() {
  return this.predictiveAlerts.filter(alert => 
    alert.isActive && 
    alert.severity === 'critical' && 
    !alert.resolvedAt
  );
});

// Ensure virtuals are included in JSON
machineMaintenanceSchema.set('toJSON', { virtuals: true });
machineMaintenanceSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('MachineMaintenance', machineMaintenanceSchema);

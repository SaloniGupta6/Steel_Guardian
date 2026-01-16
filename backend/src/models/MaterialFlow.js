const mongoose = require('mongoose');

const materialFlowSchema = new mongoose.Schema({
  materialId: {
    type: String,
    required: true,
    unique: true
  },
  materialType: {
    type: String,
    required: true,
    enum: ['raw_material', 'finished_product', 'intermediate_product', 'waste_material']
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    value: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      required: true,
      enum: ['kg', 'ton', 'piece', 'meter', 'liter', 'cubic_meter']
    }
  },
  currentLocation: {
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
  previousLocation: {
    area: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    floor: String,
    building: String,
    exactPosition: String
  },
  destination: {
    area: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    floor: String,
    building: String,
    exactPosition: String
  },
  status: {
    type: String,
    enum: ['in_storage', 'in_transit', 'in_processing', 'quality_check', 'ready_for_dispatch', 'dispatched'],
    default: 'in_storage'
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
  movementHistory: [{
    fromLocation: {
      area: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      },
      floor: String,
      building: String
    },
    toLocation: {
      area: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      },
      floor: String,
      building: String
    },
    movedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    movedAt: {
      type: Date,
      default: Date.now
    },
    reason: String,
    notes: String
  }],
  qualityStatus: {
    status: {
      type: String,
      enum: ['pending', 'passed', 'failed', 'needs_recheck'],
      default: 'pending'
    },
    checkedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    checkedAt: Date,
    notes: String
  },
  specifications: {
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ['mm', 'cm', 'm'],
        default: 'mm'
      }
    },
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ['g', 'kg', 'ton'],
        default: 'kg'
      }
    },
    grade: String,
    composition: String,
    temperature: Number,
    batchNumber: String
  },
  alerts: [{
    type: {
      type: String,
      enum: ['delay', 'quality_issue', 'location_mismatch', 'damage', 'other']
    },
    message: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    resolvedAt: Date,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  expectedDelivery: Date,
  actualDelivery: Date,
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

// Generate material ID
materialFlowSchema.pre('save', function(next) {
  if (this.isNew) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    this.materialId = `MAT-${year}${month}${day}-${random}`;
  }
  next();
});

// Calculate delivery status
materialFlowSchema.virtual('deliveryStatus').get(function() {
  if (!this.expectedDelivery) return 'no_deadline';
  
  const now = new Date();
  const expected = new Date(this.expectedDelivery);
  
  if (this.actualDelivery) {
    const actual = new Date(this.actualDelivery);
    return actual <= expected ? 'on_time' : 'delayed';
  }
  
  return now > expected ? 'overdue' : 'on_schedule';
});

// Get time remaining until expected delivery
materialFlowSchema.virtual('timeRemaining').get(function() {
  if (!this.expectedDelivery || this.actualDelivery) return null;
  
  const now = new Date();
  const expected = new Date(this.expectedDelivery);
  const diff = expected - now;
  
  if (diff <= 0) return 'overdue';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
});

// Ensure virtuals are included in JSON
materialFlowSchema.set('toJSON', { virtuals: true });
materialFlowSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('MaterialFlow', materialFlowSchema);

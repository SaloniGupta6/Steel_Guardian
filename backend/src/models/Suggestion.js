const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  suggestionId: {
    type: String,
    unique: true,
    required: true
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
  category: {
    type: String,
    enum: ['safety', 'productivity', 'environment', 'quality', 'cost_reduction', 'innovation', 'other'],
    required: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: String,
    enum: ['production', 'maintenance', 'safety', 'quality', 'logistics', 'admin', 'all'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'approved', 'rejected', 'implemented', 'partially_implemented'],
    default: 'submitted'
  },
  aiAnalysis: {
    category: {
      type: String,
      enum: ['safety', 'productivity', 'environment', 'quality', 'cost_reduction', 'innovation', 'other']
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1
    },
    keywords: [String],
    sentiment: {
      type: String,
      enum: ['positive', 'neutral', 'negative']
    },
    impactEstimation: {
      type: String,
      enum: ['low', 'medium', 'high']
    },
    similarSuggestions: [{
      suggestionId: String,
      similarity: Number
    }],
    analyzedAt: {
      type: Date,
      default: Date.now
    }
  },
  implementation: {
    estimatedCost: Number,
    estimatedTimeframe: String,
    requiredResources: [String],
    assignedTeam: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: String
    }],
    startDate: Date,
    targetCompletionDate: Date,
    actualCompletionDate: Date,
    progressPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    milestones: [{
      title: String,
      description: String,
      targetDate: Date,
      actualDate: Date,
      status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'delayed'],
        default: 'pending'
      }
    }],
    notes: String
  },
  evaluation: {
    reviewedBy: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      reviewDate: {
        type: Date,
        default: Date.now
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      feedback: String,
      recommendation: {
        type: String,
        enum: ['approve', 'reject', 'needs_modification', 'needs_more_info']
      }
    }],
    overallRating: {
      type: Number,
      min: 1,
      max: 5
    },
    finalDecision: {
      type: String,
      enum: ['approved', 'rejected', 'deferred']
    },
    decisionReason: String,
    decisionDate: Date,
    decisionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  voting: {
    upvotes: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      votedAt: {
        type: Date,
        default: Date.now
      }
    }],
    downvotes: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      votedAt: {
        type: Date,
        default: Date.now
      }
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
    }]
  },
  impact: {
    actualBenefits: String,
    costSavings: Number,
    timeReduction: Number,
    safetyImprovement: String,
    environmentalBenefit: String,
    measurementDate: Date,
    measuredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  attachments: [{
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  isArchived: {
    type: Boolean,
    default: false
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

// Generate suggestion ID
suggestionSchema.pre('save', function(next) {
  if (this.isNew) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    
    this.suggestionId = `SUG-${year}${month}${day}-${random}`;
  }
  next();
});

// Calculate voting score
suggestionSchema.virtual('votingScore').get(function() {
  const upvotes = this.voting.upvotes.length;
  const downvotes = this.voting.downvotes.length;
  return upvotes - downvotes;
});

// Calculate total votes
suggestionSchema.virtual('totalVotes').get(function() {
  return this.voting.upvotes.length + this.voting.downvotes.length;
});

// Calculate average rating
suggestionSchema.virtual('averageRating').get(function() {
  if (!this.evaluation.reviewedBy || this.evaluation.reviewedBy.length === 0) {
    return 0;
  }
  
  const ratings = this.evaluation.reviewedBy.filter(review => review.rating);
  if (ratings.length === 0) return 0;
  
  const sum = ratings.reduce((acc, review) => acc + review.rating, 0);
  return sum / ratings.length;
});

// Get days since submission
suggestionSchema.virtual('daysOld').get(function() {
  const now = new Date();
  const created = new Date(this.createdAt);
  const diffTime = Math.abs(now - created);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Check if suggestion is trending
suggestionSchema.virtual('isTrending').get(function() {
  const recentVotes = this.voting.upvotes.filter(vote => {
    const voteDate = new Date(vote.votedAt);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return voteDate > threeDaysAgo;
  });
  
  return recentVotes.length >= 5;
});

// Ensure virtuals are included in JSON
suggestionSchema.set('toJSON', { virtuals: true });
suggestionSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Suggestion', suggestionSchema);

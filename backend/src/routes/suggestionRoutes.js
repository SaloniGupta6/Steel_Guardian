const express = require('express');
const Suggestion = require('../models/Suggestion');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const router = express.Router();

// @desc    Submit a new suggestion
// @route   POST /api/suggestions
// @access  Private (All users can submit suggestions)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, category, subcategory, department, priority, attachments, tags } = req.body;

    const suggestion = new Suggestion({
      title,
      description,
      category,
      subcategory,
      department,
      priority,
      attachments,
      tags,
      submittedBy: req.user.userId
    });

    await suggestion.save();

    res.status(201).json({
      success: true,
      message: 'Suggestion submitted successfully',
      suggestion
    });
  } catch (error) {
    console.error('Submit suggestion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting suggestion',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get all suggestions
// @route   GET /api/suggestions
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { category, status, department, sort } = req.query;
    
    // Build filter object
    let filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (department) filter.department = department;
    if (!req.query.includeArchived) filter.isArchived = false;

    // Build sort object
    let sortObj = {};
    if (sort === 'popular') {
      sortObj = { 'voting.upvotes': -1 };
    } else if (sort === 'recent') {
      sortObj = { createdAt: -1 };
    } else if (sort === 'priority') {
      sortObj = { priority: -1 };
    } else {
      sortObj = { createdAt: -1 };
    }

    const suggestions = await Suggestion.find(filter)
      .populate('submittedBy', 'firstName lastName role department')
      .populate('evaluation.reviewedBy.userId', 'firstName lastName role')
      .sort(sortObj);

    res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching suggestions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get a specific suggestion
// @route   GET /api/suggestions/:suggestionId
// @access  Private
router.get('/:suggestionId', authMiddleware, async (req, res) => {
  try {
    const { suggestionId } = req.params;

    const suggestion = await Suggestion.findById(suggestionId)
      .populate('submittedBy', 'firstName lastName role department')
      .populate('evaluation.reviewedBy.userId', 'firstName lastName role')
      .populate('voting.upvotes.userId', 'firstName lastName')
      .populate('voting.downvotes.userId', 'firstName lastName')
      .populate('voting.comments.userId', 'firstName lastName role');

    if (!suggestion) {
      return res.status(404).json({
        success: false,
        message: 'Suggestion not found'
      });
    }

    res.json({
      success: true,
      suggestion
    });
  } catch (error) {
    console.error('Get suggestion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching suggestion',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Update suggestion status
// @route   PUT /api/suggestions/:suggestionId/status
// @access  Private (Supervisor/Admin)
router.put('/:suggestionId/status', authMiddleware, roleMiddleware(['supervisor', 'engineer', 'admin']), async (req, res) => {
  try {
    const { suggestionId } = req.params;
    const { status, priority, implementation, evaluation } = req.body;

    const suggestion = await Suggestion.findById(suggestionId);

    if (!suggestion) {
      return res.status(404).json({
        success: false,
        message: 'Suggestion not found'
      });
    }

    // Update fields
    if (status) suggestion.status = status;
    if (priority) suggestion.priority = priority;
    if (implementation) suggestion.implementation = { ...suggestion.implementation, ...implementation };
    if (evaluation) suggestion.evaluation = { ...suggestion.evaluation, ...evaluation };

    await suggestion.save();

    res.json({
      success: true,
      message: 'Suggestion status updated successfully',
      suggestion
    });
  } catch (error) {
    console.error('Update suggestion status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating suggestion status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Vote on a suggestion
// @route   POST /api/suggestions/:suggestionId/vote
// @access  Private
router.post('/:suggestionId/vote', authMiddleware, async (req, res) => {
  try {
    const { suggestionId } = req.params;
    const { voteType } = req.body; // 'upvote' or 'downvote'

    const suggestion = await Suggestion.findById(suggestionId);

    if (!suggestion) {
      return res.status(404).json({
        success: false,
        message: 'Suggestion not found'
      });
    }

    // Remove existing vote if any
    suggestion.voting.upvotes = suggestion.voting.upvotes.filter(
      vote => vote.userId.toString() !== req.user.userId.toString()
    );
    suggestion.voting.downvotes = suggestion.voting.downvotes.filter(
      vote => vote.userId.toString() !== req.user.userId.toString()
    );

    // Add new vote
    if (voteType === 'upvote') {
      suggestion.voting.upvotes.push({ userId: req.user.userId });
    } else if (voteType === 'downvote') {
      suggestion.voting.downvotes.push({ userId: req.user.userId });
    }

    await suggestion.save();

    res.json({
      success: true,
      message: 'Vote recorded successfully',
      votingScore: suggestion.votingScore,
      totalVotes: suggestion.totalVotes
    });
  } catch (error) {
    console.error('Vote on suggestion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error recording vote',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Add comment to a suggestion
// @route   POST /api/suggestions/:suggestionId/comment
// @access  Private
router.post('/:suggestionId/comment', authMiddleware, async (req, res) => {
  try {
    const { suggestionId } = req.params;
    const { comment } = req.body;

    const suggestion = await Suggestion.findById(suggestionId);

    if (!suggestion) {
      return res.status(404).json({
        success: false,
        message: 'Suggestion not found'
      });
    }

    const newComment = {
      userId: req.user.userId,
      comment,
      commentedAt: new Date(),
      likes: []
    };

    suggestion.voting.comments.push(newComment);
    await suggestion.save();

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment: newComment
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding comment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get suggestions analytics
// @route   GET /api/suggestions/analytics
// @access  Private (Supervisor/Admin)
router.get('/analytics/dashboard', authMiddleware, roleMiddleware(['supervisor', 'engineer', 'admin']), async (req, res) => {
  try {
    const totalSuggestions = await Suggestion.countDocuments();
    const pendingSuggestions = await Suggestion.countDocuments({ status: 'submitted' });
    const approvedSuggestions = await Suggestion.countDocuments({ status: 'approved' });
    const implementedSuggestions = await Suggestion.countDocuments({ status: 'implemented' });

    // Category distribution
    const categoryStats = await Suggestion.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Department distribution
    const departmentStats = await Suggestion.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Top contributors
    const topContributors = await Suggestion.aggregate([
      { $group: { _id: '$submittedBy', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { name: { $concat: ['$user.firstName', ' ', '$user.lastName'] }, count: 1 } }
    ]);

    res.json({
      success: true,
      analytics: {
        totalSuggestions,
        pendingSuggestions,
        approvedSuggestions,
        implementedSuggestions,
        categoryStats,
        departmentStats,
        topContributors
      }
    });
  } catch (error) {
    console.error('Get suggestions analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching analytics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;

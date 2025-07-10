const express = require('express');
const SafetyIncident = require('../models/SafetyIncident');
const { authMiddleware, safetyMiddleware } = require('../middleware/auth');
const router = express.Router();

// @desc    Report a new safety incident
// @route   POST /api/safety/report
// @access  Private (Workers can report incidents)
router.post('/report', authMiddleware, async (req, res) => {
  try {
    const { title, description, severity, category, location, photos, audioNote } = req.body;

    const incident = new SafetyIncident({
      reportedBy: req.user.userId,
      title,
      description,
      severity,
      category,
      location,
      photos,
      audioNote
    });

    await incident.save();

    res.status(201).json({
      success: true,
      message: 'Safety incident reported successfully',
      incident
    });
  } catch (error) {
    console.error('Report incident error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error reporting incident',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get all safety incidents (for administrators and safety officers)
// @route   GET /api/safety
// @access  Private (Safety officers and admins)
router.get('/', authMiddleware, safetyMiddleware, async (req, res) => {
  try {
    const incidents = await SafetyIncident.find().populate('reportedBy', 'firstName lastName role');

    res.json({
      success: true,
      incidents
    });
  } catch (error) {
    console.error('Get incidents error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching incidents',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Update a safety incident
// @route   PUT /api/safety/:incidentId
// @access  Private (Safety officers can update)
router.put('/:incidentId', authMiddleware, safetyMiddleware, async (req, res) => {
  try {
    const { incidentId } = req.params;
    const { status, priority, assignedTo, aiAnalysis, resolution, followUpRequired, followUpDate } = req.body;

    const incident = await SafetyIncident.findById(incidentId);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Safety incident not found'
      });
    }

    // Update fields
    if (status) incident.status = status;
    if (priority) incident.priority = priority;
    if (assignedTo) incident.assignedTo = assignedTo;
    if (aiAnalysis) incident.aiAnalysis = aiAnalysis;
    if (resolution) incident.resolution = resolution;
    if (followUpRequired) incident.followUpRequired = followUpRequired;
    if (followUpDate) incident.followUpDate = followUpDate;

    await incident.save();

    res.json({
      success: true,
      message: 'Safety incident updated successfully',
      incident
    });
  } catch (error) {
    console.error('Update incident error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating incident',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Delete a safety incident
// @route   DELETE /api/safety/:incidentId
// @access  Private (Admins can delete)
router.delete('/:incidentId', authMiddleware, safetyMiddleware, async (req, res) => {
  try {
    const { incidentId } = req.params;

    const incident = await SafetyIncident.findByIdAndDelete(incidentId);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Safety incident not found'
      });
    }

    res.json({
      success: true,
      message: 'Safety incident deleted successfully'
    });
  } catch (error) {
    console.error('Delete incident error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting incident',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;


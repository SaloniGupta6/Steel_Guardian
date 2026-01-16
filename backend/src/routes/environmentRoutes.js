const express = require('express');
const EnvironmentMetric = require('../models/EnvironmentMetric');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const router = express.Router();

// @desc    Add new environment metric
// @route   POST /api/environment
// @access  Private
router.post('/', authMiddleware, roleMiddleware(['admin', 'environment']), async (req, res) => {
  try {
    const newMetric = new EnvironmentMetric(req.body);
    await newMetric.save();
    res.status(201).json({
      success: true,
      message: 'Environment metric added successfully',
      metric: newMetric,
    });
  } catch (error) {
    console.error('Add environment metric error:', error);
    res.status(500).json({ success: false, message: 'Server error adding metric', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

// @desc    List all environment metrics
// @route   GET /api/environment
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const metrics = await EnvironmentMetric.find();
    res.json({ success: true, metrics });
  } catch (error) {
    console.error('Get environment metrics error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching metrics', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

// @desc    Update environment metric
// @route   PUT /api/environment/:metricId
// @access  Private
router.put('/:metricId', authMiddleware, roleMiddleware(['admin', 'environment']), async (req, res) => {
  try {
    const { metricId } = req.params;
    const updatedMetric = await EnvironmentMetric.findByIdAndUpdate(metricId, req.body, { new: true });

    if (!updatedMetric) {
      return res.status(404).json({ success: false, message: 'Metric not found' });
    }

    res.json({ success: true, message: 'Metric updated successfully', metric: updatedMetric });
  } catch (error) {
    console.error('Update environment metric error:', error);
    res.status(500).json({ success: false, message: 'Server error updating metric', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

// @desc    Remove environment metric
// @route   DELETE /api/environment/:metricId
// @access  Private
router.delete('/:metricId', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const { metricId } = req.params;
    const deletedMetric = await EnvironmentMetric.findByIdAndDelete(metricId);

    if (!deletedMetric) {
      return res.status(404).json({ success: false, message: 'Metric not found' });
    }

    res.json({ success: true, message: 'Metric removed successfully' });
  } catch (error) {
    console.error('Delete environment metric error:', error);
    res.status(500).json({ success: false, message: 'Server error removing metric', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

module.exports = router;


const express = require('express');
const MaterialFlow = require('../models/MaterialFlow');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const router = express.Router();

// @desc    Add new material
// @route   POST /api/material/add
// @access  Private
router.post('/add', authMiddleware, roleMiddleware(['admin', 'logistics']), async (req, res) => {
  try {
    const newMaterial = new MaterialFlow(req.body);
    await newMaterial.save();
    res.status(201).json({
      success: true,
      message: 'Material added successfully',
      material: newMaterial
    });
  } catch (error) {
    console.error('Add material error:', error);
    res.status(500).json({ success: false, message: 'Server error adding material', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

// @desc    List all materials
// @route   GET /api/material
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const materials = await MaterialFlow.find();
    res.json({ success: true, materials });
  } catch (error) {
    console.error('Get materials error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching materials', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

// @desc    Update material information
// @route   PUT /api/material/:materialId
// @access  Private
router.put('/:materialId', authMiddleware, roleMiddleware(['admin', 'logistics', 'production']), async (req, res) => {
  try {
    const { materialId } = req.params;
    const updatedMaterial = await MaterialFlow.findByIdAndUpdate(materialId, req.body, { new: true });

    if (!updatedMaterial) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    res.json({ success: true, message: 'Material updated successfully', material: updatedMaterial });
  } catch (error) {
    console.error('Update material error:', error);
    res.status(500).json({ success: false, message: 'Server error updating material', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

// @desc    Remove material
// @route   DELETE /api/material/:materialId
// @access  Private
router.delete('/:materialId', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const { materialId } = req.params;
    const deletedMaterial = await MaterialFlow.findByIdAndDelete(materialId);

    if (!deletedMaterial) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    res.json({ success: true, message: 'Material removed successfully' });
  } catch (error) {
    console.error('Delete material error:', error);
    res.status(500).json({ success: false, message: 'Server error removing material', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

module.exports = router;


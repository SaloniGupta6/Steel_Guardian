const express = require('express');
const MachineMaintenance = require('../models/MachineMaintenance');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const router = express.Router();

// @desc    Add new machine
// @route   POST /api/maintenance/machine
// @access  Private (Engineer/Admin)
router.post('/machine', authMiddleware, roleMiddleware(['engineer', 'admin']), async (req, res) => {
  try {
    const {
      machineName,
      machineType,
      location,
      specifications,
      sensors,
      createdBy = req.user.userId
    } = req.body;

    const machine = new MachineMaintenance({
      machineName,
      machineType,
      location,
      specifications,
      sensors,
      createdBy
    });

    await machine.save();

    res.status(201).json({
      success: true,
      message: 'Machine added successfully',
      machine
    });
  } catch (error) {
    console.error('Add machine error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding machine',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get all machines
// @route   GET /api/maintenance/machines
// @access  Private
router.get('/machines', authMiddleware, async (req, res) => {
  try {
    const machines = await MachineMaintenance.find()
      .populate('createdBy', 'firstName lastName role')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      machines
    });
  } catch (error) {
    console.error('Get machines error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching machines',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Update machine information
// @route   PUT /api/maintenance/machine/:machineId
// @access  Private (Engineer/Admin)
router.put('/machine/:machineId', authMiddleware, roleMiddleware(['engineer', 'admin', 'maintenance']), async (req, res) => {
  try {
    const { machineId } = req.params;
    const machine = await MachineMaintenance.findById(machineId);

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: 'Machine not found'
      });
    }

    // Update machine fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        machine[key] = req.body[key];
      }
    });

    await machine.save();

    res.json({
      success: true,
      message: 'Machine updated successfully',
      machine
    });
  } catch (error) {
    console.error('Update machine error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating machine',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Add maintenance record
// @route   POST /api/maintenance/record/:machineId
// @access  Private (Maintenance/Engineer)
router.post('/record/:machineId', authMiddleware, roleMiddleware(['maintenance', 'engineer', 'admin']), async (req, res) => {
  try {
    const { machineId } = req.params;
    const machine = await MachineMaintenance.findById(machineId);

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: 'Machine not found'
      });
    }

    const maintenanceRecord = {
      ...req.body,
      performedBy: req.user.userId,
      maintenanceId: `MAINT-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    };

    machine.maintenanceHistory.push(maintenanceRecord);
    await machine.save();

    res.status(201).json({
      success: true,
      message: 'Maintenance record added successfully',
      record: maintenanceRecord
    });
  } catch (error) {
    console.error('Add maintenance record error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding maintenance record',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Update sensor data
// @route   PUT /api/maintenance/sensor/:machineId
// @access  Private (System/Engineer)
router.put('/sensor/:machineId', authMiddleware, roleMiddleware(['engineer', 'admin', 'maintenance']), async (req, res) => {
  try {
    const { machineId } = req.params;
    const { sensorData } = req.body;

    const machine = await MachineMaintenance.findById(machineId);

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: 'Machine not found'
      });
    }

    // Update sensor data
    sensorData.forEach(sensor => {
      const existingSensor = machine.sensors.find(s => s.sensorType === sensor.sensorType);
      if (existingSensor) {
        existingSensor.currentValue = sensor.currentValue;
        existingSensor.lastReadingAt = new Date();
        
        // Determine status based on thresholds
        if (sensor.currentValue < sensor.alertThreshold.min || sensor.currentValue > sensor.alertThreshold.max) {
          existingSensor.status = 'critical';
        } else if (sensor.currentValue < sensor.normalRange.min || sensor.currentValue > sensor.normalRange.max) {
          existingSensor.status = 'warning';
        } else {
          existingSensor.status = 'normal';
        }
      }
    });

    await machine.save();

    res.json({
      success: true,
      message: 'Sensor data updated successfully',
      sensors: machine.sensors
    });
  } catch (error) {
    console.error('Update sensor data error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating sensor data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Add predictive alert
// @route   POST /api/maintenance/alert/:machineId
// @access  Private (System/Engineer)
router.post('/alert/:machineId', authMiddleware, roleMiddleware(['engineer', 'admin', 'maintenance']), async (req, res) => {
  try {
    const { machineId } = req.params;
    const machine = await MachineMaintenance.findById(machineId);

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: 'Machine not found'
      });
    }

    const alert = {
      ...req.body,
      createdAt: new Date(),
      isActive: true
    };

    machine.predictiveAlerts.push(alert);
    await machine.save();

    res.status(201).json({
      success: true,
      message: 'Predictive alert added successfully',
      alert
    });
  } catch (error) {
    console.error('Add predictive alert error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding predictive alert',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get maintenance calendar
// @route   GET /api/maintenance/calendar
// @access  Private
router.get('/calendar', authMiddleware, async (req, res) => {
  try {
    const machines = await MachineMaintenance.find()
      .select('machineName maintenanceCalendar')
      .populate('maintenanceCalendar.assignedTo', 'firstName lastName');

    const calendar = [];
    machines.forEach(machine => {
      machine.maintenanceCalendar.forEach(task => {
        if (task.isActive) {
          calendar.push({
            machineId: machine._id,
            machineName: machine.machineName,
            ...task.toObject()
          });
        }
      });
    });

    res.json({
      success: true,
      calendar
    });
  } catch (error) {
    console.error('Get maintenance calendar error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching maintenance calendar',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, access denied'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token or user inactive'
      });
    }

    req.user = {
      userId: user._id,
      role: user.role,
      department: user.department,
      employeeId: user.employeeId
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Token verification failed'
    });
  }
};

// Role-based authorization middleware
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Department-based authorization middleware
const departmentMiddleware = (departments) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!departments.includes(req.user.department)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied for this department'
      });
    }

    next();
  };
};

// Admin only middleware
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
};

// Safety officer or higher middleware
const safetyMiddleware = (req, res, next) => {
  const allowedRoles = ['safety_officer', 'supervisor', 'engineer', 'admin'];
  
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Safety officer or higher role required'
    });
  }
  next();
};

// Supervisor or higher middleware
const supervisorMiddleware = (req, res, next) => {
  const allowedRoles = ['supervisor', 'engineer', 'admin'];
  
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Supervisor or higher role required'
    });
  }
  next();
};

module.exports = {
  authMiddleware,
  roleMiddleware,
  departmentMiddleware,
  adminMiddleware,
  safetyMiddleware,
  supervisorMiddleware
};

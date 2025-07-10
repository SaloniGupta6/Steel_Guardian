const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const socketIo = require('socket.io');
const http = require('http');
require('dotenv').config();

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const safetyRoutes = require('./src/routes/safetyRoutes');
const materialRoutes = require('./src/routes/materialRoutes');
const maintenanceRoutes = require('./src/routes/maintenanceRoutes');
const suggestionRoutes = require('./src/routes/suggestionRoutes');
const environmentRoutes = require('./src/routes/environmentRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/steelguardian', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/safety', safetyRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/environment', environmentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Socket.io for real-time features
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
  
  // Join room based on user role
  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`👤 User joined room: ${room}`);
  });

  // Handle safety alerts
  socket.on('safety-alert', (data) => {
    io.to('safety-officers').emit('new-safety-alert', data);
    io.to('supervisors').emit('new-safety-alert', data);
  });

  // Handle material tracking updates
  socket.on('material-update', (data) => {
    io.to('material-flow').emit('material-flow-update', data);
  });

  // Handle maintenance alerts
  socket.on('maintenance-alert', (data) => {
    io.to('maintenance-team').emit('maintenance-alert', data);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 SteelGuardian server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = { app, io };

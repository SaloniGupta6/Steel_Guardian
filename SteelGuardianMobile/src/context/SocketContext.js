import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socketIOClient from 'socket.io-client';
import {
  addNotification,
} from '../store/slices/notificationSlice';
import { reportIncident } from '../store/slices/safetySlice';

const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
const socket = socketIOClient('http://10.97.78.250:5001', {
    transports: ['websocket'],
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    // Listen for incidents
    socket.on('new-safety-alert', (incident) => {
      dispatch(reportIncident(incident));
      dispatch(addNotification({
        id: Date.now(),
        title: 'New Safety Alert',
        message: incident.description,
        read: false,
      }));
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};


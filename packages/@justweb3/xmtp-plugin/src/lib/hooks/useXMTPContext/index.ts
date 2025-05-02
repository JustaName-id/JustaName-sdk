'use client';
import { useContext } from 'react';
import { XMTPContext } from '../../contexts/XMTPContext';

export const useXMTPContext = () => {
  const context = useContext(XMTPContext);
  if (!context) {
    throw new Error('useXMTPContext must be used within XMTPProvider');
  }
  return context;
};

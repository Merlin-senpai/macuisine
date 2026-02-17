"use client";
import { useCart } from '../contexts/CartContext';
import Toast from './Toast';

export default function ToastProvider() {
  const { toast, hideToast } = useCart();
  
  return (
    <Toast 
      message={toast.message} 
      isVisible={toast.isVisible} 
      onClose={hideToast} 
    />
  );
}

import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import from AuthProvider

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context; // No need to specify return type explicitly
};

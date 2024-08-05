import { createContext, useState, ReactNode, useEffect } from 'react';
import { register, login } from '../service/apiService';
import { AxiosResponse } from 'axios';
import { User, RegisterData, LoginData } from '../types';

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  register: (data: RegisterData) => Promise<AxiosResponse<User>>;
  login: (data: LoginData) => Promise<AxiosResponse<User>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleRegister = async (data: RegisterData) => {
    const response = await register(data);
    if (response.status === 201) {
      setUser(response.data);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  };

  const handleLogin = async (data: LoginData) => {
    const response = await login(data);
    if (response.status === 200) {
      setUser(response.data); // Ensure this response contains the user data
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('User logged in and stored:', response.data);
    }
    return response;
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

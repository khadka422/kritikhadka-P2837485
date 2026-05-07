// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      console.log('AuthContext - Starting auth load');
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      console.log('AuthContext - Found in localStorage:', {
        hasUser: !!storedUser,
        hasToken: !!token
      });
      
      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log('AuthContext - Parsed user:', parsedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('AuthContext - Error parsing user:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      } else {
        console.log('AuthContext - No auth data found in localStorage');
      }
      
      setLoading(false);
      console.log('AuthContext - Auth loading complete');
    };
    
    loadAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
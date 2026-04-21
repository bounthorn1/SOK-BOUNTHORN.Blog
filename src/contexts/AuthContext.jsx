import { useState, createContext, useContext, useCallback } from 'react';
import { getUsers, createUser } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('inkwell_auth'));
    } catch {
      return null;
    }
  });

  const [authError, setAuthError] = useState('');

  const login = useCallback(async (username, password) => {
    setAuthError('');
    const users = await getUsers();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) {
      setAuthError('Invalid username or password');
      return false;
    }
    const safeUser = {
      id: found.id,
      username: found.username,
      name: found.name,
      avatar: found.avatar,
    };
    setUser(safeUser);
    localStorage.setItem('inkwell_auth', JSON.stringify(safeUser));
    return true;
  }, []);

  const register = useCallback(async (username, password, name) => {
    setAuthError('');
    const users = await getUsers();
    if (users.find((u) => u.username === username)) {
      setAuthError('Username already taken');
      return false;
    }
    const newUser = await createUser({
      username,
      password,
      name: name || username.charAt(0).toUpperCase() + username.slice(1),
      avatar: `https://picsum.photos/seed/${username}/80/80.jpg`,
    });
    const safeUser = {
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
      avatar: newUser.avatar,
    };
    setUser(safeUser);
    localStorage.setItem('inkwell_auth', JSON.stringify(safeUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAuthError('');
    localStorage.removeItem('inkwell_auth');
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, authError, setAuthError, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
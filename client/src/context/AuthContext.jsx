import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem('ssc_token'));
  useEffect(() => {
    if (!localStorage.getItem('ssc_token')) return;
    api.get('/auth/me').then((r) => setUser(r.data.user))
      .catch(() => localStorage.removeItem('ssc_token')).finally(() => setLoading(false));
  }, []);
  const login = async (endpoint, creds) => {
    const { data } = await api.post(endpoint, creds);
    localStorage.setItem('ssc_token', data.token); setUser(data.user); return data.user;
  };
  const logout = () => { localStorage.removeItem('ssc_token'); setUser(null); };
  return <Ctx.Provider value={{ user, loading, login, logout }}>{children}</Ctx.Provider>;
}

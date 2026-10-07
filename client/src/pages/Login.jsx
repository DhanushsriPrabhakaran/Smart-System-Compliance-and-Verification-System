import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { errMsg } from '../services/api';
export default function Login({ admin }) {
  const { login } = useAuth(); const toast = useToast(); const nav = useNavigate();
  const [f, setF] = useState({ email: '', password: '' }); const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!f.email || !f.password) return toast.error('Enter your email and password');
    setBusy(true);
    try { await login(admin ? '/auth/admin-login' : '/auth/login', f); nav(admin ? '/admin/dashboard' : '/dashboard'); }
    catch (err) { toast.error(errMsg(err)); } finally { setBusy(false); }
  };
  return (
    <AuthShell title={admin ? 'Administrator sign in' : 'Faculty login'} subtitle="Enter your credentials to continue."
      footer={!admin && <>New faculty? <Link to="/register" className="text-indigo-600">Create an account</Link></>}>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" type="email" placeholder="Email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
        <input className="input" type="password" placeholder="Password" autoComplete="current-password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
        <button className="btn w-full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </AuthShell>
  );
}

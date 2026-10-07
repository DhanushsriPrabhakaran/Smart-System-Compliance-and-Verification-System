import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import { useToast } from '../context/ToastContext';
import api, { errMsg } from '../services/api';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validate = (f) => {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Full name is required';
  if (!f.facultyId.trim()) e.facultyId = 'Faculty ID is required';
  if (!EMAIL.test(f.email.trim())) e.email = 'Enter a valid official email';
  if (!f.departmentId) e.departmentId = 'Select a department';
  if (!f.designation.trim()) e.designation = 'Designation is required';
  if (f.password.length < 8 || !/[A-Za-z]/.test(f.password) || !/\d/.test(f.password)) e.password = 'Min 8 characters with letters and numbers';
  if (f.password !== f.confirmPassword) e.confirmPassword = 'Passwords do not match';
  return e;
};
export default function Register() {
  const toast = useToast(); const nav = useNavigate();
  const [depts, setDepts] = useState([]); const [errors, setErrors] = useState({}); const [busy, setBusy] = useState(false);
  const [f, setF] = useState({ name: '', facultyId: '', email: '', departmentId: '', designation: '', password: '', confirmPassword: '' });
  useEffect(() => { api.get('/departments').then((r) => setDepts(r.data.departments)).catch((e) => toast.error(errMsg(e))); }, []);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const field = (k, label, props = {}) => (
    <div><label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>
      <input className={`input ${errors[k] ? 'input-err' : ''}`} value={f[k]} onChange={set(k)} {...props} />
      {errors[k] && <p className="mt-1 text-xs text-red-600">{errors[k]}</p>}</div>);
  const submit = async (e) => {
    e.preventDefault();
    const v = validate(f); setErrors(v);
    if (Object.keys(v).length) return toast.error('Please correct the highlighted fields');
    setBusy(true);
    try { const { data } = await api.post('/auth/register', f); toast.success(data.message); nav('/login'); }
    catch (err) { setErrors(err?.response?.data?.errors || {}); toast.error(errMsg(err)); } finally { setBusy(false); }
  };
  const sel = depts.find((d) => d._id === f.departmentId);
  return (
    <AuthShell title="Faculty registration" subtitle="Your account will be activated after administrator approval."
      footer={<>Already registered? <Link to="/login" className="text-indigo-600">Log in</Link></>}>
      <form onSubmit={submit} className="space-y-3" noValidate>
        {field('name', 'Full name')}{field('facultyId', 'Faculty ID')}{field('email', 'Official email', { type: 'email' })}
        <div><label className="mb-1 block text-xs font-medium text-slate-600">Department</label>
          <select className={`input ${errors.departmentId ? 'input-err' : ''}`} value={f.departmentId} onChange={set('departmentId')}>
            <option value="">Select department…</option>
            {depts.map((d) => <option key={d._id} value={d._id}>{d.name} ({d.programmeCode})</option>)}
          </select>
          {errors.departmentId && <p className="mt-1 text-xs text-red-600">{errors.departmentId}</p>}
          {sel && <p className="mt-1 text-xs text-slate-500">Programme code: <b>{sel.programmeCode}</b></p>}</div>
        {field('designation', 'Designation')}
        {field('password', 'Password', { type: 'password', autoComplete: 'new-password' })}
        {field('confirmPassword', 'Confirm password', { type: 'password', autoComplete: 'new-password' })}
        <button className="btn w-full" disabled={busy}>{busy ? 'Submitting…' : 'Register'}</button>
      </form>
    </AuthShell>
  );
}

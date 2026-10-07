import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { useToast } from '../context/ToastContext';
import api, { errMsg } from '../services/api';
const BADGE = { pending: 'bg-amber-50 text-amber-700', approved: 'bg-green-50 text-green-700', rejected: 'bg-red-50 text-red-700', disabled: 'bg-slate-100 text-slate-600' };
export default function AdminDashboard() {
  const toast = useToast(); const [list, setList] = useState(null);
  const load = () => api.get('/admin/faculty').then((r) => setList(r.data.faculty)).catch((e) => { toast.error(errMsg(e)); setList([]); });
  useEffect(() => { load(); }, []);
  const act = async (id, a) => { try { await api.patch(`/admin/faculty/${id}/${a}`); toast.success(`Faculty ${a}d`); load(); } catch (e) { toast.error(errMsg(e)); } };
  const count = (s) => (list || []).filter((f) => f.status === s).length;
  return (
    <AppLayout admin>
      <h1 className="text-2xl font-semibold">Admin dashboard</h1>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {['pending', 'approved', 'rejected'].map((s) => <div key={s} className="card"><div className="text-xs uppercase text-slate-400">{s} faculty</div><div className="text-3xl font-semibold">{list ? count(s) : '–'}</div></div>)}
      </div>
      <h2 className="mb-2 mt-8 font-semibold">Faculty management</h2>
      <div className="card overflow-x-auto p-0">
        {list === null ? <div className="p-6"><div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" /></div> :
          list.length === 0 ? <div className="p-6 text-center text-sm text-slate-500">No faculty have registered yet.</div> :
          <table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr>{['Name', 'Faculty ID', 'Department', 'Status', ''].map((h) => <th key={h} className="px-4 py-2">{h}</th>)}</tr></thead>
            <tbody>{list.map((f) => (
              <tr key={f.id} className="border-t border-slate-100">
                <td className="px-4 py-2"><div className="font-medium">{f.name}</div><div className="text-xs text-slate-500">{f.email}</div></td>
                <td className="px-4 py-2">{f.facultyId}</td><td className="px-4 py-2">{f.department?.programmeCode} · {f.department?.name}</td>
                <td className="px-4 py-2"><span className={`rounded-full px-2 py-0.5 text-xs ${BADGE[f.status]}`}>{f.status}</span></td>
                <td className="flex gap-2 px-4 py-2">
                  {f.status !== 'approved' && <button className="btn-ghost text-green-700" onClick={() => act(f.id, 'approve')}><Check size={14} /> Approve</button>}
                  {f.status !== 'rejected' && <button className="btn-ghost text-red-700" onClick={() => act(f.id, 'reject')}><X size={14} /> Reject</button>}
                </td></tr>))}</tbody></table>}
      </div>
      <p className="mt-6 text-sm text-slate-400">Departments, courses, syllabus review and guidelines arrive in later phases.</p>
    </AppLayout>
  );
}

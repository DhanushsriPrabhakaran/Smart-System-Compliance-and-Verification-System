import { FilePlus2, Upload, Files, FileEdit, Hourglass, BadgeCheck, FileBarChart } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
const CARDS = [[FilePlus2, 'Create New Syllabus'], [Upload, 'Upload Existing Syllabus'], [Files, 'My Syllabi'], [FileEdit, 'Drafts'], [Hourglass, 'Pending Approval'], [BadgeCheck, 'Approved Syllabi'], [FileBarChart, 'Compliance Reports']];
export default function FacultyDashboard() {
  const { user } = useAuth(); const toast = useToast();
  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
      <div className="mt-2 flex flex-wrap gap-6 text-sm text-slate-600">
        <div><div className="text-xs uppercase text-slate-400">Department</div>{user.department?.name}</div>
        <div><div className="text-xs uppercase text-slate-400">Programme Code</div><span className="rounded bg-indigo-50 px-2 py-0.5 font-semibold text-indigo-700">{user.department?.programmeCode}</span></div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map(([I, t]) => (
          <button key={t} onClick={() => toast.info(`${t} arrives in a later phase`)} className="card flex items-center gap-3 text-left hover:border-indigo-300">
            <span className="rounded-lg bg-indigo-50 p-2 text-indigo-600"><I size={20} /></span><span className="font-medium">{t}</span>
          </button>))}
      </div>
      <h2 className="mb-2 mt-8 font-semibold">Recent syllabi</h2>
      <div className="card text-center text-sm text-slate-500">No syllabi yet. Create or upload one to get started.</div>
    </AppLayout>
  );
}

import { GraduationCap, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function AppLayout({ children, admin }) {
  const { user, logout } = useAuth(); const nav = useNavigate();
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 font-semibold text-indigo-700"><GraduationCap /> Syllabus Compliance{admin && ' · Admin'}</div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-slate-500 sm:inline">{user?.name}</span>
            <button className="btn-ghost" onClick={() => { logout(); nav(admin ? '/admin/login' : '/login'); }}><LogOut size={16} /> Logout</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

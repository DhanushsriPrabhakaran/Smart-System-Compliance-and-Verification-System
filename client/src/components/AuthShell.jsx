import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2 font-semibold text-indigo-700"><GraduationCap /> Syllabus Compliance</Link>
        <div className="card"><h1 className="text-xl font-semibold">{title}</h1><p className="mb-5 text-sm text-slate-500">{subtitle}</p>{children}</div>
        <div className="mt-4 text-center text-sm text-slate-500">{footer}</div>
      </div>
    </div>
  );
}

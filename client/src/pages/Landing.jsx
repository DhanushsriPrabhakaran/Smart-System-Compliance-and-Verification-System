import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, FileSearch, ClipboardCheck } from 'lucide-react';
const F = [[FileSearch, 'Upload or create', 'Build a syllabus online or upload an existing PDF.'], [ShieldCheck, 'Verify automatically', 'Rule-based checks against the official guidelines.'], [ClipboardCheck, 'Submit with confidence', 'Fix issues, revalidate, then submit for approval.']];
export default function Landing() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 text-center">
      <GraduationCap className="mx-auto text-indigo-600" size={44} />
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Smart Syllabus Compliance &amp; Verification System</h1>
      <p className="mx-auto mt-3 max-w-2xl text-slate-600">Check your syllabus against the institution's official guidelines before it goes for approval.</p>
      <div className="mt-6 flex justify-center gap-3"><Link to="/login" className="btn">Faculty login</Link><Link to="/register" className="btn-ghost">Register</Link></div>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">{F.map(([I, t, d]) => (<div key={t} className="card text-left"><I className="text-indigo-600" /><h3 className="mt-2 font-semibold">{t}</h3><p className="text-sm text-slate-500">{d}</p></div>))}</div>
      <Link to="/admin/login" className="mt-10 inline-block text-sm text-slate-400 hover:text-slate-600">Administrator sign in</Link>
    </div>
  );
}

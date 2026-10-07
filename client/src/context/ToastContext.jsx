import { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
const Ctx = createContext(null);
export const useToast = () => useContext(Ctx);
const STYLE = { success: 'border-green-300 bg-green-50 text-green-800', error: 'border-red-300 bg-red-50 text-red-800', info: 'border-blue-300 bg-blue-50 text-blue-800' };
const ICON = { success: CheckCircle2, error: AlertCircle, info: Info };
export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const remove = (id) => setItems((s) => s.filter((t) => t.id !== id));
  const push = useCallback((type, message) => {
    const id = Math.random().toString(36).slice(2);
    setItems((s) => [...s, { id, type, message }]);
    setTimeout(() => remove(id), 5000);
  }, []);
  const api = { success: (m) => push('success', m), error: (m) => push('error', m), info: (m) => push('info', m) };
  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-2">
        {items.map((t) => { const I = ICON[t.type]; return (
          <div key={t.id} className={`flex items-start gap-2 rounded-xl border p-3 text-sm shadow ${STYLE[t.type]}`}>
            <I size={18} className="mt-0.5 shrink-0" /><span className="flex-1">{t.message}</span>
            <button onClick={() => remove(t.id)} aria-label="Dismiss"><X size={16} /></button>
          </div>); })}
      </div>
    </Ctx.Provider>
  );
}

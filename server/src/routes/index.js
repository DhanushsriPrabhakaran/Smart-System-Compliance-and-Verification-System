import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { protect, requireRole } from '../middleware/auth.js';
import { register, login, me } from '../controllers/auth.js';
import { listFaculty, approveFaculty, rejectFaculty } from '../controllers/admin.js';
import Department from '../models/Department.js';

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const authLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 50, standardHeaders: true, legacyHeaders: false });
const admin = [protect, requireRole('admin')];
const r = Router();

r.post('/auth/register', authLimit, wrap(register));
r.post('/auth/login', authLimit, wrap(login('faculty')));
r.post('/auth/admin-login', authLimit, wrap(login('admin')));
r.get('/auth/me', protect, me);
r.get('/departments', wrap(async (_req, res) => {
  res.json({ departments: await Department.find({ active: true }).sort({ name: 1 }) });
}));
r.get('/admin/faculty', ...admin, wrap(listFaculty));
r.patch('/admin/faculty/:id/approve', ...admin, wrap(approveFaculty));
r.patch('/admin/faculty/:id/reject', ...admin, wrap(rejectFaculty));
export default r;

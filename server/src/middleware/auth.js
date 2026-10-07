import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function protect(req, res, next) {
  try {
    const h = req.headers.authorization || '';
    if (!h.startsWith('Bearer ')) return res.status(401).json({ message: 'Authentication required' });
    const { id } = jwt.verify(h.slice(7), process.env.JWT_SECRET);
    const user = await User.findById(id).populate('departmentId');
    if (!user) return res.status(401).json({ message: 'User no longer exists' });
    if (user.role === 'faculty' && user.status !== 'approved')
      return res.status(403).json({ message: `Account is ${user.status}` });
    req.user = user; next();
  } catch { res.status(401).json({ message: 'Invalid or expired token' }); }
}
export const requireRole = (...roles) => (req, res, next) =>
  roles.includes(req.user?.role) ? next() : res.status(403).json({ message: 'Forbidden' });

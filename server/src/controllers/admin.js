import User from '../models/User.js';
import { publicUser } from '../utils/serialize.js';
export async function listFaculty(req, res) {
  const q = { role: 'faculty' }; if (req.query.status) q.status = String(req.query.status);
  const users = await User.find(q).populate('departmentId').sort({ createdAt: -1 });
  res.json({ faculty: users.map(publicUser) });
}
const setStatus = (status) => async (req, res) => {
  const u = await User.findOneAndUpdate({ _id: req.params.id, role: 'faculty' }, { status }, { new: true }).populate('departmentId');
  if (!u) return res.status(404).json({ message: 'Faculty not found' });
  res.json({ faculty: publicUser(u) });
};
export const approveFaculty = setStatus('approved');
export const rejectFaculty = setStatus('rejected');

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Department from '../models/Department.js';
import { publicUser } from '../utils/serialize.js';

const sign = (u) => jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v) => (typeof v === 'string' ? v.trim() : '');

export async function register(req, res) {
  const { name, facultyId, email, departmentId, designation, password, confirmPassword } = req.body;
  const errors = {};
  if (str(name).length < 2) errors.name = 'Full name is required';
  if (!str(facultyId)) errors.facultyId = 'Faculty ID is required';
  if (!EMAIL.test(str(email))) errors.email = 'Enter a valid official email';
  if (!str(departmentId)) errors.departmentId = 'Select a department';
  if (!str(designation)) errors.designation = 'Designation is required';
  if (typeof password !== 'string' || password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password))
    errors.password = 'Min 8 characters with letters and numbers';
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
  if (Object.keys(errors).length) return res.status(400).json({ message: 'Validation failed', errors });

  const dept = await Department.findOne({ _id: str(departmentId), active: true }).catch(() => null);
  if (!dept) return res.status(400).json({ message: 'Validation failed', errors: { departmentId: 'Invalid department' } });
  if (await User.findOne({ $or: [{ email: str(email).toLowerCase() }, { facultyId: str(facultyId) }] }))
    return res.status(409).json({ message: 'Email or Faculty ID already registered' });

  await User.create({
    name: str(name), facultyId: str(facultyId), email: str(email), departmentId: dept._id,
    designation: str(designation), passwordHash: await bcrypt.hash(password, 12), role: 'faculty', status: 'pending',
  });
  res.status(201).json({ message: 'Registration submitted. You can log in once an administrator approves your account.' });
}

export const login = (expectedRole) => async (req, res) => {
  const email = str(req.body.email).toLowerCase(); const { password } = req.body;
  if (!email || typeof password !== 'string') return res.status(400).json({ message: 'Email and password are required' });
  const user = await User.findOne({ email }).select('+passwordHash').populate('departmentId');
  const ok = user && user.role === expectedRole && await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid email or password' });
  if (user.role === 'faculty' && user.status !== 'approved') {
    const msg = { pending: 'Your account is awaiting administrator approval.', rejected: 'Your registration was rejected.', disabled: 'Your account has been disabled.' }[user.status];
    return res.status(403).json({ message: msg, status: user.status });
  }
  res.json({ token: sign(user), user: publicUser(user) });
};

export const me = (req, res) => res.json({ user: publicUser(req.user) });

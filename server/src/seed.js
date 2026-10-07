import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Department from './models/Department.js';
import User from './models/User.js';
import { connectDB } from './config/db.js';

// Source: Theory course guideline, "Programme Code for Each Programme" table.
export const PROGRAMMES = [
  ['CE', 'Civil Engineering'], ['ME', 'Mechanical Engineering'],
  ['EE', 'Electrical and Electronics Engineering'], ['EC', 'Electronics and Communication Engineering'],
  ['CS', 'Computer Science and Engineering'], ['IT', 'Information Technology'],
  ['CB', 'Computer Science and Business Systems'],
  ['AM', 'Computer Science and Engineering (Artificial Intelligence and Machine Learning)'],
  ['MT', 'Mechatronics Engineering'], ['DS', 'Data Science'], ['CA', 'Computer Applications'],
  ['PA', 'Structural Engineering'], ['PB', 'Construction Engineering'],
  ['PC', 'Communications System'], ['PD', 'Computer Science & Engineering'],
];

export async function seedAll() {
  for (const [programmeCode, name] of PROGRAMMES)
    await Department.updateOne({ programmeCode }, { $setOnInsert: { name, active: true } }, { upsert: true });
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  if (email && process.env.ADMIN_PASSWORD && !(await User.findOne({ email }))) {
    await User.create({ name: 'Administrator', email, role: 'admin', status: 'approved',
      passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12) });
    console.log(`Default admin created: ${email}`);
  }
}
if (process.argv[1]?.endsWith('seed.js')) {
  await connectDB(); await seedAll(); console.log('Seed complete'); await mongoose.disconnect();
}

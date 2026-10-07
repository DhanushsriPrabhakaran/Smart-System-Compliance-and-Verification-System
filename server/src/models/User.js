import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  facultyId: { type: String, trim: true, unique: true, sparse: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['faculty', 'admin'], default: 'faculty' },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  designation: { type: String, trim: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'disabled'], default: 'pending' },
}, { timestamps: true });
export default mongoose.model('User', schema);

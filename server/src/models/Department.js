import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  programmeCode: { type: String, required: true, unique: true, uppercase: true, match: /^[A-Z]{2}$/ },
  active: { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.model('Department', schema);

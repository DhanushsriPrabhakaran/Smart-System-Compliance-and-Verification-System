import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import { seedAll } from './seed.js';

if (!process.env.JWT_SECRET) { console.error('JWT_SECRET is required'); process.exit(1); }
const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (_q, r) => r.json({ ok: true }));
app.use('/api', routes);
app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.name === 'ValidationError' ? err.message : 'Internal server error' });
});

await connectDB();
await seedAll();
app.listen(process.env.PORT || 5000, () => console.log(`API on :${process.env.PORT || 5000}`));

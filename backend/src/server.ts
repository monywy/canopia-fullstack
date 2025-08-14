import 'dotenv/config';
import app from './app.js';
import { ensureSeedAdmin } from './utils/seed.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, async () => {
  console.log(`API listening on http://localhost:${PORT}`);
  await ensureSeedAdmin();
});

import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

const tempDir = path.resolve('tmp');

const storage = multer.diskStorage({
  destination: async (_, __, cb) => {
    await fs.mkdir(tempDir, { recursive: true });
    cb(null, tempDir);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

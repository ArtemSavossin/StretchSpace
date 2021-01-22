import express from 'express';
const router = express.Router();
import {
  getSessions,
  getSessionById,
} from '../controllers/sessionController.js';

router.route('/').get(getSessions);

router.route('/:id').get(getSessionById);

export default router;

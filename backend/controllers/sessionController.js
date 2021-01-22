import asyncHandler from 'express-async-handler';
import Session from '../models/sessionModel.js';
import User from '../models/userModel.js';

const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({});
  res.json(sessions);
});

const getSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id)
    .populate({ path: 'coach', select: 'name phone' })
    .populate({ path: 'registeredUsers', select: 'name' });
  if (session) {
    res.json(session);
  } else {
    res.status(404);
    throw new Error('Нет такой сессии');
  }
});

export { getSessionById, getSessions };

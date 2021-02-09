import asyncHandler from 'express-async-handler';
import schedueledSession from '../models/schedueledSessionModel.js';
import Session from '../models/sessionModel.js';
import User from '../models/userModel.js';

const getSessions = asyncHandler(async (req, res) => {
  const sessions = await schedueledSession
    .find({})
    .populate('class')
    .sort({ start: 1 });
  res.json(sessions);
});

const getSessionById = asyncHandler(async (req, res) => {
  const session = await schedueledSession
    .findById(req.params.id)
    .populate('class')
    .populate({ path: 'waitList', select: 'name phone' })
    .populate({ path: 'registeredUsers', select: 'name phone' })
    .sort({ start: 1 });

  if (session) {
    res.json(session);
  } else {
    res.status(404);
    throw new Error('Нет такой сессии');
  }
});

export { getSessionById, getSessions };

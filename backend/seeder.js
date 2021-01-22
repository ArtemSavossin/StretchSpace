import mongoose from 'mongoose';

import dotenv from 'dotenv';

import users from './data/users.js';
import sessions from './data/sessions.js';

import User from './models/userModel.js';
import Session from './models/sessionModel.js';

import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Session.deleteMany();

    const createdUsers = await User.insertMany(users);
    const coach = createdUsers[1]._id;

    const sampleSessions = sessions.map((s) => {
      return { ...s, coach: coach };
    });

    await Session.insertMany(sampleSessions);
    process.exit();
  } catch (e) {
    console.log('woops');
    console.log(e.message);
  }
};

const destroytData = async () => {
  try {
    await User.deleteMany();
    await Session.deleteMany();
    process.exit();
  } catch (e) {
    console.log('woops');
    console.log(e.message);
  }
};

if (process.argv[2] == '-d') {
  destroytData();
} else {
  importData();
}

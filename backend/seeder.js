import mongoose from 'mongoose';

import dotenv from 'dotenv';

import users from './data/users.js';
import sessions from './data/sessions.js';

import User from './models/userModel.js';
import Session from './models/sessionModel.js';
import schedueledSession from './models/schedueledSessionModel.js';

import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    //await User.deleteMany();
    await Session.deleteMany();
    await schedueledSession.deleteMany();
    const createdUsers = await User.find({});
    const coach = createdUsers[0]._id;

    const sampleSessions = sessions.map((s) => {
      return { ...s, coach: coach };
    });

    const csessions = await Session.insertMany(sampleSessions);
    const schedueled = new Array();
    for (let i = 0; i < csessions.length; ++i) {
      let newSch1 = {
        class: csessions[i]._id,
        start: new Date(2021, 1, csessions[i].dayOfWeek, csessions[i].hour, 0),
      };
      let newSch2 = {
        class: csessions[i]._id,
        start: new Date(
          2021,
          1,
          Number(csessions[i].dayOfWeek) + 7,
          csessions[i].hour,
          0
        ),
      };
      let newSch3 = {
        class: csessions[i]._id,
        start: new Date(
          2021,
          1,
          Number(csessions[i].dayOfWeek) + 14,
          csessions[i].hour,
          0
        ),
      };
      schedueled.push(newSch1);
      schedueled.push(newSch2);
      schedueled.push(newSch3);
    }
    await schedueledSession.insertMany(schedueled);
    process.exit();
  } catch (e) {
    console.log('woops');
    console.log(e.message);
  }
};

const destroytData = async () => {
  try {
    //await User.deleteMany();
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

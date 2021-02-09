import { timeStamp } from 'console';
import mongoose from 'mongoose';

const schedueledSessionSchema = mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'session',
    },
    registeredUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    start: {
      type: Date,
      required: true,
      default: new Date(),
    },
    waitList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timeStamps: true }
);

const schedueledSession = mongoose.model(
  'schedueledSession',
  schedueledSessionSchema
);

export default schedueledSession;

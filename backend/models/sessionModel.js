import { timeStamp } from 'console';
import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isRegular: {
      type: Boolean,
      required: true,
      default: true,
    },
    description: {
      type: String,
      required: true,
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    availablePlace: {
      type: Number,
      required: true,
      default: 16,
    },
    date: { type: Date, default: Date.now },
    registeredUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timeStamps: true }
);

const Session = mongoose.model('session', sessionSchema);

export default Session;

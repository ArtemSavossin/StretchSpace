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
    isActual: {
      type: Boolean,
      required: true,
      default: true,
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    availablePlace: {
      type: Number,
      required: true,
      default: 6,
    },
    dayOfWeek: {
      type: Number,
      required: true,
      default: 0,
    },
    hour: {
      type: Number,
      required: true,
      default: 0,
    },
    /*registeredUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],*/
  },
  { timeStamps: true }
);

const Session = mongoose.model('session', sessionSchema);

export default Session;

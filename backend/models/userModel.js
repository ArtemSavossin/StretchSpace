import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      default: '0000',
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    availableSessions: {
      type: Number,
      required: true,
      default: 1,
    },
    hasCertifiacte: {
      type: Boolean,
      required: true,
      default: false,
    },
    sessionsValidUntil: {
      type: Date,
    },
    telegramId: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCoach: {
      type: Boolean,
      required: true,
      default: false,
    },
    attendedSessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schedueledSession',
      },
    ],
  },
  { timeStamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;

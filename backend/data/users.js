import bycript from 'bcryptjs';

const users = [
  {
    name: 'Артем Савосин',
    password: bycript.hashSync('226104'),
    phone: '+77079120824',
    availableSessions: 10,
    hasCertifiacte: false,
    sessionsValidUntil: new Date() + 30 * 24 * 60 * 60 * 1000,
    isAdmin: true,
    isCoach: false,
  },
  {
    name: 'Жасмин Амирбекова',
    password: bycript.hashSync('jasyastar020201'),
    phone: '+77019818336',
    availableSessions: 10,
    hasCertifiacte: false,
    sessionsValidUntil: new Date() + 365 * 24 * 60 * 60 * 1000,
    isAdmin: true,
    isCoach: true,
  },
  {
    name: 'Аня Гомонова',
    password: bycript.hashSync('temaisthebest'),
    phone: '+79251356731',
    availableSessions: 1,
    hasCertifiacte: false,
    sessionsValidUntil: new Date() + 30 * 24 * 60 * 60 * 1000,
    telegramId: '447452026',
    isAdmin: false,
    isCoach: false,
  },
];

export default users;

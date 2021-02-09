import bycript from 'bcryptjs';

const users = [
  {
    name: 'Артем Савосин',
    password: bycript.hashSync('226104'),
    phone: '+77079120824',
    isAdmin: true,
    isCoach: false,
  },
  {
    name: 'Жасмин Амирбекова',
    password: bycript.hashSync('jasyastar020201'),
    phone: '+77019818336',
    isAdmin: true,
    isCoach: false,
  },
  {
    name: 'Аня Гомонова',
    password: bycript.hashSync('temaisthebest'),
    phone: '+79251356731',
    isAdmin: false,
    isCoach: false,
  },
];

export default users;

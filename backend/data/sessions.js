const sessions = [
  {
    name: 'Session 1',
    description: 'Desc 1',
    availablePlace: 15,
    date: new Date(Number(new Date()) + 24 * 60 * 60 * 1000),
  },
  {
    name: 'Session 2',
    description: 'Desc 2',
    availablePlace: 10,
    date: new Date(Number(new Date()) + 48 * 60 * 60 * 1000),
  },
  {
    name: 'Session 3',
    description: 'Desc 3',
    availablePlace: 15,
    date: new Date(Number(new Date()) + 3 * 24 * 60 * 60 * 1000),
  },
];

export default sessions;

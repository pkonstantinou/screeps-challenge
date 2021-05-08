exports.colonyConfiguration = {
  population: [
    {
      role: 'miner',
      bodyParts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
      maxCount: 4,
    },
    {
      role: 'transporter',
      bodyParts: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
      maxCount: 3,
    },
    {
      role: 'upgrader',
      bodyParts: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
      maxCount: 3,
    },
    {
      role: 'builder',
      bodyParts: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
      maxCount: 1,
    },
    {
      role: 'repairer',
      bodyParts: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
      maxCount: 2,
    },
  ],
};

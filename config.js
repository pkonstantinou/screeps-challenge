exports.colonyConfiguration = {
  population: [
    {
      role: "miner",
      bodyParts: [WORK, WORK, WORK, WORK, CARRY, MOVE],
      maxCount: 2,
    },
    {
      role: "transporter",
      bodyParts: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
      maxCount: 1,
    },
    {
      role: "upgrader",
      bodyParts: [WORK, WORK, WORK, CARRY, MOVE, MOVE],
      maxCount: 2,
    },
    {
      role: "upgradeSupporter",
      bodyParts: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
      maxCount: 1,
    },
    {
      role: "builder",
      bodyParts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
      maxCount: 1,
    },
    {
      role: "repairer",
      bodyParts: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
      maxCount: 2,
    },
  ],
};

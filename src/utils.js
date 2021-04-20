exports.clearMemory = () => {
  _.forEach(Object.keys(Memory.creeps), (name) => {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  });
};

exports.printRoomsEnergy = () => {
  _.forEach(Object.keys(Game.rooms), (name) => {
    console.log(
      `Room "${name}" has ${Game.rooms[name].energyAvailable} energy`
    );
  });
};

exports.maintainColonyPop = (populationParams, spawnObj) => {
  const generateCreeps = (role, bodyParts, maxCount, spawn) => {
    if (spawn) {
      const creepsOfCertainRole = _.filter(
        Game.creeps,
        (creep) => creep.memory.role === role
      );

      if (creepsOfCertainRole.length < maxCount) {
        // Find the source with most energy
        const sources = spawn.room.find(FIND_SOURCES);
        sources.sort((a, b) => b.energy - a.energy);
        const sourceId = sources[0].id;

        // Construct the name for the creep
        const newName = role + Game.time;

        // Construct the options for the creep
        const options = {
          memory: { role, sourceId: role === 'miner' ? sourceId : undefined },
        };

        // Spawn the creep
        spawnObj.spawnCreep(bodyParts, newName, options);
      }
    }
  };

  populationParams.forEach((el) => {
    generateCreeps(el.role, el.bodyParts, el.maxCount, spawnObj);
  });
};

exports.defendRoom = (roomName) => {
  const hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);

  if (hostiles.length > 0) {
    const { username } = hostiles[0].owner;
    Game.notify(`User ${username} spotted in room ${roomName}`);
    const towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
      filter: { structureType: STRUCTURE_TOWER },
    });
    towers.forEach((tower) => tower.attack(hostiles[0]));
  }
};

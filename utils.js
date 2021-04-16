exports.clearMemory = () => {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }
};

exports.printRoomsEnergy = () => {
  for (let name in Game.rooms) {
    console.log(
      'Room "' + name + '" has ' + Game.rooms[name].energyAvailable + " energy",
    );
  }
};

exports.maintainColonyPop = (populationParams, spawnObj) => {
  const generateCreeps = (role, bodyParts, maxCount, spawnObj) => {
    if (spawnObj) {
      const creepsOfCertainRole = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == role,
      );

      if (creepsOfCertainRole.length < maxCount) {
        const newName = role + Game.time;
        spawnObj.spawnCreep(bodyParts, newName, { memory: { role: role } });
      }
    }
  };

  populationParams.forEach((el) => {
    generateCreeps(el.role, el.bodyParts, el.maxCount, spawnObj);
  });
};

exports.defendRoom = (roomName) => {
  var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
  if (hostiles.length > 0) {
    var username = hostiles[0].owner.username;
    Game.notify(`User ${username} spotted in room ${roomName}`);
    var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
      filter: { structureType: STRUCTURE_TOWER },
    });
    towers.forEach((tower) => tower.attack(hostiles[0]));
  }
};

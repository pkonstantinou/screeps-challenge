const roleMiner = {
  run(creep) {
    if (creep.memory.mining) {
      this.mine(creep);
      if (creep.store.getFreeCapacity() === 0) {
        creep.memory.mining = false;
        creep.say("Storing...");
      }
    } else {
      this.store(creep);
      if (creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.mining = true;
        creep.say("Mining...");
      }
    }
  },

  mine(creep) {
    const sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[1], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  },

  store(creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          structure.structureType === STRUCTURE_CONTAINER &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });

    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  },
};

module.exports = roleMiner;

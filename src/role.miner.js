const roleMiner = {
  run(creep) {
    if (creep.memory.mining) {
      this.mine(creep);
      if (creep.store.getFreeCapacity() === 0) {
        _.set(creep, 'memory.mining', false);
        creep.say('Storing...');
      }
    } else {
      this.store(creep);
      if (creep.store[RESOURCE_ENERGY] === 0) {
        _.set(creep, 'memory.mining', true);
        creep.say('Mining...');
      }
    }
  },

  mine(creep) {
    const source = Game.getObjectById(creep.memory.sourceId);
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  },

  store(creep) {
    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (structure) => structure.structureType === STRUCTURE_CONTAINER,
    });

    if (target) {
      if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  },
};

module.exports = roleMiner;

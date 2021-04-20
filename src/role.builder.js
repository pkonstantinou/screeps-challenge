const roleBuilder = {
  run(creep) {
    if (creep.memory.building) {
      this.build(creep);
      if (creep.store[RESOURCE_ENERGY] === 0) {
        _.set(creep, 'memory.building', false);
        creep.say('Charging...');
      }
    } else {
      this.charge(creep);
      if (creep.store.getFreeCapacity() === 0) {
        _.set(creep, 'memory.building', true);
        creep.say('Building...');
      }
    }
  },

  build(creep) {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);

    if (targets.length > 0) {
      if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {
          visualizePathStyle: { stroke: '#ffffff' },
        });
      }
    }
  },

  charge(creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => structure.structureType === STRUCTURE_CONTAINER,
    });

    targets.sort(
      (a, b) => a.store.getFreeCapacity() - b.store.getFreeCapacity()
    );

    if (targets.length > 0) {
      if (creep.withdraw(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {
          visualizePathStyle: { stroke: '#ffffff' },
        });
      }
    }
  },
};

module.exports = roleBuilder;

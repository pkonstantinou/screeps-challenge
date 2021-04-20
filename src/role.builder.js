const roleBuilder = {
  run(creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      _.set(creep, 'memory.building', false);
      creep.say('Charging...');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      _.set(creep, 'memory.building', true);
      creep.say('Building...');
    }

    if (creep.memory.building) {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: { stroke: '#ffffff' },
          });
        }
      }
    } else {
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
    }
  },
};

module.exports = roleBuilder;

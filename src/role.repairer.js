const roleRepairer = {
  run(creep) {
    if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] === 0) {
      _.set(creep, 'memory.repairing', false);
      creep.say('Charging...');
    }

    if (!creep.memory.repairing && creep.store.getFreeCapacity() === 0) {
      _.set(creep, 'memory.repairing', true);
      creep.say('Repairing...');
    }

    if (creep.memory.repairing) {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) =>
          (structure.structureType === STRUCTURE_CONTAINER ||
            structure.structureType === STRUCTURE_ROAD ||
            (structure.structureType === STRUCTURE_WALL &&
              structure.hits < 200000) ||
            (structure.structureType === STRUCTURE_RAMPART &&
              structure.hits < 200000)) &&
          structure.hits < structure.hitsMax,
      });

      // targets.sort((a, b) => a.hits - b.hits);

      if (targets.length > 0) {
        if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
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

module.exports = roleRepairer;

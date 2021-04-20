const roleTransporter = {
  run(creep) {
    if (creep.memory.transporting) {
      this.transport(creep);
      if (creep.store[RESOURCE_ENERGY] === 0) {
        _.set(creep, 'memory.transporting', false);
        creep.say('Loading...');
      }
    } else {
      this.load(creep);
      if (creep.store.getFreeCapacity() === 0) {
        _.set(creep, 'memory.transporting', true);
        creep.say('Transporting...');
      }
    }
  },

  transport(creep) {
    let targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) =>
        (structure.structureType === STRUCTURE_EXTENSION ||
          structure.structureType === STRUCTURE_SPAWN ||
          structure.structureType === STRUCTURE_TOWER) &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
    });

    // Also get the container close to the controller
    const container = creep.room.controller.pos.findClosestByRange(
      FIND_STRUCTURES,
      { filter: (structure) => structure.structureType === STRUCTURE_CONTAINER }
    );

    if (container) {
      targets = [...targets, container];
    }

    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else {
      creep.moveTo(Game.spawns.Spawn1, {
        visualizePathStyle: { stroke: '#ffffff' },
      });
    }
  },

  load(creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => structure.structureType === STRUCTURE_CONTAINER,
    });

    targets.sort(
      (a, b) => a.store.getFreeCapacity() - b.store.getFreeCapacity()
    );

    if (targets.length > 0) {
      if (creep.withdraw(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  },
};

module.exports = roleTransporter;

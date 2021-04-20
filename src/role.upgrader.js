const roleUpgrader = {
  run(creep) {
    if (creep.memory.upgrading) {
      this.upgrade(creep);
      if (creep.store[RESOURCE_ENERGY] === 0) {
        _.set(creep, 'memory.upgrading', false);
        creep.say('Charging...');
      }
    } else {
      this.charge(creep);
      if (creep.store.getFreeCapacity() === 0) {
        _.set(creep, 'memory.upgrading', true);
        creep.say('Upgrading...');
      }
    }
  },

  upgrade(creep) {
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: { stroke: '#ffffff' },
      });
    }
  },

  charge(creep) {
    const container = creep.room.controller.pos.findClosestByRange(
      FIND_STRUCTURES,
      { filter: (structure) => structure.structureType === STRUCTURE_CONTAINER }
    );

    if (container) {
      if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  },
};

module.exports = roleUpgrader;

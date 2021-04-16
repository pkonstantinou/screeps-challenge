const roleUpgrader = {
  run(creep) {
    if (creep.memory.upgrading) {
      this.upgrade(creep);
      if (creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.upgrading = false;
        creep.say("Charging...");
      }
    } else {
      this.charge(creep);
      if (creep.store.getFreeCapacity() === 0) {
        creep.memory.upgrading = true;
        creep.say("Upgrading...");
      }
    }
  },

  upgrade(creep) {
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);
    }
  },

  charge(creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType == STRUCTURE_CONTAINER;
      },
    });

    if (targets.length > 0) {
      if (creep.withdraw(targets[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[1], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  },
};

module.exports = roleUpgrader;

const roleTransporter = {
  run(creep) {
    this.saveEnergyIfLowTicksToLive(creep);

    if (creep.memory.transporting) {
      this.transport(creep);
      if (creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.transporting = false;
        creep.say("Loading...");
      }
    } else {
      this.load(creep);
      if (creep.store.getFreeCapacity() === 0) {
        creep.memory.transporting = true;
        creep.say("Transporting...");
      }
    }
  },

  transport(creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });

    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    } else {
      creep.moveTo(Game.spawns["Spawn1"], {
        visualizePathStyle: { stroke: "#ffffff" },
      });
    }
  },

  load(creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType === STRUCTURE_CONTAINER;
      },
    });

    if (targets.length > 0) {
      if (creep.withdraw(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  },

  saveEnergyIfLowTicksToLive(creep) {
    if (creep.ticksToLive < 50) {
      const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            structure.structureType === STRUCTURE_CONTAINER &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });

      if (target) {
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }

      if (creep.store[RESOURCE_ENERGY] === 0) {
        creep.suicide();
      }
    }
  },
};

module.exports = roleTransporter;

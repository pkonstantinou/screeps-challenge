const roleUpgradeSupporter = {
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
    const containers = this.getContainers(creep);

    if (creep.transfer(containers[1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(containers[1], {
        visualizePathStyle: { stroke: "#ffffff" },
      });
    }
  },

  load(creep) {
    const containers = this.getContainers(creep);
    console.log(containers);

    if (creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(containers[0], {
        visualizePathStyle: { stroke: "#ffffff" },
      });
    }
  },

  getContainers(creep) {
    return creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType === STRUCTURE_CONTAINER;
      },
    });
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

module.exports = roleUpgradeSupporter;

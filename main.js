const roleMiner = require("role.miner");
const roleTransporter = require("role.transporter");
const roleUpgrader = require("role.upgrader");
const roleUpgradeSupporter = require("role.upgradeSupporter");
const roleBuilder = require("role.builder");
const roleRepairer = require("role.repairer");
const { colonyConfiguration } = require("config");
const {
  clearMemory,
  printRoomsEnergy,
  defendRoom,
  maintainColonyPop,
} = require("utils");

module.exports.loop = () => {
  // Clear memory from non-existing entities
  clearMemory();

  // Print room energy in the console
  printRoomsEnergy();

  // Maintain the colony population
  maintainColonyPop(colonyConfiguration.population, Game.spawns["Spawn1"]);

  // Defend room(s) from attack
  for (name in Game.rooms) {
    defendRoom(name);
  }

  // Handle execution of main routine per role
  for (let name in Game.creeps) {
    const creep = Game.creeps[name];
    switch (creep.memory.role) {
      case "miner":
        roleMiner.run(creep);
        break;
      case "transporter":
        roleTransporter.run(creep);
        break;
      case "upgrader":
        roleUpgrader.run(creep);
        break;
      case "upgradeSupporter":
        roleUpgradeSupporter.run(creep);
        break;
      case "builder":
        roleBuilder.run(creep);
        break;
      case "repairer":
        roleRepairer.run(creep);
        break;
      default:
        console.log("Unknown creep role!");
    }
  }
};

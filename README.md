# Screeps Game (Challenge)

This is my first attemp to enter into the world of Screeps. Screeps is a fun game and has a unique angle to it. Using actual programming instead of a pseudo-language actually allows the players to focus on better coding habits and makes practice fun.

### Main

- Clean up memory of dead creeps
- Print room available energy to the console
- Maintain colony population
- Defend the room from attacks using a tower
- Execute the the core functionality of each creep based on its role

### Roles

- `role.builder` : Builds structures
- `role.harvester` : Early starge all-around worker
- `role.miner` : Harvests energy from the source and drops it to a nearby container
- `role.repairer` : Repairs certain structures that have been damaged
- `role.transporter` : Transports energy from the source to either spawn, extensions or towers
- `role.upgrader` : Upgrades the room controller

### Utils

- `clearMemory` : Releases unused memory occupied by died creeps
- `printRoomsEnergy` : Prints rooms available energy to the console
- `maintainColonyPop` : Based on a user's configuration, it preserves the creep count per role
- `defendRoom` : Based on a room name, it detects enemies that entering the room and enables the tower for defense

### Config

- `colonyConfiguration.population` : Configuration object for the colony population. To be used with the `maintainColonyPop` function.

###### Room: https://screeps.com/a/#!/room/shard3/W13S54

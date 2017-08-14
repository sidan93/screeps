/*
PARTS:
COSTS:
 WORK = 100
 CARRY = 50
 MOVE = 50
 */

let costs = {
  [WORK]: 100,
  [CARRY]: 50,
  [MOVE]: 50,
};

module.exports = {
  creep_base: [WORK, CARRY, MOVE],                // 200
  miner_base: [WORK, CARRY, CARRY, MOVE, MOVE],   // 300
  miner_light: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE],   // 500
  miner_medium: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], // 700

  calc_costs(parts) {
    let result = 0;
    parts.forEach(function(part) {
      result += costs[part];
    });
    return result;
  }
};
let CreepMiner = require('CreepMiner');
let RoleHandlers = require('RoleHandlers');
let CreepBase = require('CreepBase');
let CreepRoomController = require('CreepRoomController');
let CreepBuilder = require('CreepBuilder');
let CreepRepair = require('CreepRepair');
let CreepMinerMineral = require('CreepMinerMineral');

class CreepHandlers {
  static get roles() {
    return {
      [CreepMiner.param.role]: CreepMiner,
      [CreepRoomController.param.role]: CreepRoomController,
      [CreepBuilder.param.role]: CreepBuilder,
      [CreepRepair.param.role]: CreepRepair,
      [CreepMinerMineral.param.role]: CreepMinerMineral,
    };
  };

  static instance_by_role(role, creep) {
    if (CreepHandlers.roles[role])
      return new CreepHandlers.roles[role](creep);
    return null;
  }

  static get_class_by_roles(role) {
    if (CreepHandlers.roles[role])
      return CreepHandlers.roles[role];
    return null;
  }

  static init_role(game_creep) {
    // Если по каким то причинам нужна роль, а все свободные кончились, создаем ту, которая нужна почти всегда
    let role = RoleHandlers.get_free_role() || CreepMiner.param.role;
    let mem_creep = Memory.creeps[game_creep.name];
    mem_creep.role = role;
    Memory.roles[role][CreepBase.m_const.cur_role_creeps]++;
    return role;
  }

  static get_all_creep() {
    let result = [];
    for (let i in Game.creeps) {
      if (!Game.creeps.hasOwnProperty(i))
        continue;

      let game_creep = Game.creeps[i];
      let mem_creep = Memory.creeps[i];

      if (!game_creep || !mem_creep)
        continue;

      if (!mem_creep.role) {
        CreepHandlers.init_role(game_creep);
      }
      let creep = CreepHandlers.instance_by_role(mem_creep.role, game_creep);
      result.push(creep);
    }

    return result;
  }
}

module.exports = CreepHandlers;
let CreepBase = require('CreepBase');
let CreepMiner = require('CreepMiner');
let CreepRoomController = require('CreepRoomController');
let CreepBuilder = require('CreepBuilder');
let CreepRepair = require('CreepRepair');
let CreepMinerMineral = require('CreepMinerMineral');

class GameLoop {
  static garbageCollection() {
    if (Object.keys(Game.creeps) !== Object.keys(Memory.creeps)) {
      for (let i in Memory.creeps) {
        if (!Memory.creeps.hasOwnProperty(i))
          continue;

        if (!Game.creeps[i]) {
          let role = Memory.creeps[i].role;
          if (Memory.roles[role])
            Memory.roles[role][CreepBase.m_const.cur_role_creeps]--;
          delete Memory.creeps[i];
        }
      }
    }
  }

  static check_mem_variable() {
    if (!Memory.roles) Memory.roles = {};
    CreepMiner.init_mem();
    CreepRoomController.init_mem();
    CreepBuilder.init_mem();
    CreepRepair.init_mem();
    CreepMinerMineral.init_mem();

    if (!Memory.energy_used) Memory.energy_used = {}
  }

  static tick() {
    GameLoop.check_mem_variable();
    GameLoop.garbageCollection();
  }
}


module.exports = GameLoop;
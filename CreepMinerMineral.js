let CreepBase = require('CreepBase');

class CreepMinerMineral extends CreepBase {
  static get param() {
    return {
      role: 'MINER_MINERAL',
      body: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]
    };
  };

  static init_mem() {
    let mem_rol = Memory.roles[CreepMinerMineral.param.role];
    if (!mem_rol) {
      mem_rol = {
        [CreepBase.m_const.cur_role_creeps]: 0,
      };
      Memory.roles[CreepMinerMineral.param.role] = mem_rol;
    }
    mem_rol[CreepBase.m_const.max_role_creeps] = 0;
    mem_rol[CreepBase.m_const.rate_role_creeps] = 50;
  }

  constructor(creep) {
    super(creep);
  }

  do_action(m_room) {
    if (!this.mem_creep.action) {
      let container = m_room.get_free_container();
      let mineral = m_room.get_mineral();
      if (!container || !mineral) {
        this.mem_creep.action = null;
      }
      else if (this.cur_carry === 0) {
        this.mem_creep.target = mineral.id;
        this.mem_creep.action = CreepBase.action_names.mining;
      }
      else {
        this.mem_creep.target = container.id;
        this.mem_creep.action = CreepBase.action_names.release_to_container;
      }
    }

    super.do_action(m_room);
  }
}

module.exports = CreepMinerMineral;
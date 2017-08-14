let CreepBase = require('CreepBase');

class CreepRepair extends CreepBase {
  static get param() {
    return {
      role: 'REPAIR',
      body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE]
    };
  };

  static init_mem() {
    let mem_rol = Memory.roles[CreepRepair.param.role];
    if (!mem_rol) {
      mem_rol = {
        [CreepBase.m_const.cur_role_creeps]: 0,
      };
      Memory.roles[CreepRepair.param.role] = mem_rol;
    }
    mem_rol[CreepBase.m_const.max_role_creeps] = 4;
    mem_rol[CreepBase.m_const.rate_role_creeps] = 80;
  }

  constructor(creep) {
    super(creep);
  }

  clear_action(m_room) {
    if (this.mem_creep.action === CreepBase.action_names.mining)
      m_room.release_energy(this.mem_creep.target);
    super.clear_action(m_room);
  }

  do_action(m_room) {
    if (!this.mem_creep.action) {
      if (!m_room.get_repaire())
        this.mem_creep.action = null;
      else if (this.cur_carry === 0) {
        this.mem_creep.target = m_room.get_optimizal_energy(m_room.get_repaire()).id;
        m_room.take_energy(this.mem_creep.target);
        this.mem_creep.action = CreepBase.action_names.mining;
      }
      else {
        this.mem_creep.target = m_room.get_repaire().id;
        this.mem_creep.action = CreepBase.action_names.repair;
      }
    }

    super.do_action(m_room);
  }
}

module.exports = CreepRepair;
let CreepBase = require('CreepBase');

class CreepBuilder extends CreepBase {
  static get param() {
    return {
      role: 'BUILDER',
      body: [WORK, WORK, WORK, CARRY, CARRY, MOVE]
    };
  };

  static init_mem() {
    let mem_rol = Memory.roles[CreepBuilder.param.role];
    if (!mem_rol) {
      mem_rol = {
        [CreepBase.m_const.cur_role_creeps]: 0,
      };
      Memory.roles[CreepBuilder.param.role] = mem_rol;
    }
    mem_rol[CreepBase.m_const.max_role_creeps] = 2;
    mem_rol[CreepBase.m_const.rate_role_creeps] = 70;
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
      if (!m_room.get_building())
        this.mem_creep.action = null;
      else if (this.cur_carry === 0) {
        this.mem_creep.target = m_room.get_optimizal_energy(m_room.get_building()).id;
        m_room.take_energy(this.mem_creep.target);
        this.mem_creep.action = CreepBase.action_names.mining;
      }
      else {
        this.mem_creep.target = m_room.get_building().id;
        this.mem_creep.action = CreepBase.action_names.building;
      }
    }

    super.do_action(m_room);
  }
}

module.exports = CreepBuilder;
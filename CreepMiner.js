let CreepBase = require('CreepBase');

class CreepMiner extends CreepBase {
  static get param() {
    return {
      role: 'MINER',
      body: [WORK, CARRY, CARRY, MOVE, MOVE],
    };
  };

  static get_body(my_room) {
    let max_energy = my_room.get_max_energy();
  }

  static init_mem() {
    let mem_rol = Memory.roles[CreepMiner.param.role];
    if (!mem_rol) {
      mem_rol = {
        [CreepBase.m_const.cur_role_creeps]: 0,
      };
      Memory.roles[CreepMiner.param.role] = mem_rol;
    }
    mem_rol[CreepBase.m_const.max_role_creeps] = 3;
    mem_rol[CreepBase.m_const.rate_role_creeps] = 500;
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
      let container = m_room.get_energy_container();
      if (!container) {
        this.mem_creep.action = null;
      }
      else if (this.cur_carry === 0) {
        this.mem_creep.target = m_room.get_optimizal_energy(container).id;
        m_room.take_energy(this.mem_creep.target);
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

module.exports = CreepMiner;
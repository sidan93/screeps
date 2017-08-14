let CreepBase = require('CreepBase');

class CreepRoomController extends CreepBase {
  static get param() {
    return {
      role: 'ROOM_CONTROLLER',
      body: [WORK, CARRY, CARRY, MOVE, MOVE]
    };
  };

  static init_mem() {
    let mem_rol = Memory.roles[CreepRoomController.param.role];
    if (!mem_rol) {
      mem_rol = {
        [CreepBase.m_const.cur_role_creeps]: 0,
      };
      Memory.roles[CreepRoomController.param.role] = mem_rol;
    }
    mem_rol[CreepBase.m_const.max_role_creeps] = 5;
    mem_rol[CreepBase.m_const.rate_role_creeps] = 200;
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
      if (this.cur_carry === 0) {
        this.mem_creep.target = m_room.get_optimizal_energy(m_room.get_room_controller()).id;
        m_room.take_energy(this.mem_creep.target);
        this.mem_creep.action = CreepBase.action_names.mining;
      }
      else {
        this.mem_creep.target = m_room.get_room_controller().id;
        this.mem_creep.action = CreepBase.action_names.release_to_controller;
      }
    }

    super.do_action(m_room);
  }
}

module.exports = CreepRoomController;
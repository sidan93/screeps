class CreepBase {
  static get m_const() {
    return {
      max_role_creeps: 'MAX_ROLE_CREEPS',
      cur_role_creeps: 'CUR_ROLE_CREEPS',
      rate_role_creeps: 'RATE_ROLE_CREEPS',
    };
  };

  static get action_names() {
    return {
      mining: 'MINING',
      release_to_container: 'RELEASE_TO_CONTAINER',
      release_to_controller: 'RELEASE_TO_CONTROLLER',
      building: 'BUILDING',
      repair: 'REPAIR'
    };
  };


  constructor(creep) {
    this.game_creep = creep;
    this.mem_creep = Memory.creeps[creep.name];
  }

  clear_action(m_room) {
    this.mem_creep.action = null;
  }

  get cur_carry() {
    return _.sum(this.game_creep.carry);
  }

  do_action(m_room) {
    let target = null;
    switch (this.mem_creep.action) {
      case CreepBase.action_names.mining:
        target = Game.getObjectById(this.mem_creep.target);
        let res_harv = this.game_creep.harvest(target);
        //console.log(this.game_creep.name + ' : ' + res_harv);
        if (res_harv === ERR_NOT_IN_RANGE)
          this.game_creep.moveTo(target);
        if (this.cur_carry === this.game_creep.carryCapacity)
          this.clear_action(m_room);
        break;
      case CreepBase.action_names.release_to_container:
      case CreepBase.action_names.release_to_controller:
        target = Game.getObjectById(this.mem_creep.target);
        let res_tr = this.game_creep.transfer(target, RESOURCE_ENERGY);
        if (res_tr === ERR_NOT_IN_RANGE)
          this.game_creep.moveTo(target);
        if (res_tr === ERR_NOT_ENOUGH_RESOURCES)
          this.clear_action(m_room);
        if (res_tr === ERR_FULL)
          this.clear_action(m_room);
        break;
      case CreepBase.action_names.building:
        target = Game.getObjectById(this.mem_creep.target);
        let res_bul = this.game_creep.build(target);
        if (res_bul === ERR_NOT_IN_RANGE)
          this.game_creep.moveTo(target);
        if (res_bul === ERR_NOT_ENOUGH_RESOURCES)
          this.clear_action(m_room);
        if (res_bul === ERR_INVALID_TARGET)
          this.clear_action(m_room);
        break;
      case CreepBase.action_names.repair:
        target = Game.getObjectById(this.mem_creep.target);
        let rep_bul = this.game_creep.repair(target);
        if (rep_bul === ERR_NOT_IN_RANGE)
          this.game_creep.moveTo(target);
        if (rep_bul === ERR_NOT_ENOUGH_RESOURCES)
          this.clear_action(m_room);
        if (rep_bul === ERR_INVALID_TARGET)
          this.clear_action(m_room);
        if (target.hits === target.hitsMax)
          this.clear_action(m_room);

        break;
    }
  }
}

module.exports = CreepBase;

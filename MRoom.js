let RoleHandlers = require('RoleHandlers');
let CreepHandlers = require('CreepHandlers');

class MRoom {
  constructor(room) {
    this.room = room;
  }

  spawn() {
    return this.room.find(FIND_MY_SPAWNS)[0];
  }

  spawn_creeps() {
    let role = RoleHandlers.get_free_role();
    if (role) {
      let creep_class = CreepHandlers.get_class_by_roles(role);
      let can_create = this.spawn().canCreateCreep(creep_class.param.body);
      if (can_create === 0) {
        let result_create = this.spawn().createCreep(creep_class.param.body);
        console.log('create creep ' + result_create)
      }
      else
        console.log('cant create crep ' + can_create)
    }
  }

  get_creep_energy(id) {
    return Memory.energy_used[id] || 0;
  }
  take_energy(id) {
    if (!Memory.energy_used[id]) Memory.energy_used[id] = 0;
    Memory.energy_used[id]++;
  }
  release_energy(id) {
    if (Memory.energy_used[id])
      Memory.energy_used[id]--;
  }
  get_optimizal_energy(target) {
    let _this = this;
    let energy_list = this.room.find(FIND_SOURCES);
    let min_cost = null;
    let min_energy = null;
    energy_list.forEach(function(energy) {
      let result = PathFinder.search(target.pos, energy.pos);
      // Каждый дополнительный крип у энеергии, увеличивает стоймость добычи на 2
      result.cost += _this.get_creep_energy(energy.id) * 2;
      if (min_energy === null) {
        min_energy = energy;
        min_cost = result.cost;
      }
      else {
        if (result.cost < min_cost) {
          min_energy = energy;
          min_cost = result.cost;
        }
      }
    });
    return min_energy;
  }
  get_mineral() {
    return this.room.find(FIND_MINERALS)[0];
  }
  get_energy_container() {
    return this.room.find(FIND_STRUCTURES).filter(i => i instanceof StructureExtension).find(i => i.energy < i.energyCapacity) ||
      this.room.find(FIND_MY_STRUCTURES).filter(i => i instanceof StructureTower).find(i => i.energy < i.energyCapacity) ||
      this.spawn();
  }
  get_free_container() {
    return this.room.find(FIND_STRUCTURES).filter(i => i instanceof StructureContainer).find(i => _.sum(i.store) < i.storeCapacity);
  }
  get_room_controller() {
    return this.room.find(FIND_STRUCTURES).filter(i => i instanceof StructureController)[0];
  }
  get_building() {
    return this.room.find(FIND_MY_CONSTRUCTION_SITES)[0] || null;
  }
  get_repaire() {
    return this.room.find(FIND_MY_STRUCTURES).find(i => i.hits !== i.hitsMax) ||
        this.room.find(FIND_MY_STRUCTURES).filter(i => i instanceof StructureContainer).find(i => i.hits !== i.hitsMax) ||
        this.room.find(FIND_STRUCTURES).filter(i => i instanceof StructureRoad).find(i => i.hits !== i.hitsMax) ||
        this.room.find(FIND_STRUCTURES).filter(i => i instanceof StructureContainer).find(i => i.hits !== i.hitsMax) ||
        this.room.find(FIND_STRUCTURES).filter(i => i instanceof StructureWall).find(i => i.hits <= 50000);
  }
  activate_safe_mode() {
    if (!this.room.safeMode)
      this.get_room_controller().activateSafeMode();
  }
  get_max_energy() {
    let containers = this.room.find(FIND_STRUCTURES).filter(i => i instanceof StructureExtension);
    let result = 0;
    result += this.spawn().energyCapacity;
    containers.forEach(i => result += i.energyCapacity);
    return result;
  }
}

module.exports = MRoom;
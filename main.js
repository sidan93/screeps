let GameLoop = require('GameLoop');
let CreepHandlers = require('CreepHandlers');
let MRoom = require('MRoom');

console.log('new tick');

GameLoop.tick();
let m_room = new MRoom(Game.rooms[Object.keys(Game.rooms)[0]]);
// m_room.activate_safe_mode();
m_room.spawn_creeps();
CreepHandlers.get_all_creep().forEach(function(creep) {
  creep.do_action(m_room);
});
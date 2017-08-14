let CreepBase = require('CreepBase');

class RoleHandlers {
    static get_free_role() {
      let roles = Memory.roles;
      let create_role = null;
      for (let i in roles) {
        if (!roles.hasOwnProperty(i))
          continue;
        let mem_role = roles[i];
        if (mem_role[CreepBase.m_const.cur_role_creeps] < mem_role[CreepBase.m_const.max_role_creeps]){
          if (!create_role)
            create_role = i;
          else
          if (roles[create_role][CreepBase.m_const.rate_role_creeps] < mem_role[CreepBase.m_const.rate_role_creeps])
            create_role = i;
        }
      }
      return create_role;
    }
}

module.exports = RoleHandlers;
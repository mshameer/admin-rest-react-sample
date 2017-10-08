export const APP_LOGIN_PERMISSION = 'PERMISSION/APP_LOGIN';
export const STATE_LEVEL_PERMISSION = 'PERMISSION/STATE_LEVEL';
export const DISTRICT_LEVEL_PERMISSION = 'PERMISSION/DISTRICT_LEVEL';
export const ZONE_LEVEL_PERMISSION = 'PERMISSION/ZONE_LEVEL';
export const UNIT_LEVEL_PERMISSION = 'PERMISSION/UNIT_LEVEL';

const arrType = Array;
arrType.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

const roleRules = {
    state: { id: 'state', name: 'State Admin' },
    district: { id: 'district', name: 'District Admin' },
    zone: { id: 'zone', name: 'Zone Admin' },
    unit: { id: 'unit', name: 'Unit Admin' },
    member: { id: 'member', name: 'Member' },
};

const permissionRules  = {
  state: STATE_LEVEL_PERMISSION,
  district: STATE_LEVEL_PERMISSION,
  zone: DISTRICT_LEVEL_PERMISSION,
  unit: ZONE_LEVEL_PERMISSION,
  member: UNIT_LEVEL_PERMISSION,
}

export function getCurrentUser(){
  return JSON.parse(localStorage.getItem('currentUser'));
}

export function hasPermission(role, type) {
  switch(type){
    case APP_LOGIN_PERMISSION:
    return ['state', 'district', 'zone', 'unit'].contains(role);
    case STATE_LEVEL_PERMISSION:
    return role === 'state';
    case DISTRICT_LEVEL_PERMISSION:
    return ['state', 'district'].contains(role);
    case ZONE_LEVEL_PERMISSION:
    return ['state', 'district', 'zone'].contains(role);
    case UNIT_LEVEL_PERMISSION:
    return ['state', 'district', 'zone', 'unit'].contains(role);
    default:
    return false;
  }
}

export function getRoles(role){
    const allowedRoles = [];
    Object.keys(permissionRules).forEach((permission) => {
      if(hasPermission(role, permissionRules[permission])) {
        allowedRoles.push(roleRules[permission]);
      }
    });
    return allowedRoles;
}

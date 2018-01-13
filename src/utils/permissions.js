export const APP_LOGIN_PERMISSION = 'PERMISSION/APP_LOGIN';
export const STATE_LEVEL_PERMISSION = 'PERMISSION/STATE_LEVEL';
export const DISTRICT_LEVEL_PERMISSION = 'PERMISSION/DISTRICT_LEVEL';
export const ZONE_LEVEL_PERMISSION = 'PERMISSION/ZONE_LEVEL';
export const UNIT_LEVEL_PERMISSION = 'PERMISSION/UNIT_LEVEL';
export const PERMISSION_EQUAL_TO = 'PERMISSION/PERMISSION_EQUAL_TO';
export const PERMISSION_NOT_EQUAL_TO = 'PERMISSION/PERMISSION_NOT_EQUAL_TO';

const arrType = Array;
arrType.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

const roleRules = {
    state: { id: 'state', name: 'സ്റ്റേറ്റ് അഡ്മിൻ' },
    district: { id: 'district', name: 'ജില്ലാ അഡ്മിൻ' },
    zone: { id: 'zone', name: 'മേഖല അഡ്മിൻ' },
    unit: { id: 'unit', name: 'യൂണിറ്റ് അഡ്മിൻ' },
    member: { id: 'member', name: 'യൂണിറ്റ് മെബർ' },
    member: { id: 'roots', name: 'റൂട്സ് ജില്ലാ അഡ്മിൻ' },
};


const permissionRules  = {
  state: STATE_LEVEL_PERMISSION,
  district: STATE_LEVEL_PERMISSION,
  zone: DISTRICT_LEVEL_PERMISSION,
  unit: ZONE_LEVEL_PERMISSION,
  member: UNIT_LEVEL_PERMISSION,
}

export function getCurrentUser(){
  const currentUser = localStorage.getItem('currentUser');
  if(!currentUser) {
    return {};
  }
  return JSON.parse(currentUser);
}

export function hasPermission(role, type, ) {
  const currentUser = getCurrentUser();

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
    case PERMISSION_EQUAL_TO:
      return currentUser.role === role;
    case PERMISSION_NOT_EQUAL_TO:
      return currentUser.role !== role;
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

export const WithPermission = ({type, role, children}) =>  hasPermission(role, type) && children;

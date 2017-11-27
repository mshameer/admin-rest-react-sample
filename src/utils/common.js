import React from 'react';
import {  ReferenceInput, SelectInput, DisabledInput } from 'admin-on-rest';
import { hasPermission, STATE_LEVEL_PERMISSION, DISTRICT_LEVEL_PERMISSION, ZONE_LEVEL_PERMISSION } from './permissions';
import DepOnRefInput from '../mui/form/depOnRefInput';

export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export function orgLevelInput(source, reference, label, currentUser, dependsOn) {
  const RefInput = dependsOn ? DepOnRefInput : ReferenceInput;
  if(hasPermission(currentUser.role, STATE_LEVEL_PERMISSION)
		|| (hasPermission(currentUser.role, DISTRICT_LEVEL_PERMISSION) && reference ==='zones')
		|| (hasPermission(currentUser.role, ZONE_LEVEL_PERMISSION) && reference ==='units')) {
    return (
        <RefInput label={label} source={source} reference={reference} dependsOn={dependsOn} allowEmpty>
            <SelectInput optionText="name" options={{ fullWidth: true }}  />
        </RefInput>
    );
	} else {
    return (
      <DisabledInput source={source} reference={reference}  defaultValue={currentUser[source]} style={{ display: 'none'}}/>
    );
  }
}

export function getPermissionBasedFilters(currentUser) {
  const { districtId, zoneId, unitId, role } = currentUser;
  const filter = { districtId, zoneId, unitId };

  if(hasPermission(role, STATE_LEVEL_PERMISSION)) {
    delete(filter.districtId);
    delete(filter.zoneId);
    delete(filter.unitId);
  } else if(hasPermission(role, DISTRICT_LEVEL_PERMISSION)) {
    delete(filter.zoneId);
    delete(filter.unitId);
  } else if(hasPermission(role, ZONE_LEVEL_PERMISSION)) {
    delete(filter.unitId);
  }

  return filter;
}

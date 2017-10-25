import React from 'react';
import { Datagrid, ReferenceField, TextField, EditButton,
  ReferenceInput, SelectInput, TextInput, DisabledInput, Filter, Responsive } from 'admin-on-rest';
import { hasPermission, getCurrentUser, getRoles, STATE_LEVEL_PERMISSION, DISTRICT_LEVEL_PERMISSION, ZONE_LEVEL_PERMISSION } from '../utils/permissions';
import DepOnRefInput from './depOnRefInput';
import UserForm from '../users/userForm';
import List from '../mui/list';
import Create from '../mui/detail/create';
import Edit from '../mui/detail/edit';
import SimpleList from '../mui/list/simpleList';
import Avatar from 'material-ui/Avatar';


const currentUser = getCurrentUser();
const orgLevelInput = (source, reference, label, role, dependsOn) => {
  const RefInput = dependsOn ? DepOnRefInput : ReferenceInput;
  if(hasPermission(role, STATE_LEVEL_PERMISSION)) {
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
const roleInput = (role) => {
  if(hasPermission(role, ZONE_LEVEL_PERMISSION)) {
    return (
      <SelectInput source="role" choices={getRoles(role)} options={{ fullWidth: true }}  />
    );
  } else {
    return (
      <SelectInput source="role" choices={getRoles(role)}  defaultValue="member" style={{ display: 'none'}}/>
    );
  }
}

const getPermissionBasedFilters = () => {
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

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);


export const UserList = (props) => (
  <List
    {...props}
    filter={ getPermissionBasedFilters() }
    filters={<UserFilter />}
    title="Members"
  >
    { role =>
      <Responsive
        small={
          <SimpleList leftAvatar={record => <Avatar>{record.displayName.charAt(0).toUpperCase()}</Avatar> } >
            <TextField label="Name " source="displayName"  type="primary"/>
            <TextField label="User ID" source="phoneNumber" type="secondary"/>
            <ReferenceField label="Category" source="categoryId" reference="categories" type="tertiary" linkType="none">
              <TextField source="shortName" />
            </ReferenceField>
          </SimpleList>
        }
        medium={
          <Datagrid >
            <TextField label="Name " source="displayName" />
            <TextField label="User ID" source="phoneNumber" />
            <ReferenceField label="Category" source="categoryId" reference="categories" >
              <TextField source="shortName" />
            </ReferenceField>
            <ReferenceField label="District" source="districtId" reference="districts" >
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField  label="Zone" source="zoneId" reference="zones" >
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField  label="Unit" source="unitId" reference="units" >
              <TextField source="name" />
            </ReferenceField>
            <TextField label="Role" source="role" />
            <TextField label="Password" source="password" />
            <EditButton />
          </Datagrid>
        }
        />
    }
  </List>
);

const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.displayName}"` : ''}</span>;
};

const validateUserForm = (values) => {
  const errors = {};
  const mob = /^[1-9]{1}[0-9]{9}$/;

  if (!values.displayName) {
    errors.displayName = ['Name is required'];
  }
  if (!values.phoneNumber || mob.test(values.phoneNumber) == false ) {
    errors.phoneNumber = ['Valid Mobile No required'];
  }
  if (values.id && !values.password) {
    errors.password = ['Password is required'];
  }
  if (!values.categoryId) {
    errors.categoryId = ['Category is required'];
  }
  if (!values.districtId) {
    errors.districtId = ['District is required'];
  }
  if (!values.zoneId) {
    errors.zoneId = ['Zone is required'];
  }
  if (!values.unitId) {
    errors.unitId = ['Unit is required'];
  }
  if (!values.role) {
    errors.role = ['Role is required'];
  }

  return errors
};

const getUserForm = (role, action) => (
  <UserForm validate={validateUserForm} action={action}>
    <TextInput source="displayName"  label="Name" options={{ fullWidth: true }} />
    <TextInput source="phoneNumber" label="Mobile No" options={{ fullWidth: true }} />
    { action === 'update' && <TextInput source="password" label="Password" options={{ fullWidth: true }} /> }
    <ReferenceInput label="Category" source="categoryId" reference="categories" allowEmpty >
      <SelectInput optionText="shortName" options={{ fullWidth: true }} />
    </ReferenceInput>
    { orgLevelInput('districtId', 'districts', 'District', role) }
    { orgLevelInput('zoneId', 'zones', 'Zone', role, 'districtId') }
    { orgLevelInput('unitId', 'units', 'Unit', role, 'zoneId') }
    { roleInput(role) }
  </UserForm>
)

export const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
    { role => getUserForm(role, 'update') }
  </Edit>
);

export const UserCreate = (props) => (
  <Create {...props}>
    { role => getUserForm(role, 'create') }
  </Create>
);

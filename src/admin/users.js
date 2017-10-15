import React from 'react';
import {Edit, Create, Datagrid, ReferenceField, TextField, EditButton,
  ReferenceInput, SelectInput, TextInput, DisabledInput, Filter, Responsive } from 'admin-on-rest';
import { hasPermission, getCurrentUser, getRoles, STATE_LEVEL_PERMISSION, DISTRICT_LEVEL_PERMISSION, ZONE_LEVEL_PERMISSION } from '../utils/permissions';
import DepOnRefInput from './depOnRefInput';
import UserForm from '../users/userForm';
import List from '../mui/list';
import SimpleList from '../mui/list/simpleList';
import Avatar from 'material-ui/Avatar';


const currentUser = getCurrentUser();
const orgLevelInput = (source, reference, label, role, dependsOn) => {
  const RefInput = dependsOn ? DepOnRefInput : ReferenceInput;
  if(hasPermission(role, STATE_LEVEL_PERMISSION)) {
    return (
        <RefInput label={label} source={source} reference={reference} dependsOn={dependsOn} allowEmpty>
            <SelectInput optionText="name" />
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
      <SelectInput source="role" choices={getRoles(role)} />
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
    if (!values.displayName) {
      errors.displayName = ['Name is required'];
    }
    if (!values.phoneNumber) {
      errors.name = ['Mobile No. is required'];
    }

    return errors
  };

  export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
      { role =>
        <UserForm validate={validateUserForm} action="update" >
          <TextInput source="displayName" label="Name"/>
          <TextInput source="phoneNumber" label="Mobile No"/>
          <TextInput source="password" label="Password"/>
          <ReferenceInput label="Category" source="categoryId" reference="categories" allowEmpty >
            <SelectInput optionText="shortName" />
          </ReferenceInput>
          { orgLevelInput('districtId', 'districts', 'District', role) }
          { orgLevelInput('zoneId', 'zones', 'Zone', role, 'districtId') }
          { orgLevelInput('unitId', 'units', 'Unit', role, 'zoneId') }
          { roleInput(role) }
        </UserForm>
      }
    </Edit>
  );

  export const UserCreate = (props) => (
    <Create {...props}>
      { role =>
        <UserForm validate={validateUserForm} >
          <TextInput source="displayName"  label="Name"/>
          <TextInput source="phoneNumber" label="Mobile No"/>
          <ReferenceInput label="Category" source="categoryId" reference="categories" allowEmpty >
            <SelectInput optionText="shortName" />
          </ReferenceInput>
          { orgLevelInput('districtId', 'districts', 'District', role) }
          { orgLevelInput('zoneId', 'zones', 'Zone', role, 'districtId') }
          { orgLevelInput('unitId', 'units', 'Unit', role, 'zoneId') }
          { roleInput(role) }
        </UserForm>
      }
    </Create>
  );

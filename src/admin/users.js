import React from 'react';
import { Datagrid, ReferenceField, TextField, EditButton,
  ReferenceInput, SelectInput, TextInput, Filter, Responsive,translate } from 'admin-on-rest';
import { hasPermission, getCurrentUser, getRoles, STATE_LEVEL_PERMISSION, DISTRICT_LEVEL_PERMISSION, ZONE_LEVEL_PERMISSION } from '../utils/permissions';
import UserForm from '../users/userForm';
import List from '../mui/list';
import Create from '../mui/detail/create';
import Edit from '../mui/detail/edit';
import SimpleList from '../mui/list/simpleList';
import Avatar from 'material-ui/Avatar';
import { orgLevelInput, getPermissionBasedFilters } from '../utils/common';

const currentUser = getCurrentUser();
const roleInput = (role, label) => {
  if(hasPermission(role, ZONE_LEVEL_PERMISSION)) {
    return (
      <SelectInput source="role" label={label} choices={getRoles(role)} options={{ fullWidth: true }}  />
    );
  } else {
    return (
      <SelectInput source="role" label={label} choices={getRoles(role)}  defaultValue="member" style={{ display: 'none'}}/>
    );
  }
}

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);


export const UserList = translate(({ translate, ...props }) => (
  <List
    {...props}
    filter={ getPermissionBasedFilters(currentUser) }
    filters={<UserFilter />}
    title={translate('members.title')}
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
            <TextField label={translate('common.name')} source="displayName" />
            <TextField label={translate('members.user_id')} source="phoneNumber" />
            <ReferenceField label={translate('members.category')} source="categoryId" reference="categories" >
              <TextField source="shortName" />
            </ReferenceField>
            <ReferenceField label={translate('common.district')} source="districtId" reference="districts" >
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField  label={translate('common.zone')} source="zoneId" reference="zones" >
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField  label={translate('common.unit')} source="unitId" reference="units" >
              <TextField source="name" />
            </ReferenceField>
            <TextField label={translate('members.role')} source="role" />
            <TextField label={translate('members.password')} source="password" />
            <EditButton />
          </Datagrid>
        }
        />
    }
  </List>
));

const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.displayName}"` : ''}</span>;
};

const validateUserForm = (values) => {
  const errors = {};
  const mob = /^[1-9]{1}[0-9]{9}$/;

  if (!values.displayName) {
    errors.displayName = ['Name is required'];
  }
  if (!values.phoneNumber || mob.test(values.phoneNumber) === false ) {
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

const getUserForm = (role, action, translate) => (
  <UserForm validate={validateUserForm} action={action}>
    <TextInput source="displayName"  label={translate('common.name')} options={{ fullWidth: true }} />
    <TextInput source="phoneNumber" label={translate('common.phoneNo')} options={{ fullWidth: true }} />
    { action === 'update' && <TextInput source="password" label={translate('members.password')} options={{ fullWidth: true }} /> }
    <ReferenceInput label={translate('members.category')} source="categoryId" reference="categories" allowEmpty >
      <SelectInput optionText="shortName" options={{ fullWidth: true }} />
    </ReferenceInput>
    { orgLevelInput('districtId', 'districts', translate('common.district'), currentUser) }
    { orgLevelInput('zoneId', 'zones', translate('common.zone'), currentUser, 'districtId') }
    { orgLevelInput('unitId', 'units', translate('common.unit'), currentUser, 'zoneId') }
    { roleInput(role, translate('members.role')) }
  </UserForm>
)

export const UserEdit = translate(({ translate, ...props }) => (
  <Edit title={<UserTitle />} {...props} backTitle={translate('members.title')}>
    { role => getUserForm(role, 'update', translate) }
  </Edit>
));

export const UserCreate = translate((translate, ...props) => (
  <Create {...props} backTitle={translate('members.title')}>
    { role => getUserForm(role, 'create', translate) }
  </Create>
));

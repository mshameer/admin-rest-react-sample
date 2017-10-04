import React, { Component } from 'react';
import { List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'admin-on-rest';
import DepOnRefInput from './depOnRefInput';
import UserForm from './userForm';

export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField label="Name" source="name" />
      <TextField label="User ID" source="mobileNoId" />
      <ReferenceField label="District" source="districtId" reference="districts" >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField  label="Zone" source="zoneId" reference="zones" >
        <TextField source="name" />
      </ReferenceField>
      <TextField label="Role" source="role" />
      <EditButton />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.name}"` : ''}</span>;
  };

  const validateUserForm = (values) => {
    const errors = {};
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (!values.name) {
      errors.name = ['User name is required'];
    }
    if (values.email && !reg.test(values.email)){
      errors.email = ['Invalid email address'];
    }

    return errors
  };

  export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
      <UserForm validate={validateUserForm} >
        <TextInput source="name" />
        <TextInput source="mobileNoId" label="Mobile No"/>
        <ReferenceInput label="District" source="districtId" reference="districts" allowEmpty >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <DepOnRefInput label="Zone" source="zoneId" reference="zones" dependsOn="districtId" allowEmpty>
          <SelectInput optionText="name" />
        </DepOnRefInput>
        <DepOnRefInput label="Unit" source="unitId" reference="units" dependsOn="zoneId" allowEmpty>
          <SelectInput optionText="name" />
        </DepOnRefInput>
        <SelectInput source="role" choices={[
            { id: 'state', name: 'State Admin' },
            { id: 'district', name: 'District Admin' },
            { id: 'zone', name: 'Zone Admin' },
            { id: 'unit', name: 'Unit Admin' },
            { id: 'member', name: 'Member' },
        ]} />
      </UserForm>
    </Edit>
  );

  export const UserCreate = (props) => (
    <Create {...props}>
      <UserForm validate={validateUserForm} >
        <TextInput source="name" />
        <TextInput source="mobileNoId" label="Mobile No"/>
        <ReferenceInput label="District" source="districtId" reference="districts" allowEmpty >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <DepOnRefInput label="Zone" source="zoneId" reference="zones" dependsOn="districtId" allowEmpty>
          <SelectInput optionText="name" />
        </DepOnRefInput>
        <DepOnRefInput label="Unit" source="unitId" reference="units" dependsOn="zoneId" allowEmpty>
          <SelectInput optionText="name" />
        </DepOnRefInput>
        <SelectInput source="role" choices={[
            { id: 'state', name: 'State Admin' },
            { id: 'district', name: 'District Admin' },
            { id: 'zone', name: 'Zone Admin' },
            { id: 'unit', name: 'Unit Admin' },
            { id: 'member', name: 'Member' },
        ]} />
      </UserForm>
    </Create>
  );

import React, { Component } from 'react';
import { List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'admin-on-rest';
import DepOnRefInput from './depOnRefInput';
import UserForm from './userForm';

export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField label="Name" source="name" />
      <ReferenceField label="District" source="districtId" reference="districts" >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField  label="Zone" source="zoneId" reference="zones" >
        <TextField source="name" />
      </ReferenceField>
      <TextField label="Email" source="email" />
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
      <SimpleForm validate={validateUserForm} >
        <ReferenceInput label="District" source="districtId" reference="districts" >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Zone" source="zoneId" reference="zones" >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="name" />
        <TextInput source="email" />
      </SimpleForm>
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
      </UserForm>
    </Create>
  );

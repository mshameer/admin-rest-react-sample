import React, { Component } from 'react';
import { List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'admin-on-rest';
import DepOnRefInput from './depOnRefInput';

export const UnitList = (props) => (
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

const UnitTitle = ({ record }) => {
  return <span>Unit {record ? `"${record.name}"` : ''}</span>;
  };

  const validateUnitForm = (values) => {
    const errors = {};
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (!values.name) {
      errors.name = ['Unit name is required'];
    }
    if (values.email && !reg.test(values.email)){
      errors.email = ['Invalid email address'];
    }

    return errors
  };

  export const UnitEdit = (props) => (
    <Edit title={<UnitTitle />} {...props}>
      <SimpleForm validate={validateUnitForm} >
        <ReferenceInput label="District" source="districtId" reference="districts" >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <DepOnRefInput label="Zone" source="zoneId" reference="zones" dependsOn="districtId" allowEmpty>
          <SelectInput optionText="name" />
        </DepOnRefInput>
        <TextInput source="name" />
        <TextInput source="email" />
      </SimpleForm>
    </Edit>
  );

  export const UnitCreate = (props) => (
    <Create {...props}>
      <SimpleForm validate={validateUnitForm} >
        <ReferenceInput label="District" source="districtId" reference="districts" allowEmpty >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="name" />
        <DepOnRefInput label="Zone" source="zoneId" reference="zones" dependsOn="districtId" allowEmpty>
          <SelectInput optionText="name" />
        </DepOnRefInput>
      </SimpleForm>
    </Create>
  );

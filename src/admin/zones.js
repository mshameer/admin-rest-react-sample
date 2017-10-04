import React from 'react';
import { List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'admin-on-rest';

export const ZoneList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField label="Name" source="name" />
      <ReferenceField label="District" source="districtId" reference="districts" >
        <TextField source="name" />
      </ReferenceField>
      <TextField label="Email" source="email" />
      <EditButton />
    </Datagrid>
  </List>
);

const ZoneTitle = ({ record }) => {
  return <span>Zone {record ? `"${record.name}"` : ''}</span>;
  };

  const validateZoneForm = (values) => {
    const errors = {};
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (!values.name) {
      errors.name = ['Zone name is required'];
    }
    if (values.email && !reg.test(values.email)){
      errors.email = ['Invalid email address'];
    }

    return errors
  };

  export const ZoneEdit = (props) => (
    <Edit title={<ZoneTitle />} {...props}>
      <SimpleForm validate={validateZoneForm} >
        <ReferenceInput label="District" source="districtId" reference="districts" >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="name" />
        <TextInput source="email" />
      </SimpleForm>
    </Edit>
  );

  export const ZoneCreate = (props) => (
    <Create {...props}>
      <SimpleForm validate={validateZoneForm} >
        <ReferenceInput label="District" source="districtId" reference="districts" allowEmpty >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="name" />
        <TextInput source="email" />
      </SimpleForm>  
    </Create>
  );

import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, SimpleForm, TextInput, Responsive, SimpleList  } from 'admin-on-rest';

export const DistrictList = (props) => (
  <List {...props}>
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.name}
          tertiaryText={record => record.email}
          secondaryText={record => record.code}
          />
      }
      medium={
        <Datagrid>
          <TextField label="Name" source="name" />
          <TextField label="Email" source="email" />
          <TextField label="Code" source="code" />
          <EditButton />
        </Datagrid>
      }
      />
  </List>
);

const DistrictTitle = ({ record }) => {
  return <span>District {record ? `"${record.name}"` : ''}</span>;
  };

  const validateDistrictForm = (values) => {
    const errors = {};
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (!values.name) {
      errors.name = ['District name is required'];
    }
    if (values.email && !reg.test(values.email)){
      errors.email = ['Invalid email address'];
    }

    return errors
  };

  export const DistrictEdit = (props) => (
    <Edit title={<DistrictTitle />} {...props}>
      <SimpleForm validate={validateDistrictForm} redirect="/districts" >
        <TextInput source="name" fullWidth />
        <TextInput source="email" />
        <TextInput source="code" />
      </SimpleForm>
    </Edit>
  );

  export const DistrictCreate = (props) => (
    <Create {...props}>
      <SimpleForm validate={validateDistrictForm} redirect="/districts" >
        <TextInput source="name" />
        <TextInput source="email" />
        <TextInput source="code" />
      </SimpleForm>
    </Create>
  );

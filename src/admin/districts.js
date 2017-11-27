import React from 'react';
import { Datagrid, TextField, EditButton, SimpleForm, TextInput, Responsive  } from 'admin-on-rest';
import SimpleList from '../mui/list/simpleList'
import List from '../mui/list';
import Create from '../mui/detail/create';
import Edit from '../mui/detail/edit';
import Business from 'material-ui/svg-icons/communication/business';
import Avatar from 'material-ui/Avatar';

export const DistrictList = (props) => (
  <List {...props} title="Districts">
    <Responsive
      small={
        <SimpleList leftAvatar={record => <Avatar icon={<Business />} />} >
          <TextField label="Name" source="name" type="primary" />
          <TextField label="Email" source="email" type="secondary" />
        </SimpleList>
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

import React from 'react';
import { Edit, Create, Datagrid, TextField, EditButton, SimpleForm, TextInput, Responsive } from 'admin-on-rest';
import Layers from 'material-ui/svg-icons/maps/layers';
import List from '../mui/list';
import SimpleList from '../mui/list/simpleList';
import Avatar from 'material-ui/Avatar';

export const CategoryList = (props) => (
  <List {...props} title="Categories">
    <Responsive
      small={
        <SimpleList leftAvatar={record => <Avatar icon={<Layers />} />} >
          <TextField label="Name" source="name" type="primary" />
          <TextField label="Email" source="shortName" type="secondary" />
        </SimpleList>
      }
      medium={
        <Datagrid>
          <TextField label="Name" source="name" />
          <TextField label="Short Name" source="shortName" />
          <EditButton />
        </Datagrid>
      }
      />
  </List>
);

const CategoryTitle = ({ record }) => {
  return <span>Category {record ? `"${record.name}"` : ''}</span>;
  };

  const validateCategoryForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = ['Name is required'];
    }
    return errors
  };

  export const CategoryEdit = (props) => (
    <Edit title={<CategoryTitle />} {...props}>
      <SimpleForm validate={validateCategoryForm} redirect="/categories" >
        <TextInput label="Name" source="name" />
        <TextInput label="Short Name" source="shortName" />
      </SimpleForm>
    </Edit>
  );

  export const CategoryCreate = (props) => (
    <Create {...props}>
      <SimpleForm validate={validateCategoryForm} redirect="/categories" >
        <TextInput label="Name" source="name" />
        <TextInput label="Short Name" source="shortName" />
      </SimpleForm>
    </Create>
  );

import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, SimpleForm, TextInput, Responsive, SimpleList  } from 'admin-on-rest';

export const CategoryList = (props) => (
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

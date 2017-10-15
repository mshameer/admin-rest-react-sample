import React from 'react';
import { Edit, Create, Datagrid, ReferenceField, TextField, Responsive,
  EditButton, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'admin-on-rest';
import SimpleList from '../mui/list/simpleList'
import List from '../mui/list';
import Avatar from 'material-ui/Avatar';
import Snooze from 'material-ui/svg-icons/av/snooze';

export const ZoneList = (props) => (
  <List {...props}>
    <Responsive
      small={
        <SimpleList
          secondaryText="Dist: "
          leftAvatar={record => <Avatar icon={<Snooze />} />}
        >
          <TextField label="Name" source="name" type="primary" />
          <ReferenceField label="District" source="districtId" reference="districts" type="secondary" linkType="none" >
            <TextField source="name" />
          </ReferenceField>
        </SimpleList>
      }
      medium={
        <Datagrid>
          <TextField label="Name" source="name" />
          <ReferenceField label="District" source="districtId" reference="districts" >
            <TextField source="name" />
          </ReferenceField>
          <TextField label="Email" source="email" />
          <EditButton />
        </Datagrid>
      }
      />
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

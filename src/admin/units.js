import React from 'react';
import { Datagrid, ReferenceField, TextField, EditButton,
  ReferenceInput, SelectInput, SimpleForm, TextInput, Responsive } from 'admin-on-rest';
import DepOnRefInput from '../mui/form/depOnRefInput';
import SimpleList from '../mui/list/simpleList'
import List from '../mui/list';
import Create from '../mui/detail/create';
import Edit from '../mui/detail/edit';
import Nature from 'material-ui/svg-icons/image/nature';
import Avatar from 'material-ui/Avatar';

export const UnitList = (props) => (
  <List {...props}>
    <Responsive
      small={
        <SimpleList
          secondaryText="Dist: "
          secondaryPlusText="Zone: "
          leftAvatar={record => <Avatar icon={<Nature />} />}
        >
          <TextField label="Name" source="name" type="primary"/>
          <ReferenceField label="District" source="districtId" reference="districts" type="secondary" linkType="none" >
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField  label="Zone" source="zoneId" reference="zones" type='secondaryPlus' linkType="none" >
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
          <ReferenceField  label="Zone" source="zoneId" reference="zones" >
            <TextField source="name" />
          </ReferenceField>
          <TextField label="Email" source="email" />
          <EditButton />
        </Datagrid>
      }
      />
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
      { role =>
        <SimpleForm validate={validateUnitForm} >
            <TextInput source="name" />
            <ReferenceInput label="District" source="districtId" reference="districts" allowEmpty >
              <SelectInput optionText="name" />
            </ReferenceInput>
            <DepOnRefInput label="Zone" source="zoneId" reference="zones" dependsOn="districtId" allowEmpty>
              <SelectInput optionText="name" />
            </DepOnRefInput>
        </SimpleForm>
      }
    </Create>
  );

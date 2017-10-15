import React from 'react';
import { Edit, Create, Datagrid, TextField, Responsive, SelectArrayInput, ReferenceArrayInput, ReferenceArrayField,
  EditButton, ChipField, SingleFieldList, SimpleForm, TextInput } from 'admin-on-rest';
import SimpleList from '../mui/list/simpleList'
import List from '../mui/list';
import Avatar from 'material-ui/Avatar';
import Carousel from 'material-ui/svg-icons/action/view-carousel';
import { getCurrentUser} from '../utils/permissions';

const currentUser = getCurrentUser();

export const TeamList = (props) => (
  <List {...props}>
    <Responsive
      small={
        <SimpleList leftAvatar={record => <Avatar icon={<Carousel />} />} secondaryStyle={{height: 35}} >
          <TextField label="Team Name" source="name"  type="primary" />
          <ReferenceArrayField label="Members" reference="users" source="teamMembers" type="secondary" resource="users">
            <SingleFieldList  >
                <ChipField source="displayName" />
            </SingleFieldList>
          </ReferenceArrayField>
        </SimpleList>
      }
      medium={
        <Datagrid>
          <TextField label="Team Name" source="name" />
          <ReferenceArrayField label="Members" reference="users" source="teamMembers">
              <SingleFieldList>
                  <ChipField source="displayName" />
              </SingleFieldList>
            </ReferenceArrayField>
          <EditButton />
        </Datagrid>
      }
      />
  </List>
);

const TeamTitle = ({ record }) => {
  return <span>Team {record ? `"${record.name}"` : ''}</span>;
  };

  const validateTeamForm = (values) => {
    const errors = {};
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (!values.name) {
      errors.name = ['Team name is required'];
    }
    if (values.email && !reg.test(values.email)){
      errors.email = ['Invalid email address'];
    }

    return errors
  };

  export const TeamEdit = (props) => (
    <Edit title={<TeamTitle />} {...props}>
      <SimpleForm validate={validateTeamForm} >
        <ReferenceArrayInput source="teamMembers" reference="users" label="Team Members" allowEmpty>
          <SelectArrayInput optionText="displayName" />
        </ReferenceArrayInput>
        <TextInput label="Team Name" source="name" />
      </SimpleForm>
    </Edit>
  );

  export const TeamCreate = (props) => (
    <Create {...props}>
      <SimpleForm validate={validateTeamForm} >
        <ReferenceArrayInput source="teamMembers" reference="users"
            label="Team Members" allowEmpty filter={{unitId: currentUser.unitId}}>
          <SelectArrayInput optionText="displayName" />
        </ReferenceArrayInput>
        <TextInput label="Team Name" source="name" />
      </SimpleForm>
    </Create>
  );

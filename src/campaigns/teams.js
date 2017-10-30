import React from 'react';
import { Datagrid, TextField, Responsive, SelectArrayInput, ReferenceArrayInput, ReferenceArrayField,
  EditButton, ChipField, SingleFieldList, SimpleForm, TextInput } from 'admin-on-rest';
import SimpleList from '../mui/list/simpleList'
import List from '../mui/list';
import Create from '../mui/detail/create';
import Edit from '../mui/detail/edit';
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
  if (!values.name) {
    errors.name = ['Team name is required'];
  }
  if (!values.teamMembers) {
    errors.teamMembers = ['Team members is required'];
  }
  return errors
};

export const TeamEdit = (props) => (
  <Edit title={<TeamTitle />} {...props}>
    <SimpleForm validate={validateTeamForm} >
      <ReferenceArrayInput source="teamMembers" reference="users" label="Team Members" allowEmpty >
        <SelectArrayInput optionText="displayName" options={{ fullWidth: true }} />
      </ReferenceArrayInput>
      <TextInput label="Team Name" source="name" options={{ fullWidth: true }} />
    </SimpleForm>
  </Edit>
);

export const TeamCreate = (props) => (
  <Create {...props}>
    <SimpleForm validate={validateTeamForm} >
      <ReferenceArrayInput source="teamMembers" reference="users"
          label="Team Members" allowEmpty filter={{unitId: currentUser.unitId}}>
        <SelectArrayInput optionText="displayName" options={{ fullWidth: true }} />
      </ReferenceArrayInput>
      <TextInput label="Team Name" source="name"  options={{ fullWidth: true }}/>
    </SimpleForm>
  </Create>
);

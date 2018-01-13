import React from 'react';
import { Datagrid, TextField, Responsive, CheckboxGroupInput, ReferenceInput, ReferenceArrayField,
  EditButton, ChipField, SingleFieldList, SimpleForm, TextInput, translate } from 'admin-on-rest';
import SimpleList from '../mui/list/simpleList'
import List from '../mui/list';
import Create from '../mui/detail/create';
import Edit from '../mui/detail/edit';
import Avatar from 'material-ui/Avatar';
import Carousel from 'material-ui/svg-icons/action/view-carousel';
import { getCurrentUser} from '../utils/permissions';

const currentUser = getCurrentUser();

export const TeamList = translate(({ translate, ...props }) => (
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
          <TextField label={translate('team.team_name')} source="name" />
          <ReferenceArrayField label={translate('resources.members')} reference="users" source="teamMembers">
              <SingleFieldList>
                  <ChipField source="displayName" />
              </SingleFieldList>
            </ReferenceArrayField>
          <EditButton />
        </Datagrid>
      }
      />
  </List>
));

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

const teamForm = (translate) => (
  <SimpleForm validate={validateTeamForm} >
    <TextInput label={translate('team.form_name')} source="name" options={{ fullWidth: true }} />
    <ReferenceInput source="teamMembers" reference="users" label={translate('resources.members')} allowEmpty filter={{ unitId: currentUser.unitId }} >
      <CheckboxGroupInput  optionText="displayName"  />
    </ReferenceInput>
    <TextField source="unitId" style={{ display: 'none'}} defaultValue={currentUser.unitId} />
  </SimpleForm>
)

export const TeamEdit = translate(({ translate, ...props }) => (
  <Edit title={<TeamTitle />} {...props} backTitle={translate('resources.campaigns')}>
    { teamForm(translate) }
  </Edit>
));

export const TeamCreate = translate(({ translate, ...props }) => (
  <Create {...props} backTitle={translate('resources.campaigns')}>
    { teamForm(translate) }
  </Create>
));

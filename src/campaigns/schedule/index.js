import React from 'react';
import { Datagrid, ReferenceField, TextField, Responsive, FormTab,
  EditButton, ReferenceInput, SelectInput, SimpleShowLayout, translate } from 'admin-on-rest';
import SimpleList from '../../mui/list/simpleList'
import List from '../../mui/list';
import Create from '../../mui/detail/create';
import TabbedForm from '../../mui/form/tabbedForm';
import Edit from '../../mui/detail/edit';
import Avatar from 'material-ui/Avatar';
import Update from 'material-ui/svg-icons/action/update';
import Show from '../../mui/detail/show';
import { getCurrentUser} from '../../utils/permissions';
import GroupInput from '../../mui/form/groupInput';

const currentUser = getCurrentUser();
export const ScheduleList = translate(({ translate, ...props }) => (
  <List {...props} title={translate('resources.schedule')}>
    <Responsive
      small={
        <SimpleList leftAvatar={record => <Avatar icon={<Update />} />} >
          <ReferenceField label="Campaign" source="campaignId" reference="campaigns" type="primary" linkType="none" >
            <TextField source="title" />
          </ReferenceField>
          <ReferenceField label="Team" source="teamId" reference="teams" type="secondary" linkType="none" >
            <TextField source="name" />
          </ReferenceField>
        </SimpleList>
      }
      medium={
        <Datagrid>
          <ReferenceField label={translate('common.campaign')} source="campaignId" reference="campaigns" >
            <TextField source="title" />
          </ReferenceField>
          <ReferenceField label={translate('common.team')} source="teamId" reference="teams" >
            <TextField source="name" />
          </ReferenceField>
          <EditButton />
        </Datagrid>
      }
      />
  </List>
));

export const ScheduleShow = translate(({ translate, ...props }) => (
    <Show {...props}>
        <SimpleShowLayout>
          <ReferenceField label={translate('common.campaign')} source="campaignId" reference="campaigns" type="primary" linkType="none" >
            <TextField source="title" />
          </ReferenceField>
          <ReferenceField label={translate('common.team')} source="teamId" reference="teams" type="secondary" linkType="none" >
            <TextField source="name" />
          </ReferenceField>
        </SimpleShowLayout>
    </Show>
));

  const validateScheduleForm = (values) => {
    const errors = {};
    if (!values.campaignId) {
      errors.campaignId = ['Schedule is required'];
    }
    if (!values.teamId) {
      errors.teamId = ['Team is required'];
    }
    return errors
  };

  const getScheduleForm = (translate) => (
    <TabbedForm validate={validateScheduleForm} >
      <FormTab label={translate('schedule.name')} >
        <ReferenceInput label={translate('common.campaign')} source="campaignId" reference="campaigns" allowEmpty >
          <SelectInput optionText="title" options={{ fullWidth: true }} />
        </ReferenceInput>
        <ReferenceInput label={translate('schedule.team')} source="teamId" reference="teams" allowEmpty  filter={{ unitId: currentUser.unitId }}>
          <SelectInput optionText="name"  options={{ fullWidth: true }} />
        </ReferenceInput>
      </FormTab>
      <FormTab label={translate('schedule.guests')}>
        <ReferenceInput label={translate('schedule.guest_title')} source="guestIds" reference="guests" allowEmpty
          sort={{ field: 'name', order: 'ASC' }}
          filter={{ not: { status:['completed'] }, unitId: currentUser.unitId }}
          >
          <GroupInput source="name"  optionText="name"  disabled={(record) => record.status !== 'notScheduled' } secondary="phoneNo"  />
        </ReferenceInput>
        <TextField source="unitId" style={{ display: 'none'}} defaultValue={currentUser.unitId} />
      </FormTab>
    </TabbedForm>
  )

  export const ScheduleEdit = translate(({ translate, ...props }) => (
    <Edit title="Edit Schedule" {...props} tab backTitle={translate('resources.campaigns')} >
      { getScheduleForm(translate) }
    </Edit>
  ));

  export const ScheduleCreate = translate(({ translate, ...props }) => (
    <Create {...props} tab backTitle={translate('resources.campaigns')}>
      { getScheduleForm(translate) }
    </Create>
  ));

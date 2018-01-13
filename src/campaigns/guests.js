import React from 'react';
import { Datagrid, TextField, Responsive, ReferenceField, SimpleShowLayout, ReferenceArrayField, SingleFieldList, ChipField,
  EditButton, SelectInput, TextInput, FormTab, CheckboxGroupInput, ReferenceInput, AutocompleteInput, SelectField, LongTextInput, translate } from 'admin-on-rest';
import AutoComplete from 'material-ui/AutoComplete';
import SimpleList from '../mui/list/simpleList'
import FlatButton from 'material-ui/FlatButton';
import List from '../mui/list';
import Create from '../mui/detail/create';
import Edit from '../mui/detail/edit';
import Show from '../mui/detail/show';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Actors from 'material-ui/svg-icons/av/recent-actors';
import Done from 'material-ui/svg-icons/action/done';
import { getCurrentUser} from '../utils/permissions';
import TabbedForm from '../mui/form/tabbedForm';
import { get, find } from 'lodash';
import { campaignStatus, actionChoices, occupationChoices, guestTypes, responseChoices, nextActionChoices } from '../utils/options';

const { unitId, zoneId, districtId } = getCurrentUser() || {};

export const GuestList = translate(({ translate, ...props }) => (
  <List {...props} title={translate('guests.title')} >
    <Responsive
      small={
        <SimpleList
          leftAvatar={record => <Avatar icon={<Actors />} />}
        >
          <TextField source="name" type="primary" />
          <TextField source="phoneNo" type="secondary" />
          <ReferenceField source="place" reference="places" type="secondary" linkType="none" >
            <TextField source="name" />
          </ReferenceField>
          <SelectField source="status" choices={campaignStatus} type="tertiary" optionText="name" />
        </SimpleList>
      }
      medium={
        <Datagrid>
          <TextField label={translate('common.name')} source="name" />
          <TextField label={translate('common.phoneNo')} source="phoneNo" />
          <ReferenceField label={translate('guests.place')} source="place" reference="places" linkType="none" >
            <TextField source="name" />
          </ReferenceField>
          <SelectField label={translate('guests.next_action')}  source="nextAction" choices={nextActionChoices}  />
          <ReferenceField label={translate('guests.referredBy')} source="referredBy" reference="users" >
            <TextField source="displayName" />
          </ReferenceField>
          <SelectField source="status" choices={campaignStatus} label={translate('guests.status')} />
          <EditButton />
        </Datagrid>
      }
      />
  </List>
));


const TextManyField = ({ source, record = {}, choices, label }) => {
  const items = get(record, source) || null;
  const chipItems =  items && items.map((itemId, key) => {
    const text = find(choices, {id: itemId});
    return text && (
      <Chip style={{margin: 4}} key={key}>
        <Avatar icon={<Done />} />
        {text.name}
      </Chip>);
  })
  return items && <div><h5>{label}</h5>{chipItems}</div>;
}

export const GuestShow = translate(({ translate, ...props }) => (
    <Show {...props}>
        <SimpleShowLayout>
          <TextField label={translate('common.name')} source="name" />
          <TextField label={translate('common.phoneNo')} source="phoneNo" />
          <ReferenceField label={translate('guests.place')} source="place" reference="places" linkType="none" >
            <TextField source="name" />
          </ReferenceField>
          <SelectField label={translate('guests.next_action')}  source="nextAction" choices={nextActionChoices}  />
          <ReferenceField label={translate('guests.referredBy')} source="referredBy" reference="users" linkType="none" >
            <TextField source="displayName" />
          </ReferenceField>
          <ReferenceField label={translate('resources.campaigns')} source="campaignId" reference="campaigns" linkType="none" >
            <TextField source="title" />
          </ReferenceField>
          <ReferenceArrayField label={translate('guests.visited_by')} source="teamMembers" reference="users">
            <SingleFieldList>
              <ChipField source="displayName" />
            </SingleFieldList>
          </ReferenceArrayField>
          <SelectField source="status" label={translate('guests.status')} choices={campaignStatus} />
          <TextField source="address" label={translate('common.address')} />
          <TextField source="age" label={translate('common.age')} />
          <SelectField source="occupation" label={translate('guests.work')} choices={occupationChoices} />
          <TextField source="institution"  label={translate('guests.institution')} />
          <TextField source="designation"  label={translate('guests.designation')} />
          <SelectField source="guestCategory" choices={guestTypes} label={translate('guests.category')} />
          <TextField source="other" label={translate('guests.other')} />
          <TextManyField source="actions" choices={actionChoices} label={translate('guests.actions')}/>
          <TextManyField source="responses" choices={responseChoices} label={translate('guests.responses')} />
          <TextField source="remark" label={translate('guests.remark')}  multiLine={true} rows={2}/>
        </SimpleShowLayout>
    </Show>
));

const GuestTitle = ({ record }) => {
  return <span>Guest {record ? `"${record.name}"` : ''}</span>;
  };

const validateGuestForm = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = ['Guest name is required'];
  }
  if (!values.place) {
    errors.place = ['Guest place is required'];
  }
  if (!values.referredBy) {
    errors.referredBy = ['Member referred by is required'];
  }
  if (!values.referredBy) {
    errors.referredBy = ['Member referred by is required'];
  }

  return errors
};


const getGuestForm = (translate) => (
  <TabbedForm validate={validateGuestForm} >
    <FormTab label={translate('guests.basic')} >
      <TextInput source="name" label={translate('common.name')}  options={{ fullWidth: true }} />
      <TextInput source="phoneNo" label={translate('common.phoneNo')} options={{ fullWidth: true }}/>
      <ReferenceInput label={translate('guests.place')} source="place" reference="places" filter={{ unitId }} allowEmpty style={{ display: 'inline-block', width: '55%' }} >
        <AutocompleteInput optionText="name"  options={{ fullWidth: true }} filter={AutoComplete.caseInsensitiveFilter} maxSearchResults={5}     />
      </ReferenceInput>
      <FlatButton
        href={`/#/places/create?backTo=${window.location.hash.replace('#/', '/')}`}
        label={translate('guests.newPlace')}
        primary
        style={{ display: 'inline-block', backgroundColor: '#eef7f6', marginLeft: 8 }}
      />
    <ReferenceInput label={translate('guests.referredBy')} source="referredBy" reference="users" filter={{ unitId }} allowEmpty >
        <SelectInput optionText="displayName"  options={{ fullWidth: true }}/>
      </ReferenceInput>
    </FormTab>
    <FormTab label={translate('guests.personal')} >
      <TextInput source="address" label={translate('common.address')} options={{ fullWidth: true }} />
      <TextInput source="age" label={translate('common.age')} options={{ fullWidth: true }} />
      <SelectInput source="occupation" label={translate('guests.work')} choices={occupationChoices} options={{ fullWidth: true }} />
      <TextInput source="institution"  label={translate('guests.institution')} options={{ fullWidth: true }} />
      <TextInput source="designation" label={translate('guests.designation')}  options={{ fullWidth: true }} />
      <SelectInput label={translate('guests.category')} choices={guestTypes} options={{ fullWidth: true }} />
      <TextInput source="other" label={translate('guests.reference')} options={{ fullWidth: true }} />
    </FormTab>
    <FormTab label={translate('guests.feedback')} >
      <CheckboxGroupInput source="actions" label={translate('guests.actions')} choices={actionChoices} optionText="name" optionValue="id" />
      <CheckboxGroupInput source="responses" label={translate('guests.responses')} choices={responseChoices} optionText="name" optionValue="id" />
      <SelectInput source="nextAction"  label={translate('guests.next_action')} choices={nextActionChoices} options={{ fullWidth: true }}  />
      <LongTextInput source="remark" label={translate('guests.remark')}  multiLine={true} rows={2}/>
      <SelectInput source="status" label={translate('guests.status')}  choices={campaignStatus} defaultValue="notScheduled"  options={{ fullWidth: true }}  />
      <TextField source="unitId" style={{ display: 'none'}} defaultValue={ unitId } />
      <TextField source="zoneId" style={{ display: 'none'}} defaultValue={ zoneId } />
      <TextField source="districtId" style={{ display: 'none'}} defaultValue={ districtId } />
    </FormTab>
  </TabbedForm>
);

export const GuestEdit = translate(({ translate, ...props }) => (
  <Edit title={<GuestTitle />} {...props} backTitle={translate('resources.guests')} tab  >
    { getGuestForm(translate) }
  </Edit>
));

export const GuestCreate = translate(({ translate, ...props }) => (
  <Create {...props}  backTitle={translate('resources.guests')} tab >
    { getGuestForm(translate) }
  </Create>
));

import React from 'react';
import { Datagrid, TextField, Responsive, ReferenceField, SimpleShowLayout, ReferenceArrayField, SingleFieldList, ChipField,
  EditButton, SelectInput, TextInput, FormTab, CheckboxGroupInput, ReferenceInput, AutocompleteInput, SelectField, LongTextInput  } from 'admin-on-rest';
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

const campaignStatus = [
  { id: 'notScheduled', name: 'Not Scheduled' },
  { id: 'scheduled', name: 'Scheduled' },
  { id: 'completed', name: 'Completed' },
];

const actionChoices = [
  { id: '1', name: 'Peace Radio Installation' },
  { id: '2', name: 'Nerpadham Indroduced' },
  { id: '3', name: 'Jeevitham Enthinu Vendi' },
  { id: '4', name: 'Kathorkkuka Srushttavinuvendi' },
  { id: '5', name: 'Quran Class Invited' },
]

const occupationChoices = [
  { id: 0, name: 'Driver' },
  { id: 1, name: 'Teacher' },
  { id: 2, name: 'Professor' },
  { id: 3, name: 'Gov. Employee' },
  { id: 4, name: 'Doctor' },
  { id: 5, name: 'Engineer' },
  { id: 5, name: 'Student' },
];

const guestTypes = [
  { id: 1, name: 'നിക്ഷ്പക്ഷൻ' },
  { id: 2, name: 'വിസ്‌ഡം അനുഭാവി' },
  { id: 3, name: 'മുജാഹിദ് (KNM)' },
  { id: 4, name: 'മുജാഹിദ് (മടവൂർ)' },
  { id: 5, name: 'മുജാഹിദ് (KNM) അനുഭാവി' },
  { id: 6, name: 'മുജാഹിദ് (മങ്കട/സകരിയ)' },
  { id: 7, name: 'ജമാത്തെ ഇസ്ലാമി' },
  { id: 8, name: 'തബ്‌ലീഗ് ജമാഅത്ത്' },
  { id: 9, name: 'സമസ്ത (AP)' },
  { id: 10, name: 'സമസ്ത (EK)' },
  { id: 11, name: 'സമസ്ത അനുഭാവി' },
  { id: 12, name: 'ഖാദിയാനി' },
  { id: 13, name: 'നിരീശ്വരവാദി' },
];

const responseChoices = [
  { id: '0', name: 'More materials Needed' },
  { id: '1', name: 'Nerpadham Subscription' },
  { id: '2', name: 'Interested in Dawa Activities' },
  { id:' 3', name: 'Counselling Needed' },
  { id: '4', name: 'Quran copy Needed' },
  { id:' 5', name: 'Help/Aid Needed' },
];

const nextActionChoices = [
  { id: 0, name: 'Visit Again' },
];

const { unitId, zoneId, districtId } = getCurrentUser() || {};

export const GuestList = (props) => (
  <List {...props} title="Guests">
    <Responsive
      small={
        <SimpleList
          leftAvatar={record => <Avatar icon={<Actors />} />}
        >
          <TextField source="name" type="primary" />
          <TextField source="phoneNo" type="secondary" />
          <ReferenceField label="Place" source="place" reference="places" type="secondary" linkType="none" >
            <TextField source="name" />
          </ReferenceField>
          <SelectField source="status" choices={campaignStatus} type="tertiary"  />
        </SimpleList>
      }
      medium={
        <Datagrid>
          <TextField label="Name" source="name" />
          <TextField label="Phone No" source="phoneNo" />
          <ReferenceField label="Place" source="place" reference="places" linkType="none" >
            <TextField source="name" />
          </ReferenceField>
          <SelectField label="Next Action"  source="nextAction" choices={nextActionChoices}  />
          <ReferenceField label="Referred by" source="referredBy" reference="users" >
            <TextField source="displayName" />
          </ReferenceField>
          <SelectField source="status" choices={campaignStatus} />
          <EditButton />
        </Datagrid>
      }
      />
  </List>
);

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

export const GuestShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
          <TextField label="Name" source="name" />
          <TextField label="Phone No" source="phoneNo" />
          <ReferenceField label="Place" source="place" reference="places" linkType="none" >
            <TextField source="name" />
          </ReferenceField>
          <SelectField label="Next Action"  source="nextAction" choices={nextActionChoices}  />
          <ReferenceField label="Referred by" source="referredBy" reference="users" linkType="none" >
            <TextField source="displayName" />
          </ReferenceField>
          <ReferenceField label="Campaign" source="campaignId" reference="campaigns" linkType="none" >
            <TextField source="title" />
          </ReferenceField>
          <ReferenceArrayField label="Visited By" source="teamMembers" reference="users">
            <SingleFieldList>
              <ChipField source="displayName" />
            </SingleFieldList>
          </ReferenceArrayField>
          <SelectField source="status" choices={campaignStatus} />
          <TextField source="address" />
          <TextField source="age"  />
          <SelectField source="occupation" choices={occupationChoices} />
          <TextField source="institution"  label="Institution (Work/Study)" />
          <TextField source="designation"  />
          <SelectField source="guestCategory" choices={guestTypes} />
          <TextField source="other" label="Other Reference Contacts" />
          <TextManyField source="actions" choices={actionChoices} label="Actions"/>
          <TextManyField source="responses" choices={responseChoices} label="Responses"/>
          <TextField source="remark" label="Remark/Notes"  multiLine={true} rows={2}/>
        </SimpleShowLayout>
    </Show>
);

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


const getGuestForm = () => (
  <TabbedForm validate={validateGuestForm} >
    <FormTab label="Guest" >
      <TextInput source="name"  options={{ fullWidth: true }} />
      <TextInput source="phoneNo" label="Phone No" options={{ fullWidth: true }}/>
      <ReferenceInput label="Place to identify" source="place" reference="places" filter={{ unitId }} allowEmpty style={{ display: 'inline-block', width: '55%' }} >
        <AutocompleteInput optionText="name"  options={{ fullWidth: true }} filter={AutoComplete.caseInsensitiveFilter} maxSearchResults={5}     />
      </ReferenceInput>
      <FlatButton
        href={`/#/places/create?backTo=${window.location.hash.replace('#/', '/')}`}
        label="Add Place"
        primary
        style={{ display: 'inline-block', backgroundColor: '#eef7f6', marginLeft: 8 }}
      />
      <ReferenceInput label="Member Referred by" source="referredBy" reference="users" filter={{ unitId }} allowEmpty >
        <SelectInput optionText="displayName"  options={{ fullWidth: true }}/>
      </ReferenceInput>
    </FormTab>
    <FormTab label="Personal">
      <TextInput source="address" options={{ fullWidth: true }} />
      <TextInput source="age"  options={{ fullWidth: true }} />
      <SelectInput source="occupation" choices={occupationChoices} options={{ fullWidth: true }} />
      <TextInput source="institution"  label="Institution (Work/Study)" options={{ fullWidth: true }} />
      <TextInput source="designation"  options={{ fullWidth: true }} />
      <SelectInput source="Guest Category" choices={guestTypes} options={{ fullWidth: true }} />
      <TextInput source="other" label="Other Reference Contacts" options={{ fullWidth: true }} />
    </FormTab>
    <FormTab label="FeedBack">
      <CheckboxGroupInput source="actions" choices={actionChoices} optionText="name" optionValue="id" />
      <CheckboxGroupInput source="responses" choices={responseChoices} optionText="name" optionValue="id" />
      <SelectInput source="nextAction"  label="Next Action" choices={nextActionChoices} options={{ fullWidth: true }}  />
      <LongTextInput source="remark" label="Remark/Notes"  multiLine={true} rows={2}/>
      <SelectInput source="status" choices={campaignStatus} defaultValue="notScheduled"  options={{ fullWidth: true }}  />
      <TextField source="unitId" style={{ display: 'none'}} defaultValue={ unitId } />
      <TextField source="zoneId" style={{ display: 'none'}} defaultValue={ zoneId } />
      <TextField source="districtId" style={{ display: 'none'}} defaultValue={ districtId } />
    </FormTab>
  </TabbedForm>
)

export const GuestEdit = (props) => (
  <Edit title={<GuestTitle />} {...props} tab >
    { getGuestForm() }
  </Edit>
);

export const GuestCreate = (props) => (
  <Create {...props} tab >
    { getGuestForm() }
  </Create>
);

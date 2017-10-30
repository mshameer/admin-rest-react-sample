import React from 'react';
import { Datagrid, TextField, Responsive, ReferenceField,
  EditButton, SelectInput, TextInput, FormTab, CheckboxGroupInput, ReferenceInput, AutocompleteInput, SelectField  } from 'admin-on-rest';
import SimpleList from '../mui/list/simpleList'
import List from '../mui/list';
import Create from '../mui/detail/create';
import Edit from '../mui/detail/edit';
import Avatar from 'material-ui/Avatar';
import Actors from 'material-ui/svg-icons/av/recent-actors';
import { getCurrentUser} from '../utils/permissions';
import TabbedForm from '../mui/form/tabbedForm';

const campaignStatus = [
  { id: 'notStarted', name: 'Not Started' },
  { id: 'inProgress', name: 'In Progress' },
  { id: 'completed', name: 'Completed' },
];

const actionChoices = [
  { id: '1', name: 'Peace Radio Installation' },
  { id: '2', name: 'Nerpadham Indroduced' },
  { id: '3', name: 'Jeevitham Enthinu Vendi' },
  { id: '4', name: 'Kathorkkuka Srushttavinuvendi' },
  { id: '5', name: 'Quran Class Invited' },
]

const placeChoices = [
  { id: 1, name: 'Karikode' },
  { id: 2, name: 'Chanthanathuthope' },
  { id: 3, name: 'Mamoodu' },
  { id: 4, name: 'Kadappakkada' },
  { id: 5, name: 'Kadamukku' },
];

const occupationChoices = [
  { id: 0, name: 'Driver' },
  { id: 1, name: 'Teacher' },
  { id: 2, name: 'Professor' },
  { id: 3, name: 'Gov. Employee' },
  { id: 4, name: 'Doctor' },
  { id: 5, name: 'Engineer' },
];

const responseChoices = [
  { id: 0, name: 'More materials Needed' },
  { id: 1, name: 'Nerpadham Subscription' },
  { id: 2, name: 'Interested in Dawa Activities' },
  { id: 3, name: 'Counselling Needed' },
  { id: 4, name: 'Quran copy Needed' },
  { id: 5, name: 'Help/Aid Needed' },
];

const nextActionChoices = [
  { id: 0, name: 'Visit Again' },
];

const currentUser = getCurrentUser();

export const GuestList = (props) => (
  <List {...props} title="Guests">
    <Responsive
      small={
        <SimpleList
          leftAvatar={record => <Avatar icon={<Actors />} />}
        >
          <TextField source="name" type="primary" />
          <TextField source="phoneNo" type="secondary" />
          <SelectField source="place" choices={placeChoices} type="secondaryPlus"  />
          <SelectField source="status" choices={campaignStatus} type="tertiary"  />
        </SimpleList>
      }
      medium={
        <Datagrid>
          <TextField label="Name" source="name" />
          <TextField label="Phone No" source="phoneNo" />
          <SelectField source="place" choices={placeChoices} label="Place"  />
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

const GuestTitle = ({ record }) => {
  return <span>Guest {record ? `"${record.name}"` : ''}</span>;
  };

const validateGuestForm = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = ['Guest title is required'];
  }

  return errors
};

const autoCompleteFilter = (searchText, key) => {
  return searchText && key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
};

const getGuestForm = () => (
  <TabbedForm validate={validateGuestForm} >
    <FormTab label="Guest" >
      <TextInput source="name"  options={{ fullWidth: true }} />
      <TextInput source="phoneNo" label="Phone No" options={{ fullWidth: true }}/>
      <TextInput source="address" options={{ fullWidth: true }} />
      <AutocompleteInput source="place" choices={placeChoices}
        optionText="name" optionValue="id" label="Place to identify" filter={autoCompleteFilter} options={{ fullWidth: true }} />
      <TextInput source="age"  options={{ fullWidth: true }} />
      <ReferenceInput label="Member Referred by" source="referredBy" reference="users" filter={{ unitId: currentUser.unitId }} allowEmpty >
        <SelectInput optionText="displayName"  options={{ fullWidth: true }}/>
      </ReferenceInput>
      <SelectInput source="occupation" choices={occupationChoices} options={{ fullWidth: true }} />
    </FormTab>
    <FormTab label="Family">
      <TextInput source="details" label="Details" />
      <TextInput source="other" label="Other Reference" />
    </FormTab>
    <FormTab label="FeedBack">
      <CheckboxGroupInput source="actions" choices={actionChoices} optionText="name" optionValue="id" />
      <CheckboxGroupInput source="responses" choices={responseChoices} optionText="name" optionValue="id" />
      <SelectInput source="nextAction"  label="Next Action" choices={nextActionChoices} />
      <TextInput source="notes" label="Notes if any" />
      <SelectInput source="status" choices={campaignStatus} defaultValue="completed"  />
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

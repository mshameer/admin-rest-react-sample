import React from 'react';
import { Edit, Create, Datagrid, TextField, Responsive, TabbedForm, ReferenceField,
  EditButton, SelectInput, TextInput, FormTab, CheckboxGroupInput, ReferenceInput, AutocompleteInput, SelectField  } from 'admin-on-rest';
import SimpleList from '../mui/list/simpleList'
import List from '../mui/list';
import Avatar from 'material-ui/Avatar';
import Actors from 'material-ui/svg-icons/av/recent-actors';
import { getCurrentUser} from '../utils/permissions';

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

const GuestList = (props) => (
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
          <SelectField source="status" choices={campaignStatus}  />
          <EditButton />
        </Datagrid>
      }
      />
  </List>
);

export const Details = (props) => <GuestList resource="guests" {...props} />

import React, { createElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Datagrid, TextField, Responsive, ReferenceArrayField, ReferenceField,
  EditButton, ChipField, SingleFieldList, SimpleForm, SelectField } from 'admin-on-rest';
import Actors from 'material-ui/svg-icons/av/recent-actors';
import SimpleList from '../mui/list/simpleList'
import Avatar from 'material-ui/Avatar';
import Carousel from 'material-ui/svg-icons/action/view-carousel';
import Update from 'material-ui/svg-icons/action/update';
import Restricted from 'admin-on-rest/lib/auth/Restricted';
import TabbedList from '../mui/list/tabbedList';
import TabList from '../mui/list/tabList';

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

const CampaignDetails = (props) => (
  <TabbedList {...props}  title="Campaign">
    <TabList resource="guests" title="Guests" basePath="guests">
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
    </TabList>
    <TabList resource="teams" title="Teams" basePath="teams">
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
    </TabList>
    <TabList resource="schedule" title="Schedule" basePath="schedule">
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
            <ReferenceField label="Campaign" source="campaignId" reference="campaigns" >
              <TextField source="title" />
            </ReferenceField>
            <ReferenceField label="Team" source="teamId" reference="teams" >
              <TextField source="name" />
            </ReferenceField>
            <EditButton />
          </Datagrid>
        }
        />
    </TabList>
  </TabbedList>
)

const restrictPage = (component, route) => {
  const commonProps = {
      hasList: true,
      hasEdit: true,
      hasShow: true,
      hasCreate: true,
      hasDelete: true,
  };

    const RestrictedPage = routeProps => (
        <Restricted authParams={{ route }} {...routeProps}>
            {createElement(component, {
                ...commonProps,
                ...routeProps,
            })}
        </Restricted>
    );
    return RestrictedPage;
};

const Details = () => (
  <Switch>
    <Route
        exact
        path={`/campaigns-details`}
        render={restrictPage(CampaignDetails, 'list')}
    />
  </Switch>
)

export default Details;

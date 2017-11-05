import React, { createElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Datagrid, TextField, Responsive, ReferenceArrayField, ReferenceField,
  EditButton, ChipField, SingleFieldList, SelectField } from 'admin-on-rest';
import Actors from 'material-ui/svg-icons/av/recent-actors';
import SimpleList from '../mui/list/simpleList'
import Avatar from 'material-ui/Avatar';
import Carousel from 'material-ui/svg-icons/action/view-carousel';
import Update from 'material-ui/svg-icons/action/update';
import Restricted from 'admin-on-rest/lib/auth/Restricted';
import { getCurrentUser} from '../utils/permissions';
import TabbedList from '../mui/list/tabbedList';
import TabList from '../mui/list/tabList';

const campaignStatus = [
  { id: 'notScheduled', name: 'Not Scheduled' },
  { id: 'scheduled', name: 'Scheduled' },
  { id: 'completed', name: 'Completed' },
];

const nextActionChoices = [
  { id: 0, name: 'Visit Again' },
];

const currentUser = getCurrentUser();

const CampaignDetails = (props) => (
  <TabbedList {...props}  title="Campaign">
    <TabList resource="guests" title="Guests" basePath="guests"  filter={{ unitId: currentUser.unitId }} sort={{ field: 'created_at', order: 'DESC' }} >
      <Responsive
        small={
          <SimpleList
            leftAvatar={record => <Avatar icon={<Actors />} />}
            orView={ record => record.status === 'completed' }
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
            <ReferenceField label="Unit" source="unitId" reference="units" type="secondary" linkType="none" >
              <TextField source="name" />
            </ReferenceField>
            <SelectField label="Next Action"  source="nextAction" choices={nextActionChoices}  />
            <ReferenceField label="Place" source="place" reference="places" type="secondary" linkType="none" >
              <TextField source="name" />
            </ReferenceField>
            <SelectField source="status" choices={campaignStatus}  />
            <EditButton />
          </Datagrid>
        }
        />
    </TabList>
    <TabList resource="schedule" title="Schedule" basePath="schedule" filter={{ unitId: currentUser.unitId }}>
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
    <TabList resource="teams" title="Teams" basePath="teams" filter={{ unitId: currentUser.unitId }}>
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
        path={`/`}
        render={restrictPage(CampaignDetails, 'list')}
    />
    <Route
        exact
        path={`/campaigns-details`}
        render={restrictPage(CampaignDetails, 'list')}
    />
  </Switch>
)

export default Details;

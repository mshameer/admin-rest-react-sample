import React, { createElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Datagrid, TextField, Responsive, ReferenceArrayField, ReferenceField,
  EditButton, ChipField, SingleFieldList, SelectField, translate } from 'admin-on-rest';
import Actors from 'material-ui/svg-icons/av/recent-actors';
import SimpleList from '../mui/list/simpleList'
import Avatar from 'material-ui/Avatar';
import Carousel from 'material-ui/svg-icons/action/view-carousel';
import Update from 'material-ui/svg-icons/action/update';
import Restricted from 'admin-on-rest/lib/auth/Restricted';
import { getCurrentUser} from '../utils/permissions';
import TabbedList from '../mui/list/tabbedList';
import TabList from '../mui/list/tabList';

import { campaignStatus, nextActionChoices } from '../utils/options';

const currentUser = getCurrentUser();

const CampaignDetails = translate(({ translate, ...others } ) => (
  <TabbedList {...others}  title={translate('campaigns.title')}>
    <TabList resource="guests" title={translate('resources.guests')} basePath="guests"  filter={{ unitId: currentUser.unitId }} sort={{ field: 'created_at', order: 'DESC' }} >
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
            <TextField label={translate('common.name')} source="name" />
            <TextField label={translate('common.phoneNo')} source="phoneNo" />
            <ReferenceField label={translate('common.unit')} source="unitId" reference="units" type="secondary" linkType="none" >
              <TextField source="name" />
            </ReferenceField>
            <SelectField label={translate('guests.next_action')}  source="nextAction" choices={nextActionChoices}  />
            <ReferenceField label={translate('guests.place')} source="place" reference="places" type="secondary" linkType="none" >
              <TextField source="name" />
            </ReferenceField>
            <SelectField label={translate('guests.status')} choices={campaignStatus} optionText="name" />
            <EditButton />
          </Datagrid>
        }
        />
    </TabList>
    <TabList resource="schedule" title={translate('resources.schedules')} basePath="schedule" filter={{ unitId: currentUser.unitId }}>
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
    </TabList>
    <TabList resource="teams" title={translate('resources.teams')} basePath="teams" filter={{ unitId: currentUser.unitId }}>
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
    </TabList>
  </TabbedList>
))

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

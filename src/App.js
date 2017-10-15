import React from 'react';
import { Admin, Resource, Delete } from 'admin-on-rest';

import { DistrictList, DistrictEdit, DistrictCreate } from './admin/districts';
import { ZoneList, ZoneEdit, ZoneCreate } from './admin/zones';
import { UnitList, UnitEdit, UnitCreate } from './admin/units';
import { UserList, UserEdit, UserCreate } from './admin/users';
import { CategoryList, CategoryEdit, CategoryCreate } from './admin/categories';
import { CampaignList, CampaignEdit, CampaignCreate } from './campaigns';
import { GuestList, GuestEdit, GuestCreate } from './campaigns/guests';
import { ScheduleList, ScheduleEdit, ScheduleCreate } from './campaigns/schedule';
import { TeamList, TeamEdit, TeamCreate } from './campaigns/teams';
import { RestClient, AuthClient } from './utils/firebase-client';
import appReducers from './reducers';
import appSagas from './sagas';
import Login from './auth/Login';
import Menu from './mui/layout/menu';
import AppLayout from './mui/layout/appLayout.js';
import firebaseConfig from './config/firebase';

const trackedResources = ['districts', 'zones', 'units', 'users', 'categories', 'campaigns', 'guests', 'teams', 'schedule'];

const App = () => (
    <Admin
      restClient={RestClient(trackedResources, firebaseConfig)}
      authClient={AuthClient}
      appLayout={AppLayout}
      loginPage={Login}
      menu={Menu}
      title="Souhrda Hastham"
      customReducers={{ ...appReducers }}
      customSagas={[ ...appSagas ]}
    >
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />
      <Resource name="districts" list={DistrictList} edit={DistrictEdit} create={DistrictCreate} remove={Delete} />
      <Resource name="zones" list={ZoneList} edit={ZoneEdit} create={ZoneCreate} remove={Delete} />
      <Resource name="units" list={UnitList} edit={UnitEdit} create={UnitCreate} remove={Delete} />
      <Resource name="categories" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} remove={Delete} />
      <Resource name="campaigns" list={CampaignList} edit={CampaignEdit} create={CampaignCreate} remove={Delete} />
      <Resource name="guests" list={GuestList} edit={GuestEdit} create={GuestCreate} remove={Delete} />
      <Resource name="teams" list={TeamList} edit={TeamEdit} create={TeamCreate} remove={Delete} />
      <Resource name="schedule" list={ScheduleList} edit={ScheduleEdit} create={ScheduleCreate} remove={Delete} />
    </Admin>
);

export default App;
// https://github.com/firebase/functions-samples
// https://console.firebase.google.com/project/souhrda-hastham/settings/serviceaccounts/adminsdk

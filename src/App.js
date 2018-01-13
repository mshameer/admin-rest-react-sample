import React from 'react';
import { Admin, Resource } from 'admin-on-rest';

import { DistrictList, DistrictEdit, DistrictCreate } from './admin/districts';
import { ZoneList, ZoneEdit, ZoneCreate } from './admin/zones';
import { UnitList, UnitEdit, UnitCreate } from './admin/units';
import { UserList, UserEdit, UserCreate } from './admin/users';
import { CategoryList, CategoryEdit, CategoryCreate } from './admin/categories';
import { CampaignList, CampaignEdit, CampaignCreate } from './campaigns';
import { GuestList, GuestEdit, GuestCreate, GuestShow } from './campaigns/guests';
import { ScheduleList, ScheduleEdit, ScheduleCreate, ScheduleShow } from './campaigns/schedule/';
import { TeamList, TeamEdit, TeamCreate } from './campaigns/teams';
import { PlaceList, PlaceEdit, PlaceCreate } from './admin/places';
import { RestClient, AuthClient } from './utils/firebase-client';
import Delete from './mui/detail/delete';
import appReducers from './reducers';
import appSagas from './sagas';
import routes from './routes';
import Login from './auth/Login';
import Menu from './mui/layout/menu';
import AppLayout from './mui/layout/appLayout.js';
import firebaseConfig from './config/firebase';
import Home from './campaigns/dashboard/';
import malayalamMessages from './i18n/ml';
import englishMessages from './i18n/en';

const messages = {
    ml: malayalamMessages,
    en: englishMessages,
};

const trackedResources = [
  'districts',
  'zones',
  'units',
  'users',
  'categories',
  'campaigns',
  'guests',
  'teams',
  'schedule',
  'places',
];

export const envFb = process.env.REACT_APP_ENV || 'staging'

const App = () => (
    <Admin
      restClient={RestClient(trackedResources, firebaseConfig[envFb])}
      authClient={AuthClient}
      dashboard={Home}
      appLayout={AppLayout}
      loginPage={Login}
      menu={Menu}
      title="Souhrda Hastham"
      customReducers={{ ...appReducers }}
      customSagas={[ ...appSagas ]}
      customRoutes={routes}
      locale="ml"
      messages={messages}
    >
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />
      <Resource name="districts" list={DistrictList} edit={DistrictEdit} create={DistrictCreate} remove={Delete} />
      <Resource name="zones" list={ZoneList} edit={ZoneEdit} create={ZoneCreate} remove={Delete} />
      <Resource name="units" list={UnitList} edit={UnitEdit} create={UnitCreate} remove={Delete} />
      <Resource name="categories" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} remove={Delete} />
      <Resource name="campaigns" list={CampaignList} edit={CampaignEdit} create={CampaignCreate} remove={Delete} />
      <Resource name="guests" list={GuestList} edit={GuestEdit} create={GuestCreate} remove={Delete} show={GuestShow}/>
      <Resource name="teams" list={TeamList} edit={TeamEdit} create={TeamCreate} remove={Delete} />
      <Resource name="schedule" list={ScheduleList} edit={ScheduleEdit} create={ScheduleCreate} remove={Delete} show={ScheduleShow} />
      <Resource name="places" list={PlaceList} edit={PlaceEdit} create={PlaceCreate} remove={Delete} />
    </Admin>
);

export default App;
// https://github.com/firebase/functions-samples
// https://console.firebase.google.com/project/souhrda-hastham/settings/serviceaccounts/adminsdk
// https://firebase.googleblog.com/2016/07/deploy-to-multiple-environments-with.html

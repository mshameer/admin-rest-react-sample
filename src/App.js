import React from 'react';
import { Admin, Resource, Delete } from 'admin-on-rest';

import { DistrictList, DistrictEdit, DistrictCreate } from './admin/districts';
import { ZoneList, ZoneEdit, ZoneCreate } from './admin/zones';
import { UnitList, UnitEdit, UnitCreate } from './admin/units';
import { UserList, UserEdit, UserCreate } from './admin/users';
import { CategoryList, CategoryEdit, CategoryCreate } from './admin/categories';
import { RestClient, AuthClient } from './utils/firebase-client';
import appReducers from './reducers';
import appSagas from './sagas';
import Login from './auth/Login';
import Menu from './layout/menu';
import AppLayout from './layout/appLayout.js';
import firebaseConfig from './config/firebase';

const trackedResources = ['districts', 'zones', 'units', 'users', 'categories'];

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
      <Resource name="districts" list={DistrictList} edit={DistrictEdit} create={DistrictCreate} remove={Delete} />
      <Resource name="zones" list={ZoneList} edit={ZoneEdit} create={ZoneCreate} remove={Delete} />
      <Resource name="units" list={UnitList} edit={UnitEdit} create={UnitCreate} remove={Delete} />
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />
      <Resource name="categories" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} remove={Delete} />
    </Admin>
);

export default App;
// https://github.com/firebase/functions-samples
// https://console.firebase.google.com/project/souhrda-hastham/settings/serviceaccounts/adminsdk

import React from 'react';
import { Admin, Resource, Delete } from 'admin-on-rest';

import { DistrictList, DistrictEdit, DistrictCreate } from './admin/districts';
import { ZoneList, ZoneEdit, ZoneCreate } from './admin/zones';
import { UnitList, UnitEdit, UnitCreate } from './admin/units';
import { UserList, UserEdit, UserCreate } from './admin/users';
import { RestClient, AuthClient } from './utils/firebase-client';
import Login from './auth/Login';
import firebaseConfig from './config/firebase';

const trackedResources = ['districts', 'zones', 'units', 'users'];

const App = () => (
    <Admin
      restClient={RestClient(trackedResources, firebaseConfig)}
      authClient={AuthClient}
      loginPage={Login} >
      <Resource name="districts" list={DistrictList} edit={DistrictEdit} create={DistrictCreate} remove={Delete} />
      <Resource name="zones" list={ZoneList} edit={ZoneEdit} create={ZoneCreate} remove={Delete} />
      <Resource name="units" list={UnitList} edit={UnitEdit} create={UnitCreate} remove={Delete} />
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} remove={Delete} />
    </Admin>
);

export default App;
// https://github.com/firebase/functions-samples
// https://console.firebase.google.com/project/souhrda-hastham/settings/serviceaccounts/adminsdk

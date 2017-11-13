import React from 'react';
import { Route } from 'react-router-dom';
import Details from './campaigns/details';
import Home from './campaigns/dashboard/';

export default [
    <Route exact path="/campaigns-details" component={Details} />,
    <Route  exact path="/campaigns-home" component={Home} />,
    <Route  exact path="/campaigns-district-home/:id" component={Home} />,
    <Route  exact path="/campaigns-zone-home/:id" component={Home} />,
    <Route  exact path="/campaigns-unit-home/:id" component={Home} />,
];

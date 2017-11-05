import React from 'react';
import { Route } from 'react-router-dom';
import Details from './campaigns/details';
import Home from './campaigns/home';

export default [
    <Route exact path="/campaigns-details" component={Details} />,
    <Route exact path="/campaigns-home" component={Home} />
];

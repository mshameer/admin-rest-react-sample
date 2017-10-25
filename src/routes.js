import React from 'react';
import { Route } from 'react-router-dom';
import { Details } from './campaigns/details';

export default [
    <Route exact path="/campaigns-details" component={Details} />
];

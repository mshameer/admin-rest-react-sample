/**
 * Copyright 2016 WGIMIT. All Rights Reserved.
 * Firebase API module devloped as firebase functions
 */
'use strict';

const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

exports.app = functions.https.onRequest(app);

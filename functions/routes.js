const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

function firebaseAuthMiddleware(req, res, next) {
    const authorization = req.header('Authorization');
    if (authorization) {
        let token = authorization.split(' ');
        admin.auth().verifyIdToken(token[1])
        .then((decodedToken) => {
            console.log(decodedToken);
            res.locals.user = decodedToken;
            next();
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(401);
        });
    } else {
        console.log('Authorization header is not found');
        res.sendStatus(401);
    }
}

function apiCreateUser(req, res) {
  createUser(req.body).then(function(data){
    res.status(200).json(data);
  })
  .catch(function(message, err) {
    console.error("Promise chain error ", message, err);
    res.status(500).send(message);
  });
}

function createUser(props){
  return admin.auth().createUser({
    email: props.email,
    emailVerified: true,
    password: props.password,
    displayName: props.displayName,
    disabled: false
  })
}

function apiUpdateUser(req, res) {
  updateUser(req.body).then(function(data){
    res.status(200).json(data);
  })
  .catch(function(message, err) {
    console.error("Promise chain error ", message, err);
    res.status(500).send(message);
  });
}

function updateUser(props){
  return admin.auth().updateUser(props.id, {
    email: props.email,
    password: props.password,
    displayName: props.displayName,
  })
}

router.use((req, res, next) => {
  next();
});

router.use('/api', firebaseAuthMiddleware);

router.get('/', (req, res) => {
  res.json({
    message: 'Souhrda Hastham App API end points'
  });
});

router.post('/api/users', apiCreateUser);
router.put('/api/users', apiUpdateUser);


module.exports = router;

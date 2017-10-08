/* globals localStorage */
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'admin-on-rest'
import firebase from 'firebase'
import { hasPermission, APP_LOGIN_PERMISSION } from'../permissions.js'

function firebaseAuthCheck (auth, resolve, reject) {
  if (auth) {
    // TODO make it a parameter
    firebase.database().ref('/users/' + auth.uid).once('value')
    .then(function (snapshot) {
      const profile = snapshot.val()
      if (profile && hasPermission(profile.role, APP_LOGIN_PERMISSION)) {
        auth.getIdToken().then((firebaseToken) => {
          let user = {auth, profile, firebaseToken}
          localStorage.setItem('firebaseToken', firebaseToken)
          localStorage.setItem('currentUser', JSON.stringify(profile))
          resolve(user)
        })
        .catch(err => {
          reject(err)
        })
      } else {
        firebase.auth().signOut()
        reject(new Error('Access Denied!'))
      }
    })
    .catch(err => {
      reject(err)
    })
  } else {
    reject(new Error('Login failed!'))
  }
}

export default (type, params) => {
  if (type === AUTH_LOGOUT) {
    return firebase.auth().signOut()
  }
  if (type === AUTH_CHECK) {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject(new Error('User not found'))
        }
      });
    })
  }
  if (type === AUTH_LOGIN) {
    const { username, password } = params

    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(username, password)
      .then(auth => firebaseAuthCheck(auth, resolve, reject))
      .catch(e => reject(new Error('User not found')))
    })
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return Promise.resolve(currentUser.role);
  }
  return Promise.resolve()
}

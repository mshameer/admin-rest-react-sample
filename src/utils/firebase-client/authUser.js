import firebase from 'firebase'

export function createUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    console.log(error);
  });

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
  } else {
    // No user is signed in.
  }
});

}

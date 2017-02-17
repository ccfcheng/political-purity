require('dotenv').config();
const express = require('express');
const request = require('superagent');
const firebase = require('firebase');

const app = express();

const PORT = process.env.PORT || 8080;

const fbConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(fbConfig);

const database = firebase.database();

app.get('/login', (req, res) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(process.env.FIREBASE_USER, process.env.FIREBASE_PASSWORD)
    .catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  res.send('Logged in with Firebase');
});

app.get('/senators', (req, res) => {
  database
    .ref('senators')
    .once('value')
    .then((snapshot) => {
      res.send(snapshot.val());
    });
});

app.get('/congress', (req, res) => {
  database
    .ref('congress')
    .once('value')
    .then((snapshot) => {
      res.send(snapshot.val());
    });
});

app.get('/', (req, res) => {
  res.send('This response is served from Express!');
});

app.get('/senate', (req, res) => {
  request
    .get('https://api.propublica.org/congress/v1/115/senate/members.json')
    .set('X-API-Key', process.env.PROPUBLICA_API_KEY)
    .set('Content-Type', 'application/json')
    .end(function(err, data){
      // Calling the end function will send the request
      if (err) {
        console.log('err:', err);
      }
      res.send(data.body);
    });
});

app.get('/member', (req, res) => {
  request
    .get('https://api.propublica.org/congress/v1/members/A000360.json')
    .set('X-API-Key', process.env.PROPUBLICA_API_KEY)
    .set('Content-Type', 'application/json')
    .end(function(err, data){
      // Calling the end function will send the request
      if (err) {
        console.log('err:', err);
      }
      res.send(data.body);
    });
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

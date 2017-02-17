require('dotenv').config();
const express = require('express');
const request = require('superagent');

const app = express();

const PORT = process.env.PORT || 8080;

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

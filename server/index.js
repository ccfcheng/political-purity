const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('This response is served from Express!');
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

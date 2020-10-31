const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000,() => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'})); // limit receiving data, put some option to control

const database = new Datastore('database.db'); // the database
database.loadDatabase();

app.post('/', (request, response) => {
  console.log('I got a request !');
  console.log(request.body); // to receive from the client
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data); // push into database
  response.json({
    status:'success',
    timestamp:timestamp,
    latitude: data.lat,
    longitude: data.lon
  });
});

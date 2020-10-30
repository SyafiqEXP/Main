const express = require('express');
const app = express();
app.listen(3000,() => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'})); // limit receiving data, put some option to control

app.post('/api', (request, response) => {
  console.log('I got a request !');
  console.log(request.body); // to receive from the client
  const data = request.body;
  response.json({
    status:'success',
    latitude: data.lat,
    longitude: data.lon
  });
});

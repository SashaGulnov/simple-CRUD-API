const _ = require('./.env');
const http = require('http');

const server = http.createServer( (req, res) => {

})

server.listen( PORT, 'localhost', (err) => {
  if (err) console.log(err);
})

console.log(`Server is listening ${PORT} port`)
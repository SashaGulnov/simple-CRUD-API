const _ = require('./.env');
const http = require('http');
const {v4: uuidv4} = require('uuid');
const getUser = require('./getUser');

let userArray = [
  {
    'id': 'aa6639c3-4846-4d79-ae0c-cda2d2f6f796',
    'name': 'Igor',
    'age': '24'
  }
];

const server = http.createServer( (req, res) => {

  switch (req.url) {
    case '/person':
      res.write(JSON.stringify(userArray));
      break;
    default :
      break;
  }

  // let person = getUser(userArray, 'aa6639c3-4846-4d79-ae0c-cda2d2f6f796');
  // res.write(person.id);
  res.end();


})

server.listen( PORT, 'localhost', (err) => {
  if (err) console.log(err);
})

console.log(`Server is listening ${PORT} port`)
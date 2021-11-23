// const _ = require('./.env');
const http = require('http');
const getPerson = require('./getPerson');
const createPerson = require('./createPerson');

/*
  {
    'id': 'aa6639c3-4846-4d79-ae0c-cda2d2f6f796',
    'name': 'Igor',
    'age': '24'
  },
  {
    'id': 'bb6639c3-4846-4d79-ae0c-cda2d2f6f796',
    'name': 'Tolik',
    'age': '24'
  },
  {
    'id': 'cc6639c3-4846-4d79-ae0c-cda2d2f6f796',
    'name': 'Vanya',
    'age': '24'
  }
 */

let userArray = [];

const server = http.createServer( (req, res) => {

  // console.log(url.parse(req.url, true).query)

  let path = req.url.split('/');

  switch (req.url) {
    case `/${path[1]}`:

      if (req.method === 'GET'){
        res.write(JSON.stringify(userArray));
        res.end();
      }

      if (req.method === 'POST'){

        let body = "";
        let newPerson;

        req.on('data', (chunk) => {
          body+=chunk.toString();
        })

        req.on('end', () => {
          body = JSON.parse(body);
          newPerson = createPerson(body);
          userArray.push(newPerson);
          res.writeHead(201);
          res.write(JSON.stringify(newPerson));
          // res.statusCode = 201;
          res.end();
        })

      }

      break;

    case `/${path[1]}/${path[2]}`:
      let person = getPerson(userArray, path[2]);
      if (person.id) {
        res.write(JSON.stringify(person));
        res.end();
      }
      else {
        res.writeHead(404);
        res.write('Person does not exist');
        res.end();
      }
      break;
    default :
      res.writeHead(404);
      res.write('Invalid path');
      res.end();
      break;
  }

})

const PORT = process.env.PORT || 3000;

server.listen( PORT, 'localhost', (err) => {
  if (err) console.log(err);
})

console.log(`Server is listening ${PORT} port`)


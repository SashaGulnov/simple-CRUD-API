// const _ = require('./.env');
const http = require('http');
const getPerson = require('./getPerson');
const createPerson = require('./createPerson');
const updatePerson = require('./updatePerson');

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

let personsArray = [];

const server = http.createServer( (req, res) => {

  // console.log(url.parse(req.url, true).query)

  let path = req.url.split('/');

  switch (req.url) {
    case `/${path[1]}`:

      if (req.method === 'GET'){
        res.write(JSON.stringify(personsArray));
        res.end();
      }

      if (req.method === 'POST'){

        let personToCreate = "";
        let newPerson;

        req.on('data', (chunk) => {
          personToCreate+=chunk.toString();
        })

        req.on('end', () => {
          personToCreate = JSON.parse(personToCreate);
          newPerson = createPerson(personToCreate);
          personsArray.push(newPerson);
          res.writeHead(201);
          res.write(JSON.stringify(newPerson));
          // res.statusCode = 201;
          res.end();
        })

      }

      break;

    case `/${path[1]}/${path[2]}`:

      let person = getPerson(personsArray, path[2]);

      if (req.method === 'GET'){

        
        if (person.id) {
          res.write(JSON.stringify(person));
          res.end();
        }
        else {
          res.writeHead(404);
          res.write('Person does not exist');
          res.end();
        }

      }

      if (req.method === 'PUT') {

        let updatedOptions = '';

        req.on('data', (chunk) => {
          updatedOptions+=chunk.toString();
        })

        req.on('end', () => {
          updatedOptions = JSON.parse(updatedOptions);
          let updatedPerson = updatePerson(personsArray, person, updatedOptions);
          res.writeHead(201);
          res.write(JSON.stringify(updatedPerson));
          res.end();
        })      

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


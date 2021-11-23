// const _ = require('./.env');
const uuid = require('uuid');
const http = require('http');
const getPerson = require('./getPerson');
const createPerson = require('./createPerson');
const updatePerson = require('./updatePerson');
const deletePerson = require('./deletePerson');

let personsArray = [];

const server = http.createServer( (req, res) => {

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
          res.end();
        })

      }

      break;

    case `/${path[1]}/${path[2]}`:

      let person = getPerson(personsArray, path[2]);

      if (!person) {
        if (!uuid.validate( path[2] )){
        res.writeHead(400);
        res.write("personID is invalid");
        res.end();
        break;
      }
      res.writeHead(404);
      res.write('Invalid path');
      res.end();
      break;
    }

      if (req.method === 'GET'){

        
        if (path[2]===person.id) {
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
          res.writeHead(200);
          res.write(JSON.stringify(updatedPerson));
          res.end();
        })      

      }
      
      if (req.method === 'DELETE') {

        deletePerson(personsArray, person);
        res.writeHead(204);
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
// console.log(uuid.validate('49bf4db7-4d4a-4a92-971e-8cdc21a2cbb6'))


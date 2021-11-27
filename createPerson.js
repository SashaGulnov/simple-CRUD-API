const {v4: uuidv4} = require('uuid');

const createPerson = function (personToCreate) {
  return response = {
    "id": uuidv4(),
    "name": personToCreate.name,
    "age": personToCreate.age,
    "hobbies": personToCreate.hobbies
  };
}

module.exports = createPerson;
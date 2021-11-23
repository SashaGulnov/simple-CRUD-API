const {v4: uuidv4} = require('uuid');

const createPerson = function (postedPerson) {
  return response = {
    "id": uuidv4(),
    "name": postedPerson.name,
    "age": postedPerson.age,
    "hobbies": postedPerson.hobbies
  };
}

module.exports = createPerson;
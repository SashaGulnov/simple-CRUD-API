let getUser = function (personsArray, personId) {

  let result = false;
 
  personsArray.forEach(person => {
    if (person.id === personId) {
      result = person;
    }
  });
  return result;
}

module.exports = getUser;
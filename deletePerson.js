const deletePerson = function (personsArray, person) {

  let personIndex = personsArray.indexOf(person);
  personsArray.splice(personIndex, 1);

  return personsArray
}

module.exports = deletePerson;
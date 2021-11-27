const updatePerson = function (personsArray, person, updateOptions) {

  let personIndex = personsArray.indexOf(person);
  let personToUpdate = personsArray[personIndex];

  let updatedPerson = {
    "id": personToUpdate.id,
    "name": updateOptions.name,
    "age": updateOptions.age,
    "hobbies": updateOptions.hobbies
  }
  personsArray[personIndex] = updatedPerson;

  return updatedPerson;
}

module.exports = updatePerson;
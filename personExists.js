let personExists = function (person) {

  return person.id ? !!person.id : false

}

module.exports = personExists;
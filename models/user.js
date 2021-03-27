const getDb = require('../util/database').getDb
class User {
  constructor(email, password, name) {
    this.email = email;
    this.password = password;
    this.name = name;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }
  static mongoFindByID (id) {
    const db = getDb();
    db.collection('users').findOne({_id:id})
    .then(result => {
      return result
    })
    .catch(err => console.log(err))
  }
}
module.exports = User;

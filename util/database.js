const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://vuhoaiduc:Vuhoaiduc123@dvcluster.40q34.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useUnifiedTopology: true}
  )
    .then(result => {
      console.log('Connected!');
      _db = result.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

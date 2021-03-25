const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')
class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  
static mongoFindByID(productID) {
  const db = getDb();
  return db.collection('products')
  .find({_id:new mongodb.ObjectID(productID)})
  .next()
  .then(result => {
    return result
  })
  .catch(err => console.log(err))
}

// static mongoUpdateOne(productID) {
//   const db = getDb();
//   return db.collection('products').update({_id:mongodb.ObjectID(productID)})
//   .then(result => {})
//   .catch(err => {console.log(err)})
// }

}


module.exports = Product;

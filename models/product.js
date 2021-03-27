const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    const db = getDb();
    if(this._id) {
      /// update product
      return db
       .collection('products')
       .updateOne({_id:this._id},{$set:this})
       .then(result => {
         console.log(result);
       })
       .catch(err => {
         console.log(err);
       });
    } else {
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
  .find({_id:productID})
  .next()
  .then(result => {
    return result
  })
  .catch(err => console.log(err))
}


static mongoDeleteByID(productID) {
  const db = getDb();
  return db.collection('products')
  .deleteOne({_id:productID})
}

// static mongoUpdateOne(productID) {
//   const db = getDb();
//   return db.collection('products').update({_id:mongodb.ObjectID(productID)})
//   .then(result => {})
//   .catch(err => {console.log(err)})
// }

}


module.exports = Product;

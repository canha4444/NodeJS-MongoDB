const Product = require('../models/product');
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectID
exports.getAddminProduct = (req, res, next) => {
  ///// tes
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/products',
    editing: false
  });
};

////// TEST BRANCH
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.mongoFindByID(new ObjectId(prodId))
    // Product.findById(prodId)
    .then(product => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const proID = req.body.productId;
  const product = new Product(title, price, description, imageUrl, new ObjectId(proID));
  product.save()
  .then(result => {
      res.redirect('/products')
    })
    .catch(err => console.log(err))
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'All Products',
      path: '/admin/products'
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.mongoDeleteByID(new ObjectId(prodId))
    .then(result => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/products');
    })
    .catch(err => console.log(err));
};

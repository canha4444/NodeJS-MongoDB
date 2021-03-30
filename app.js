const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/user')
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const MONGODB_URL= 'mongodb+srv://vuhoaiduc:Vuhoaiduc123@dvcluster.40q34.mongodb.net/myFirstDatabase';
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authenRoutes = require('./routes/authenticate')
///// Khai bao database session
var store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'mySessions'
});

store.on('error', function(error) {
  console.log(error);
});
///// Parse body.request tu object thanh JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

///// Store session //////
app.use(session({
  secret: 'my secret',
  store: store,
  resave: true,
  saveUninitialized: true
}));



app.use((req, res, next) => {
   if(!req.session.user) {
    ///// if can't find req.session => next() the app.use to render page
    return next()
  }
  User.mongoFindByID(new ObjectId(req.session.user._id))
  .then(user => {
    req.sessionUser = user;
    next()
  })
  .catch(err => console.log(err))
})



app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authenRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});

const User = require('../models/user')
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const ObjectId = mongodb.ObjectID

exports.getRegisterForm = (req, res, next) => {
  ///// tes
  res.render('authenticate/signup', {
    pageTitle: 'Register',
    path: '/authenticate/register',
    isAuthenticated: false,
    emailErrorFlag: false,
    passWordErrFlag: false,
  });
};



exports.postRegisterForm = (req, res, next) => {
  ///// tes
  const email = req.body.email;
  const password = req.body.password;
  User.mongoFindOneUser(email)
    .then(result => {
      if (result) {
        return res.redirect('/authenticate/signup')
      }

      return bcrypt.hash(password, 12)
        .then(password => {
          const user = new User(email, password)
          user.save()
            .then(result => {
              console.log('New User Created!!!!');
              res.redirect('/')
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
};



exports.getLoginForm = (req, res, next) => {
  ///// tes
  res.render('authenticate/login', {
    pageTitle: 'Login',
    path: '/authenticate/login',
    isAuthenticated: false,
    emailErrorFlag: false,
    passWordErrFlag: false,
  });
};

exports.postLoginForm = (req, res, next) => {
  const emailValue = req.body.email;
  const passwordValue = req.body.password;
  User.mongoFindOneUser(emailValue)
    .then(userFromDatabase => {
      if (userFromDatabase) {
        bcrypt.compare(passwordValue, userFromDatabase.password)
          .then(match => {
            if (match) {
              console.log('LOGIN SUCCESS')
              req.session.isLoggedin = true;
              req.session.user = userFromDatabase;
              return req.session.save((err) => {
                console.log(err);
                res.redirect('/')
              })
            } else {
              return res.render('authenticate/login', {
                pageTitle: 'Login',
                path: '/loginr',
                emailErrorFlag: false,
                passWordErrFlag: true,
                isAuthenticated: false
              });
            }

          })
          .catch(err => console.log(err))
      } else {
        return res.render('authenticate/login', {
          pageTitle: 'Login',
          path: '/login',
          emailErrorFlag: true,
          passWordErrFlag: false,
          isAuthenticated: false
        });
      }

    })
    .catch(err => console.log(err))


};



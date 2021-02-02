const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")


router.post('/register', function(req, res){
  User.create ({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password,13),
    userLevel: req.body.userLevel
})
  .then (
      function createSuccess(user) {  
        let token = jwt.sign({id: user.id, userLevel: user.userLevel}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});   
          res.json ({
              user: user,
          message: 'User successfully created!',
          sessionToken: token     
        });
      }
  )
  .catch(err => res.status(500).json({error: err}))
})


router.post('/login', function(req, res){
    User.findOne ({
        where: {
            email: req.body.email
        }
    })
        .then(function loginSuccess(user) {
            if (user) {
              bcrypt.compare(req.body.password,user.password,function(err,matches) {
                if (matches) {
                  let token = jwt.sign({id: user.id, userLevel: user.userLevel}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24}); 
                  res.status(200).json({
                   user: user,
                   message: 'User successfully logged in!',
                   sessionToken: token                            
                  })
                } else {
                   res.status(502).json({ error: 'Login failed.'});
                }
                })
            } else {
               res.status(500).json({ error: 'User does not exist.'})  
            }    
        })
        .catch(err => res.status(500).json({ error: err}))
});


module.exports = router;
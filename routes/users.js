var express = require('express');
var router = express.Router();
const UsersModel = require('../models/users');





router.post('/createuser', async (req, res, next) => {

    let data = req.body;

    if(data.name && data.email && data.password) {

        try {
            let result = await UsersModel.createUser(data);
            json = {'status':1,'result':result};
            res.send(json);
        } catch (err) {
            json = {'status':0,'error':err};
        }
 
    } else {
        json = {'status':0,'error':'All fields are mandatory'};
        res.send(json);
    }
   
});

router.post('/updateuser', async (req, res, next) => {

    let data = req.body;

    if(data.userId) {

        try {
            let result = await UsersModel.updateUser(data);
            json = {'status':1,'result':result};
            res.send(json);
        } catch (err) {
            json = {'status':0,'error':err};
        }
 
    } else {
        json = {'status':0,'error':'All fields are mandatory'};
        res.send(json);
    }
   
});

router.post('/getuser', async (req, res, next) => {
    

        try {
            let result = await UsersModel.getUser(req.body);
            json = {'status':1,'result':result};
            res.send(json);
        } catch (err) {
            json = {'status':0,'error':err};
            res.send(json);
        }
   
});


router.post('/deleteuser', async (req, res, next) => {
  let data = req.body;
    if(data.userId) {
        try {
            let result = await UsersModel.deleteUser(req.body);
            json = {'status':1,'result':result};
            res.send(json);
        } catch (err) {
            json = {'status':0,'error':'Data not Found'};
            res.send(json);
        }

    } else {
        json = {'status':0,'error':'Data not Found'};
        res.send(json);
    }
    

});


router.post('/updatepassword', async (req, res, next) => {
  let data = req.body;
  if(data.email && data.password) {
      try {
          let result = await UsersModel.updateUserPassword(req.body);
          json = {'status':1,'result':result};
          res.send(json);
      } catch (err) {
          json = {'status':0,'error':'Data not Found'};
          res.send(json);
      }

  } else {
      json = {'status':0,'error':'Data not Found'};
      res.send(json);
  }
  
});
  


router.post('/forgotpassword', async (req, res, next) => {
  let data = req.body;
  if(data.email) {
      try {
          let result = await UsersModel.sendPasswordMail(req.body);
          json = {'status':1,'result':result};
          res.send(json);
      } catch (err) {
          json = {'status':0,'error':'Data not Found'};
          res.send(json);
      }

  } else {
      json = {'status':0,'error':'Data not Found'};
      res.send(json);
  }
  
});

module.exports = router;
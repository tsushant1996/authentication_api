var model = require('../models_schema/models_schema');
const ObjectID = require('mongodb').ObjectID;
var USERS_COLLECTION = model.users;
var emailService = require('../emailService');

var users = {
     createUser:  async (data) => {
        
        let  user = new USERS_COLLECTION({
            'name': data.name,
            'email':data.email,
            'password': data.password,
            'createdAt':new Date(),
            'updatedAt':new Date()
          });

        try {
            
            let data = await user.save();
            console.log('resultdata',data);
            return data;
        }catch(err){
            console.log(err);
            throw new Error(err);
        }
     
    },

    updateUser: async (data) => {

       let  query = {_id:new ObjectID(data.userId)};
       let   updateQuery = {
            $set: {
                  'name':data.name ? data.name:'',
                  'email':data.email ? data.email :'',
                  'password':data.password ?data.password:'',
                  'updatedAt':new Date()
                }
          };

        try{

            let data = await USERS_COLLECTION.find(query);
            if(data && data.length > 0) {
               data =   await USERS_COLLECTION.update(query,updateQuery);
               
               return data;
            }
        } catch(err){
            console.log(err);
            throw new Error(err);
        }

    },

    getUser: async (data) => {

       let  query = data;
 
         try{
 
             let data = await USERS_COLLECTION.find(query);
             if(data && data.length > 0) {
                return data;
             }
         } catch(err){
             console.log(err);
             throw new Error(err);
         }
 
     },

     deleteUser: async (data) => {
        
        let  query = {_id:new ObjectID(data.userId)};
  
        try{

            let data = await USERS_COLLECTION.find(query);
            if(data && data.length > 0) {
               data =   await USERS_COLLECTION.deleteOne(query);
               console.log('dataDelete');
               return data;
            }else{
                throw new Error('Data not Found');
            }
        } catch(err){
            console.log("---------------->",err);
            throw new Error(err);
        }
  
      },

      updateUserPassword: async (data) => {

        let  query = {email:data.email,password:data.password};
        let   updateQuery = {
             $set: {
                   'password':data.newPassword ?data.newPassword:'',
                   'updatedAt':new Date()
                 }
           };
 
         try{
 
             let data = await USERS_COLLECTION.find(query);
             if(data && data.length > 0) {
                data =   await USERS_COLLECTION.update(query,updateQuery);
                return data;
             }
         } catch(err){
             console.log(err);
             throw new Error(err);
         }
 
        },



        sendPasswordMail: async (data) => {

            let  query = {email:data.email};
            let   updateQuery = {
                 $set: {
                       'password':"old"+data.email,
                       'updatedAt':new Date()
                     }
               };
     
             try{
     
                 let usersData = await USERS_COLLECTION.find(query);
                 if(usersData && usersData.length > 0) {
                     await USERS_COLLECTION.update(query,updateQuery);
                    console.log("usersData",usersData);
                    emailService.sendMail(usersData[0].email,"old"+data.email);

                    return usersData;
                 }
             } catch(err){
                 console.log(err);
                 throw new Error(err);
             }
     
            }


  
  
  };

  module.exports = users;
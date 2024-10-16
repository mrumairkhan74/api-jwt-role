const express = require('express'); //import express module
const router = express.Router();
const{auth,isAdmin} = require('../middleware/apiAuth');  //import authorization

// import controller
const {
    userDelete,
    userGet,
    userLogin,
    userGetById,
    userPut,
    userCreate} = require ('../controller/apiController');


    // for all data
    router.get('/users',auth,isAdmin,userGet);

    // for single person data with id
    router.get('/users/:id',auth,isAdmin,userGetById);

    // for create and post data
    router.post('/users/create',userCreate);

    // for generate token
    router.post('/users/login',userLogin);

    // for delete user by id
    router.delete('/users/:id',auth,isAdmin,userDelete);

    // for update user with id
    router.put('/users/:id',auth,isAdmin,userPut);

    module.exports = router
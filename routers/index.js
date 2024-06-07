const express = require('express');

const userRoutes = require('./user.routes'); //sambungan ke user.routers
// const userRoutes = require('./usr.routes'); //sambungan ke user.routers
const transRoutes = require('./transaction.routes');

const router = express.Router(); //MIDELWARE misal membuat router diluar index.js

router.use('/user', userRoutes);//hilangkan dlu
// router.use('/get', transRoutes);
router.use('/logtrans', transRoutes); 
module.exports = router;


//url path /user/all



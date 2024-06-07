
const userControllers = require('./user.controllers');
const transController = require('./transactian.controller');
// const userControllers = require('./usr.controll');

module.exports = { //export dari user.controllers
    ...userControllers,
    ...transController
};

//setelah itu panggil ke router
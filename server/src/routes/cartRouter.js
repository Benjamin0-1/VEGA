const cartRouter = require("express").Router();
const { viewCart, clearCart, addItemToCart, deleteTemplateFromCart } = require('../handlers/cartHandler');
const isAuthenticated = require('../middlewares/loginRequire');
const isAdmin = require('../middlewares/isAdmin'); 
const isUserActive = require('../middlewares/isUserActive');

cartRouter.use(isAuthenticated);
cartRouter.use(isUserActive);

cartRouter
    .get('/viewcart', viewCart)
    .post('/additem', addItemToCart)
    .delete('/deleteitem', deleteTemplateFromCart)
    .delete('/clearcart', clearCart);

module.exports = cartRouter;

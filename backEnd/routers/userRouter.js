const express = require('express');
const userRouter = express.Router()
const userController = require('../controllers/userController')
const TryCatch = require ('../middilewares/tryCatchMiddleware')
const VarifyToken = require('../middilewares/userAuthMiddleware');
const trycatchmiddleware = require('../middilewares/tryCatchMiddleware');



userRouter.post('/register',TryCatch(userController.createUser));
userRouter.post('/login',TryCatch(userController.userLongin))
userRouter.get ('/products',VarifyToken,TryCatch(userController.productList))
userRouter.get('/products/:id',VarifyToken,TryCatch(userController.productGetById))
userRouter.get('/products/category/:categoryname',VarifyToken,TryCatch(userController.ProductByCategory))
userRouter.post('/:id/cart',VarifyToken,TryCatch(userController.addToCart))
userRouter.get('/:id/cart',VarifyToken,TryCatch(userController.showCart))
userRouter.put('/:id/cart',VarifyToken,TryCatch(userController.updateCartQuantity))
userRouter.delete('/:userId/cart/:itemId',VarifyToken,TryCatch(userController.removeCartProduct))
userRouter.post('/:id/wishList',VarifyToken,TryCatch(userController.addToWishlist))
userRouter.get('/:id/wishList',VarifyToken,TryCatch(userController.showWishlist))
userRouter.delete('/:id/wishList',VarifyToken,TryCatch(userController.deleteFromWishlist))
userRouter.post('/:id/payment',VarifyToken,TryCatch(userController.payment))
userRouter.get('/payment/success',VarifyToken,TryCatch(userController.success))
userRouter.post('/payment/cancel',VarifyToken,TryCatch(userController.cancel))
userRouter.get('/:id/order',VarifyToken,TryCatch(userController.showOrders))





module.exports = userRouter
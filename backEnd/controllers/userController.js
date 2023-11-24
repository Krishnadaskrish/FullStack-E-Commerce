const mongoose = require('mongoose');
const User = require('../models/userSchema');
const { joiUserSchema } = require('../models/validationSchema');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Product = require('../models/productSchema')
const orderSchema = require('../models/orderSchema');
const userSchema = require('../models/userSchema');
const { response } = require('express');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
 



///Database connection
mongoose.connect("mongodb://0.0.0.0:27017/Full-stack-E-commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let sValue = {};
 

module.exports = {

     //user registration (POST api)

    createUser: async (req, res) => {
        const { value, error } = joiUserSchema.validate(req.body);
        if (error) {
          return res.json(error.message);
        }
        const { name, email, username, password } = value;
        
        console.log(name)
        await User.create({
          name: name,  
          email: email,
          username: username,
          password: password,
        });
        res.status(201).json({
          status: "success",
          message: "user registration successfull.",
        });

        
    },

    //user Login (POST api /users/login)
    

    userLongin: async (req, res) => {
      const { value, error } = joiUserSchema.validate(req.body);
     
      if (error) {
        return res.status(400).json({status:'error',message:error.message});
      }
     
      const { username, password } = value;
      const user = await User.findOne({ username: username });
      const id = user.id
      
      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }
      if (!password || !user.password) {
        return res.status(400).json({ status: "error", message: "Invalid input" });
      }
      
      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
         return  res.status(400).json({ status: "error", message: "password incorrect" });
      }
      const token = jwt.sign(
        { username: user.username },
        
        process.env.USER_ACCESS_TOKEN_SECRET,
        {
          expiresIn: 86400,
        }
        
      );
      res.status(200).json({ status: "success",
       message: "Login successful",
       data: token,username,id });
    },

    //get all product (GET api)

    productList : async (req,res)=>{
      
      const product = await Product.find();
      
      if(product.length === 0){
        return res.status(400).json({message:"no product"})
      }
      res.status(201).json({
        status:"success",
        message : "successfully listed",
        data: product
      })
    },

    //get product by id (GET api)

    productGetById :  async (req,res)=>{
      const Id = req.params.id
      const productId = await Product.findById(Id)
      if(!productId){
        res.status(404).json({error : "error in fetching"})
      }
      res.status(201).json({
        status : "success",
        message : "product succesfully fetched",
        data : productId
      })
      
    },

    //get product by category (GET api)

    ProductByCategory: async (req, res) => {
      console.log('cara')
      const Category = req.params.categoryname;
      const products = await Product.find({ category: Category });
    
      if (!products) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(201).json({
        status: "success",
        message: "Successfully fetched category details.",
        data: products,
      });
    },

    //add to cart (Post api)

    addToCart: async (req, res) => {

      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send({
          status: "Failure",
          message: "User not found",
        });
      }
    
      const { producId } = req.body;
    
      if (!producId) {
        return res.status(404).send({
          status: "Failure",
          message: "Product not found ☹️",
        });
      }
    
      // Check if the product is already in the cart

      const isProductInCart = user.cart.some(item => item.productsId.equals(producId));
    
      if (isProductInCart) {
        return res.status(400).send({
          status: "Failure",
          message: "Product is already in the cart",
        });
      }
    
      await User.updateOne(
        { _id: userId },
        { $addToSet: { cart: { productsId: producId } } }
      );
    
      res.status(200).send({
        status: "Success",
        message: "Successfully added product to cart",
      });
    },

    //remove from the cart (DELETE api)

    removeCartProduct: async (req, res) => {
      try {
        const  userId  = req.params.userId;
        const itemId = req.params.itemId;
    
        
    
        if (!itemId) {
          return res.status(404).json({ message: "Product Not found" });
        }
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const result = await User.updateOne(
          { _id: userId },
          { $pull: { cart: { productsId: itemId } } }
        );

       
    
        if (result.modifiedCount > 0) {
          console.log("Item removed successfully");
           res.status(204).json({ message: "Product removed successfully", data: result });
        } else {
          console.log("Item not found in the cart");
          return res.status(404).json({ message: "Item not found in the cart" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    },

    
    //update quantity (PUT api)


    updateCartQuantity : async(req,res)=>{
      

      const userId = req.params.id;
      
      const {id,quantityChange} = req.body;
      
      const user = await User.findById(userId);
      if (!user){
        res.status(404).json({status : "faliure", message :'no user found'})
      }
      const cartItem = user.cart.id(id);
      if(!cartItem){res.status(404).json({status :'faliure', message:'no item found in the cart'})};
      cartItem.quantity += quantityChange ; 
      if(cartItem.quantity > 0){
        await user.save()
      }

      res.status(201).json({
        status : 'success',
        message : 'cart item quantity updated',
        data : user.cart

      })


    },

    // get cart product (GET Api)
    
    
    showCart: async (req, res) => {
     
      const userId = req.params.id;
      const cart = await User.findOne({ _id: userId }).populate("cart.productsId");
    
      if (!cart) {
        return res.status(404).json({ error: "Nothing to show on Cart" });
      }
      res.status(201).json({
        status: "success",
        message: "Successfully fetched cart details.",
        data:cart,
      });
    },

    //added to cart (POST api)

    addToWishlist: async (req, res) => {
      
      const userId = req.params.id;
      if (!userId) {
        return res
          .status(404)
          .json({ status: "Failear", message: "User Not Fount!" });
      }
  
      const { productId } = req.body;
      
      const prod = await Product.findById(productId);
      if (!prod) {
        return res
          .status(404)
          .json({ status: "Failear", message: "Product not found" });
      }
  
      const findProd = await User.findOne({ _id: userId, wishList: productId });
      if (findProd) {
        return res
          .status(409)
          .json({ message: "Product already on your wishlist " });
      }
  
     
  
      await User.updateOne({ _id: userId }, { $push: { wishList: prod } });
      res.status(201).json({
        status: "Success",
        message: "Product Succesfuly added to wishList",
      });
    },

    //show wish list products (GET api)

    showWishlist: async (req, res) => {
      
      const userID = req.params.id
      console.log(userID)
      const user = await User.findById(userID).populate('wishList');
      if (!user) { return res.status(404).json({ message: 'User not found' }) }

      res.status(200).json({
          status: 'success',
          message: 'Successfully fetched wishlist.',
          data: user.wishList,
      });
  },

  //Remove product from wishlist (DELETE api)

  deleteFromWishlist: async (req, res) => {
    const userId = req.params.id;
    console.log('userid',userId)
    const { productId } = req.body;
    console.log('product id',productId)
   
  
    if (!productId) {
      return res.status(404).json({ message: "Product not Found" });
    }
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "Failure", message: "User Not Found" });
    }
  
    await User.updateOne({ _id: userId }, { $pull: { wishList: productId } });
    res.status(200).json({ message: "Successfully removed from wishlist" });
  },

  //payment section ( POST api)

   payment: async (req, res) => {
  
    const userId = req.params.id;
    
    const user = await User.findOne({ _id: userId }).populate("cart.productsId"); //user with cart
    if (!user) {
      return res.status(404).json({ message: "user not found " });
    }
    const cartItems = user.cart;
    if (cartItems.length === 0) {
      return res.status(200).json({ status : "success",message: "Your cart is empty" });
    }

    const lineItems = cartItems.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            images : [item.productsId.image],
            name: item.productsId.title,

          },
          unit_amount: Math.round(item.productsId.price * 100), // when item.price only given ,error occur, why ? check its reason . why multiply 100
        },
        quantity: item.quantity,
      };
    });
    const totalAmount = lineItems.reduce((total,item)=>total + item.price_data.unit_amount * item.quantity,0);
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],  // 'apple_pay', 'google_pay', 'alipay',card
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/success`, // Replace with your success URL
      cancel_url: "http://localhost:3003/api/users/payment/cancel", // Replace with your cancel URL
    });

    if (!session) {
      return res.json({
        status: "Failure",
        message: " Error occured on  Session side",
      });
    }
    sValue = {
      //values to be sent to success function
      userId,
      user,
      session,
    };

    res.status(200).json({
      status: "Success",
      message: "Strip payment session created",
      url: session.url,
    });
    


    },

    //success payment (POST api)

    success : async (req,res)=>{
      const {id,user,session} = sValue ;
      const userId = user._id;
      const cartItem = user.cart ; 
        const productIds = cartItem.map((item) => item.productsId);


      const order = await orderSchema.create({
        userId : id ,
        product : productIds,
  
  
          order_id: session.id,
          payment_id: `demo ${Date.now()}`,
          total_amount: session.amount_total / 100,
      })

      if(!order){
        res.status(403).json({message : "error include while inputing orderschema"})
      }
      const orderId = order._id;

      const updateUser = await User.updateOne(
        {_id :userId },
        {
          $push:{orders :orderId },
           $set:{cart : []}
          },
          {new : true}
        );

        if (updateUser.nModified === 1){
          res.status(200).json({
            status: 'success',
            message : "payment successful"
          });
        }else{
          res.status(500).json({
            status : "error",
            message : "failed to update user data"
          })
        }
    },

    // cancel payment 

    cancel: async (req, res) => {
      res.status(200).json({
        status: "Success",
        message: "Payment cancelled.",
      });
    },

    //show orederd products (GET api)
     
    showOrders: async (req, res) => {
      const userID = req.params.id
      const user = await User.findById(userID).populate('orders');
      if (!user) { return res.status(404).json({ message: 'User not found' }) }

      const userOrders = user.orders;
      if (userOrders.length === 0) { return res.status(404).json({ message: 'You have no orders' }) }

      const orderDetails = await orderSchema.find({ _id: { $in: userOrders } })
      .populate('product');

      res.status(201).json({
          status: 'success',
          message: 'Successfully fetched order details.',
           orderDetails,
          
      });
  }
}



    

    

   
    

    
   

      




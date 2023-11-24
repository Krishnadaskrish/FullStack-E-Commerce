const mongoose = require('mongoose');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const Product = require('../models/productSchema');
const { joiProductSchema } = require('../models/validationSchema');
const orderSchema = require('../models/orderSchema');

///Database connection
mongoose.connect("mongodb://0.0.0.0:27017/Full-stack-E-commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
    //Admin Login (POST api/admin/login)

    login: async(req,res) =>{
      console.log(req.body)
        const { username, password} = req.body;
        if(
            username === process.env.ADMIN_USERNAME &&
            password === process.env.ADMIN_PASSWORD
        ){
            const token = jwt.sign(
                {username},
                process.env.ADMIN_ACCESS_TOKEN_SECRET
            );
             return res.status(200).json({
                status: "success",
                message: "Successfully logged In.",
                data: token 
              });
            
        }else {
             return res.status(404).json({
                status : "error",
                message:"Not an Admin"
            })
        }
    },
    
    //get all users list (GET api/)

    getAllUsres: async (req,res)=>{
        const allUsers = await User.find();
        res.status(200).json({
            status: "success",
            message:"successfully fetched user data",
            data:allUsers
        })
    },

    //get users by ID (GET api)

    getUserByid: async (req, res) => {
      console.log(req.body)
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
          status: "success",
          message: "Successfully fetched user data.",
          data: user,
        });
      },

      //create a product (POST api)

      createProduct : async (req,res)=>{
        console.log(req.body)
       
        const {value,error} = joiProductSchema.validate(req.body);
        const {title,description,price,image,category} = req.body ; 
        if(error){ 
            res.json(error.message)
        }
         await Product.create ({
            title ,
            description,
            price,
            image,
            category,
         });

         res.status(201).json({
            status : "success",
            message : "product successfully created"
         })

      },

      //get all products (GET api)

      getAllProduct : async(req, res)=>{
        console.log(req.body)
        const getAllProduct = await  Product.find();
        console.log(getAllProduct)
        res.status(201).json({
          status : "success",
          message: "succesfully fetch product",
          data : getAllProduct
        })
      },

      //get product by category (GET api)

      getProductsByCatogory: async (req, res) => {
        const categ = req.query.name;
      
        const products = await Product.find({ category: categ });
        if (!products) {
          return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({
          status: "success",
          message: "Successfully fetched product details.",
          data: products,
        });
      },

      //get product by id (GET api)

      getProductById: async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
          status: "success",
          message: "Successfully fetched product details.",
          data: product,
        });
      },


      //update product (PUT api)

      updateProduct: async (req, res) => {
        
        const { title, description, image, price, category, id } = req.body;
        console.log(req.body)
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        await Product.updateOne(
          { _id: id },
          {
            $set: {
              title: title,
              description: description,
              price: price,
              image: image,
              category: category,
            },
          }
        );
        res.status(201).json({
          status: "success",
          message: "Successfully updated the product.",
          data :product
        });
      },

      //delete product (DELETE api)
      
      deleteProduct: async (req, res) => {
        const { id } = req.body;
        console.log(req.body, "hh");
      
        const deletePro = await Product.findByIdAndDelete(id);
        console.log(deletePro)
      
        res.status(204).json({
          status: "success",
          message: "Product successfully deleted",
        });
      }
      ,

      // order details (GET api)

      orderDetails : async (req,res)=>{
        const order = await orderSchema.find();
        console.log(order);
        if(order.length === 0){
          res.status(404).json({message :'no orders yet' })
        }

        res.status(201).json({status : "success",message : "oreder successfully fetched",data : order})
      },

      // stats (GET api)

      stats : async (req,res) => {
        const order = await orderSchema.find();

        const data = await orderSchema.aggregate([
          {
            $group:{
              _id : null ,
              totalProductPurchaced :{$sum:{$size:"$products"}},
              revenu: {$sum:"$total_amount"},
            },
          },
          {$project:{_id : 0}}
        ])

        res.json({data})


      }


      }



    
    


     


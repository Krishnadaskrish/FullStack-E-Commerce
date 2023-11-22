
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home'
import DarkVariantExample from './components/Mainhome';
import { Route, Routes } from 'react-router';
import Login from './components/Login';
import Navbarfront from './components/Navbar';
import Reg from './components/Reg';
import Productcart from './Products/Productcart';
import {product} from './Products/Product';
import { MyContext } from './context/Context';
import All from './Products/All';
import  Cardfood  from './Products/Cardfood';
import Footer from './components/Footer';
import Toy from './Products/Cardtoy';
import Cloths from './Products/Cardcloth';
import Others from './Products/Others';
import Search from './components/Search';
import Displaycart from './components/Displaycart';
import { useEffect, useState } from 'react';
import Cart from './components/Cart';
import AdminHome from './components/Admin/AdminHome';
import Admin from './components/Admin/Admin';
import AdminNav from './components/Admin/AdminNav';
import AdminEdit from './components/Admin/AdminEdit';
import AddProduct from './components/Admin/Addproduct';
import { userList } from './components/Admin/Dummyusers';
import ViewUsers from './components/Admin/Adminuser';
import Moredetails from './components/Admin/Moredetails';
import UserWishlist from './components/UserWishlist'
import env from "react-dotenv"
import axios from 'axios';





export const Axios = axios.create({
  baseURL : process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type":"application/json",
    Authorization:  `Bearer ${localStorage.getItem("jwt_token")}`,
  }

})
console.log(process.env.REACT_APP_BASE_URL)





function App() {

  const[cart,setcart]=useState([])
  const[pro,setpro]=useState(product)
  
  const [isLog, setIsLog] = useState(false);
  const [list,setList]=useState(userList)
  const [users, setUsers] = useState([])
  const [wishList,setWishList] = useState([])
  const [wishStatus,setWishStatus] = useState(false)
  const userID = localStorage.getItem('userID')
  
  
  
  const [cartCount, setCartCount] = useState([])

 

  
      const fetchData = async ()=>{
        try {
          const response = await Axios.get(`api/users/${userID}/wishList`)
          if(response.status === 200){
            setWishList(response.data.data)
            setWishStatus(true)
          }
          
        } catch (error) {
          console.log(error)
          
        }
      }

      useEffect(()=>{
        fetchData()
      },[userID,setWishList])
     



  const addToWishlist = async (productId) => {
   
    try {
      await Axios.post(`/api/users/${userID}/wishList`,{productId})
      const response = await Axios.get(`api/users/${userID}/wishList`)
      if(response.status === 201){
        alert("Added to wishlist")
        setWishList(response.data.data)

      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const Removewishlist = async (productId)=>{
    try {
        await Axios.delete(`/api/users/${userID}/wishList/${productId}`)
        const response = await Axios.get(`/api/users/${userID}/wishList`)
        if (response.status === 201){
          alert('removed from wishlist')
          setWishList(response.data.data)
        }
        
    }catch (error) {
        
        alert(error.response.data.message)
    }
}
  


  

  

  
 
  return (
    <>
    
     
     <MyContext.Provider value={{cart,setcart,pro,setpro,isLog, setIsLog,list,users, setUsers,cartCount, setCartCount,addToWishlist,wishList,setWishList,setWishStatus,wishStatus,fetchData,Removewishlist,userID}}>
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/nav' element={<Navbarfront/>}/>
        <Route path='/dark' element={<DarkVariantExample/>}/>
        <Route path='/log' element={<Login/>}/>
        <Route path='/reg' element={<Reg/>}/>
        <Route path ='/product' element={<Productcart/>}/>
        <Route path ='/All' element={<All/>}/>
        <Route path ='/card' element={<Cardfood/>}/>
        <Route path ='/toy' element={<Toy/>}/>
        <Route path ='/cloth' element={<Cloths/>}/>
        <Route path ='/others' element={<Others/>}/>
        <Route path ='/search' element={<Search/>}/>
        <Route path ='/displayProduct/:id' element={<Displaycart/>}/>
        <Route path ='/Cart/:id' element={<Cart/>}/>
        <Route path ='/adminhome' element={<AdminHome/>}/>
        <Route path ='/admin' element={<Admin/>}/>
        <Route path ='/adminnav' element={<AdminNav/>}/>
        <Route path ='/adminedit/:id' element={<AdminEdit/>}/>
        <Route path ='/addproduct' element={<AddProduct/>}/>
        <Route path ='/adminuser' element={<userList/>}/>
        <Route path ='/user' element={<ViewUsers/>}/>
        <Route path ='/More/:id' element={<Moredetails/>}/>
        <Route path ='/wishlist/:id' element={<UserWishlist/>}/>
        
        
        
     

      </Routes>
      
      </MyContext.Provider>
      
   

   
     
    </>
  );
}

export default App;

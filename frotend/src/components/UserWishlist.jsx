import React, { useContext, useState } from "react"
import Navbarfront from "../components/Navbar";
import { Axios } from "../App";
import { useNavigate } from "react-router";
import { MDBIcon } from "mdb-react-ui-kit";
import { MyContext } from "../context/Context";





function  WishList (){

    const {wishList,setWishList,userID,setWishStatus} = useContext(MyContext)
    
    const navigate = useNavigate()



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



    const removeFromWishlist = async (productId) => {
      console.log(productId)
  

      try {
         const response = await Axios.delete(`/api/users/${userID}/wishList`, {
            data: { productId }  // Correct way to pass data in the DELETE request
          });
         console.log(response)
         if(response.status === 200) {
            alert(response.data.message)
            await fetchData()
         }
      } catch (error) {
         
      }

   }






   

  









    return(
        
            <>
            <Navbarfront/>
               <section className="products d-flex flex-column align-items-center mb-5" style={{ paddingTop: "80px" }}>
                  <h1 className="mt-5 text-black fw-bolder">
                     <span>My</span> Wishlist
                  </h1>
      
                  <div className="product-content">
                     {wishList.length !== 0 ? (
                        wishList.map((value) => (
                           <div className="box" key={value._id}>
                              <div className="box-img">
                                 <img src={value.image} alt={value.title} />
                              </div>
                              <h3 onClick={() => navigate(`/products/${value._id}`)}>{value.title}</h3>
                              <div className="inbox">
                                 <span className="strike-price"></span>
                                 <span className="price"></span>
                              </div>
                              <div className="heart">
                                 {wishList.some((item) => item._id === value._id) && (
                                    <MDBIcon
                                       fas icon="heart" className="clicked-heart-icon"
                                       onClick={() => removeFromWishlist(value._id)}
                                    />
                                 )}
                              </div>
                           </div>
                        ))
                     ) : (
                        <h1>Wishlist is Empty!</h1>
                     )}
                  </div>
               </section>
            </>
         );
      
}


export default WishList
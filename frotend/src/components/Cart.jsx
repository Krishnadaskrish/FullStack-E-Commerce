import React, { useContext, useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { MyContext } from "../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import Navbarfront from "./Navbar";
import { Axios } from "../App";
import toast from "react-hot-toast";


export default function Cart() {
  const { cart, setcart } = useContext(MyContext);
  const navigate = useNavigate();
  const [total,setTotal]=useState(0)
  const [product,setProduct] = useState([])
  const {id} = useParams()
  const {cartCount, setCartCount}  = useContext(MyContext)
  const [payment, setpayment] = useState([])
  

  const userId = localStorage.getItem("userID")
  console.log(userId)

  useEffect(()=>{
    setCartCount(localStorage.setItem('count',product.length))
  },[])
  console.log('this is ',product)

  //fetching cart items
  const fechCart = async () => {
    try {
      const response = await Axios.get(`/api/users/${userId}/cart`)
      console.log(response)
      if(response.status === 201){
        setProduct(response.data.data.cart)
        
      }

     
    } catch (error) {
      console.log(error)
      
    }
  }
  
  useEffect(() => { 
    fechCart()

},[product])

const quantityUpdate = async (cartId,quantityChange)=>{
  const data =  {id :cartId,quantityChange } ;
  try {
     await Axios.put(`/api/users/${userId}/cart`,data);
     const response = await Axios.get(`/api/users/${userId}/cart`)
     if (response.status === 200){
      return fechCart()
     }
    
  } catch (error) {
    console.log(error)
    
  }
}





const handleRemoveItem = async (itemId) => {
  try {
     
     const response = await Axios.delete(`/api/users/${userId}/cart/${itemId}`);
     console.log('this is ',userId)
     
    if (response.status === 204) {
       fechCart()
    }
  } catch (error) {
    console.error(error);
    alert('Error removing product from the cart');
  }
};


  

  

  const handleBackToShopping = () => {
    navigate("/");
  };


  const handleCheckout = async ()=>{
    try {

      const response = await Axios.post(`/api/users/${userId}/payment`)
      if(response.status === 200){
            const url = response.data.url
            const confirmation = window.confirm("Payment session created. Redirecting to the payment gateway. Continue?")
            if(confirmation) window.location.replace(url)

      }
      
    } catch (error) {
          alert(error.response.data.message)
    }
  }


  


  return (
    <>
    <Navbarfront/>
    <section className="h-100 h-custom" style={{ backgroundColor: "#C6E6FB", maxHeight: "50%" }}>
      <MDBContainer className="h-100 py-5">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard className="shopping-cart" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="text-black">
                <MDBRow>
                  <MDBCol lg="7" className="px-5 py-4">
                    <MDBTypography
                      tag="h3"
                      className="mb-5 pt-2 text-center fw-bold text-uppercase"
                    >
                      Your products
                    </MDBTypography>

                    { product.map((item) => (
                      
                      <div
                        className="d-flex align-items-center mb-5"
                        key={item._id}
                      >
                        <div className="flex-shrink-0">
                          <MDBCardImage
                            src={item.productsId.image}
                            fluid
                            style={{ width: "150px" }}
                            alt={item.productsId.title}
                          />
                        </div>

                        <div className="flex-grow-1 ms-3">
                        <a
                            href=""
                            className="float-end text-black"
                            onClick={() => handleRemoveItem(item.productsId._id)}
                          >
                            <MDBIcon fas icon="times" />
                          </a>
                          
                          <MDBTypography tag="h5" className="text-primary">
                            {item.productsId.title}
                          </MDBTypography>
                          <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                            
                          </MDBTypography>

                          <div className="d-flex align-items-center">
                            <p className="fw-bold mb-0 me-5 pe-3">
                             Price : {item.productsId.price}$
                            </p>

                            <div className="def-number-input number-input safari_only">
                              <MDBBtn
                                style={{ border: "1px" }}
                                className="minus mx-2 "
                                onClick={() => quantityUpdate(item._id,-1)}
                              >
                                
                                -
                              </MDBBtn>
                              <span>{item?.count} </span>
                              <MDBBtn
                                className="plus"
                                style={{ border: "1px" }}
                                onClick={() => {
                                  console.log(item)
                                  quantityUpdate(item._id,1)}
                                }
                              >
                                +
                              </MDBBtn>
                            </div>
                          </div>
                          <MDBTypography tag="h6" className="fw-bold  mx-5">
                            
                            Quantity:{item.quantity}
                          </MDBTypography>
                          <MDBTypography
                            tag="h5"
                            style={{ width: "100px" }}
                            className="fw-bold mx-5 "
                          >
                            Total:{item.productsId.price * item.quantity}
                          </MDBTypography>
                        </div>
                      </div>
                    )
                    )}
                    
                    <MDBTypography
                      tag="h3"
                      className="mb-5 pt-2 text-center fw-bold text-uppercase"
                    >
                      Payment
                    </MDBTypography>

                    

                     

                      

                      

                      <MDBBtn block size="lg"
                       onClick = {()=>handleCheckout()}
                       >
                        Buy now
                       
                      </MDBBtn>
                      

                      <MDBTypography
                        tag="h5"
                        className="fw-bold "
                        style={{ position: "absolute", bottom: "0" }}
                      >
                        <a href="#!" onClick={handleBackToShopping}>
                          <MDBIcon fas icon="angle-left me-2" />
                          Back to shopping
                        </a>
                      </MDBTypography>
                    
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
}



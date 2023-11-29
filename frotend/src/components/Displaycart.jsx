import React,{useContext,useState,useEffect} from "react";
import { useNavigate,useParams } from "react-router";
import { MyContext } from "../context/Context";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRow,
    MDBCol,
  } from "mdb-react-ui-kit";
  import Navbarfront from "./Navbar";
import { Axios } from "../App";
import toast from "react-hot-toast";


  export default function Displaycart(){
    const {id}=useParams()
    const { pro, cart, setcart }=useContext(MyContext);
    const[count,setcount]=useState(1);
    const navigate=useNavigate();
    const [product,setProduct] = useState([])
    const userId = localStorage.getItem("userID")


  



  useEffect(()=>{
    const fetchProduct = async()=>{

      try {

        const responce = await Axios.get(`api/users/products/${id}`)
        if(responce.status ==201 ){
          setProduct(responce.data.data)
        }
        
      } catch (error) {
            console.log(error)
      }
      
    }
    fetchProduct()
  },[]);

  const handleAddToCart = async () => {
    try {
      const response = await Axios.post( `/api/users/${userId}/cart`,{
        producId: id 
      })
      if (response.status === 200){
        
        toast.success("Product added to the cart!")
        navigate("/Cart/:id")

      }
      
    } catch (error) {
      console.error('Error adding product to the cart:', error);
      
    }
  };









          
        return (
          <>

          <Navbarfront/>
          <div style={{ backgroundColor: " #C6E6FB" }}>
    <div className="container mt-5"   >
           
            
      <MDBRow key={product._id}>
        <MDBCol md="6">
            <MDBCard>
            <MDBCardImage src={product.image} alt={product.title} />
          </MDBCard>
        </MDBCol>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>{product.title}</MDBCardTitle>
              <MDBCardText>{product.description}</MDBCardText>
              <MDBCardText>
                <strong>Price:</strong> ₹{product.price}
              </MDBCardText>
              <div className="d-flex align-items-center">
                <MDBBtn color="primary" className="me-2" >
                  -
                </MDBBtn>
                <span className="me-2">{count}</span>
                <MDBBtn color="primary" >
                +
                </MDBBtn>
              </div>
              <p className="mt-3">
                <strong>Total:</strong> ₹{product.price*count}
              </p>

             
            <MDBBtn onClick= { handleAddToCart} >add to cart</MDBBtn>
          
            <br/>
            <br/>
              <MDBBtn color="success" >
                Buy Now
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>

          
        </MDBCol>
      </MDBRow>
           
    </div>
 </div>
 </>
  );

        
   } 







  
  
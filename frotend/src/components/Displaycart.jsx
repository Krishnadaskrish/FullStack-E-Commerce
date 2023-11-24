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
      // toast.error(error.response.data.message)
    }
  };







  const viewProduct=pro.filter((pro)=>pro.id===parseInt(id));

   if(!viewProduct){
    //product is found
    return <h1 style={{ textAlign: "center" }}>Product not found</h1>;}

    const incresecount = () => {
        setcount(count + 1);
      };
    
      const decresecount = () => {
        if (count > 1) {
            setcount(count - 1);
        }

      };

    
   
    const handleToCart=()=>{
  console.log(cart);
      let cartItem = cart.filter(item => item?.id == id)[0];
      const itemIndex=cart.findIndex(i => i?.id == id)
      console.log(cartItem, itemIndex);
      if(cartItem) {
      cart.splice(itemIndex, 1, {...cartItem, count: cartItem?.count + count});
      } else {
      cart.push({...viewProduct[0], count: viewProduct[0]?.count + count});
      }
      setcart(() =>[...cart]);

        alert('product successfully added to the cart')
        navigate('/Cart')

        };
        const handleBuyNow = () => {
            navigate('/Cart');
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
                <MDBBtn color="primary" className="me-2" onClick={decresecount}>
                  -
                </MDBBtn>
                <span className="me-2">{count}</span>
                <MDBBtn color="primary" onClick={incresecount}>
                +
                </MDBBtn>
              </div>
              <p className="mt-3">
                <strong>Total:</strong> ₹{product.price*count}
              </p>

             
            <MDBBtn onClick= { handleAddToCart} >add to cart</MDBBtn>
          
            <br/>
            <br/>
              <MDBBtn color="success" onClick={handleBuyNow}>
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







  
  
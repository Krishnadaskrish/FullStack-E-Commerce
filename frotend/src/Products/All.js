import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Navbarfront from "../components/Navbar";
import Footer from "../components/Footer";
import { Axios } from "../App";
import { useNavigate, useParams } from "react-router";
import { MyContext } from "../context/Context";
import {MDBIcon}from "mdb-react-ui-kit";

const All = () => {
  const [products, setProducts] = useState([]);
  const cartCount = localStorage.getItem('count')
  const userName = localStorage.getItem('name')
  const {addToWishlist} = useContext(MyContext)
 

  const {id} = useParams()
  
  console.log(products)

  
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Products Updated:", products);
  }, [products]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const response = await Axios.get("api/users/products");
        console.log("API Response:", response);
    
        if (response.status === 201) {
          console.log("Updating products state...");
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    fetchProducts();
  },  []);

  

  

  return (
    <>
      <Navbarfront />

      <section id="all" style={{ backgroundColor: "#faf3dd" }}>
        <div className="container py-5">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
            
            {
              products.map((product) => (
                <div className="col" key={product._id}>
                  <div className="card shadow-sm h-100">
                    <div className="d-flex justify-content-between p-3">
                      <div
                        id="animated-div"
                        
                        
                      >
                     
                  <img src={require("../images/wishlist (4).png")} alt="" className="navIcons" onClick={() => 
                    userName ? addToWishlist(product._id): alert.error("Pleas login")
                  } />   
                        
                      </div>
                    </div>
                    <img
                      src={product.image}
                      style={{ width: "200px", height: "150px" }}
                      className="card-img-top d-flex align-items-center justify-content-center"
                      alt={product.title}
                    />

                <div className="card-body">
                    <div className="d-flex justify-content-center">
                      <h5 >{product.title}</h5>
                     
                    </div>

                    <div className="mb-3">
                      <h5 className="text-dark mb-0">${product.price}</h5>
                    </div>

                      <Button
                        variant="primary"
                        className="ms-1 card-container"
                       
                        onClick={() =>
                          navigate(`/displayProduct/${product._id}`)
                        }
                        type="submit"
                      >
                        View Details{" "}
                        <i className="fas fa-shopping-cart ms-1"></i>
                      </Button>
                      
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default All;

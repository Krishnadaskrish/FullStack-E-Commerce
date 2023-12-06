import React, { useEffect, useState } from 'react'
import { MDBBtn,
    MDBCardBody,
    MDBCardTitle,
    MDBCardImage,
    MDBCard,
    MDBCol,
    MDBRow


} from 'mdb-react-ui-kit';

import { useNavigate } from 'react-router-dom';
import { Axios } from '../App';




const Search = ({searchTerm}) => {
    const ab = useNavigate();
    const [products, setProducts] = useState([]);

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
},[]);
    
  return (
    <>
    
            {searchTerm ? (
  <div className="container mx-5">
    <MDBRow>
      {products &&
  products.filter((val) => {
        if (searchTerm === "") {
          return true; // Return true to include all items when the search term is empty
        } else if (
          val.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true; // Return true to include items that match the search term
        }
        return false; // Return false to exclude items that don't match the search term
      }).map((val) => (
        <MDBCol md="4" key={val._id}>
          <MDBCard className="mt-3">
            <MDBCardImage src={val.image} position="top" alt="..." />
            <MDBCardBody>
              <MDBCardTitle>{val.title} </MDBCardTitle>
              <MDBCardTitle>₹{val.price} </MDBCardTitle>
              <MDBBtn  onClick={()=>ab(`/displayProduct/${val._id}`)}>View</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      ))}
    </MDBRow>
  </div>
) : (
  ""
)}
          
      
    
    </>
  )
}

export default Search

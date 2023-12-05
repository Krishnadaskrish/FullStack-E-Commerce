import React, { useContext, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody,MDBIcon } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import { MyContext } from '../../context/Context';
import AdminNav from './AdminNav';
import { useNavigate } from 'react-router';
import { Axios } from '../../App';
import toast from 'react-hot-toast';



export default function Admin() { 
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  

  const jwtToken =  `Bearer ${localStorage.getItem("jwt_token")}`


  const handleDeletes = async (productId) => {
    try {
      const response = await Axios.delete(`/api/admin/products/${productId}`);
      if (response.status === 204) {
        // Update the local state to remove the deleted product
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        toast.success('Product deleted successfully!');
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error('Error deleting product. Please try again.');
    }
  };
  








  const handlEdit = async (productId) => {
    navigate(`/adminEdit/${productId}`)
    
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("/api/admin/products")
       

        if (response.status === 201) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

 

  return (
    <>
      <AdminNav />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">price</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <th scope="row">{index + 1}</th>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <img style={{ width: '50px', height: '50px' }} alt="" src={product.image} />
              </td>
              <td>
              <button
                    className="btn btn-danger me-4"
                    onClick={() => handleDeletes(product._id)}
                  >
                    Delete
                  </button>
                <button
                    className="btn btn-primary me-5 "
                    onClick={()=> handlEdit(product._id)}
                  >
                    Edit
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
    
    
    
    
          


import React, { useState,useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { useContext } from 'react';
import { MyContext } from '../../context/Context';
import { useParams } from 'react-router';
import axios from 'axios';
import { Axios } from '../../App';

export default function Moredetails() {
   
    const { id } = useParams();
    const [user,setUsers] = useState(null);
    const [loading , setLoading] = useState(true);


    useEffect(()=>{
      const fetchUsers = async ()=>{
        try {
          const response = await Axios.get(`/api/admin/users/${id}`)
          if (response.status == 200){
            setUsers(response.data.data)
          }
          
        } catch (error) {
          console.error("error fetching users")
          
        }finally{
          setLoading(false)
        }
      };
      fetchUsers();

    },[id])
    if (loading) {
      return <p>Loading...</p>; // You can replace this with a loading spinner or animation
    }
  
    if (!user) {
      return <h1 style={{ textAlign: 'center', marginTop: 70 }}>User not found</h1>;
    }


  return (
    <>
     <div className="d-flex flex-column align-items-center pt-3">
         <div className="d-flex align-items-center gap-3">
            <MDBIcon fas icon="user-circle" className="text-muted" style={{ fontSize: "100px" }} />
            <div className="d-flex flex-column">
               <h3>{user.username}</h3>
               <h6>{user.email}</h6>
            </div>
         </div>
         <div className="dashboard-table mt-4 user-details-admin px-5">
            <table className="w-100">
               <thead className="text-center">
                  <tr>
                     <td>Order ID</td>
                     <td>Date</td>
                     <td>Product Name</td>
                     <td>Payment ID</td>
                     <td>Total Price</td>
                  </tr>
               </thead>
               <tbody className="text-center">
                  {user.orders.length > 0 ? (
                     user.orders.map((order, index) => (
                        <React.Fragment key={order._id}>
                           <tr>
                              <th rowSpan={order.product.length}>{order.orders_id.slice(-10)}</th>
                              <th rowSpan={order.product.length}>{order.date}</th>
                              <th>{order.product[0].title}</th>
                              <th rowSpan={order.product.length}>{order.payment_id.slice(-10)}</th>
                        
                           </tr>
                           {order.product.slice(1).map((product) => (
                              <tr key={product._id}>
                                 <th>{product.title}</th>
                              </tr>
                           ))}
                        </React.Fragment>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="5">
                           <h3>No Orders</h3>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
      </>
   );
  
}


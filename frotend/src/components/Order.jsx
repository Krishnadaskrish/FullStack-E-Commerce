import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Axios } from "../App";
import { MyContext } from "../context/Context";

function Orders() {
   const { userID } = useContext(MyContext);
   const [order, setOrder] = useState({ orders: [] });
  
   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await Axios.get(`/api/users/${userID}/order`);
            console.log(response)
            if (response.status === 201) {
                setOrder(response.data.orderDetails);
               

              }
         } catch (error) {
            alert(error.response.data.message);
         }
      };

      fetchData();
   }, [setOrder]);

   return (
      <section
         className="products d-flex flex-column align-items-center mb-5 text-black"
         style={{ paddingTop: "80px" }}
      >
         <h1 className="mt-5 mb-5 text-black fw-bolder">
            <span>My</span> Orders
         </h1>

         <div className="dashboard-table pt-5 px-5 w-75">
            <table className="w-100 pt-5">
               <tbody className="text-center">
                  {order.length > 0 ? (
                     order.map((singleOrder) => (
                        <React.Fragment key={singleOrder._id}>
                           {singleOrder.product.map((product) => (
                              <tr key={product._id}>
                                 <th>
                                    <img
                                       src={product.image}
                                       alt={product.title}
                                       style={{ width: "100px" }}
                                       onClick={() => navigate(`/products/${product._id}`)}
                                    />
                                 </th>
                                 <th className="w-25">{product.title}</th>
                                 <th>
                                    <span>Ordered on</span> <br /> {singleOrder.date}
                                 </th>
                                 {/* <th>
                                    <span>Price</span> <br /> {handlePrice(product.price)}
                                 </th> */}
                              </tr>
                           ))}
                        </React.Fragment>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="4">
                           <h3>No Orders</h3>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </section>
   );
}

export default Orders;
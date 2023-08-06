import React from "react";
import "./myorders.css";

function Myorders() {
  // Retrieve orders from localStorage
  const myorders = JSON.parse(localStorage.getItem("myorders"));

  return (
    <>
      <div className="bottomm">
        <div className="blog_postt_profile_wrapper">
          {myorders?.length > 0 ? (
            // Render myorders if there are items in the myorders array
            myorders.map((order, index) => (
              <  >
                {order.items?.length > 0 ? (
                  // Display order details if there are items in the items array
                  order.items.map((item, itemIndex) => (
                    <div className="blog_profile_postt" key={itemIndex}>
                      <img src={item.postImage} alt="" />
                      <div className="mid__title">
                        <h3>{item.title}</h3>
                        <p>Price: {item.price}$</p>
                        <p>Address: {order.address}</p>

                      </div>
                    </div>
                  ))
                ) : (
                  // Render a message when there are no items in the items array
                  <p>No items found for this order.</p>
                )}
              </>
            ))
          ) : (
            // Render a message when there are no orders
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Myorders;

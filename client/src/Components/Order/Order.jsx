import React, { useContext, useState } from "react";
import "./order.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./order.css";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BasketContext } from "../../context/BasketContext";
import { useActiveUserContext } from "../../context/activeUserContext";
import { OrderContext } from "../../context/OrderContext";
import axios from "axios"; // Axios eklemeyi unutmayın

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const Order = () => {
  const { addToBasket, removeFromBasket, basketItems, total } =
    useContext(BasketContext);
  const { orders, addOrder } = useContext(OrderContext);
  const { activeUser } = useActiveUserContext();
  const [addAddres, setAddAddress] = useState("");
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (!activeUser) {
      navigate("/");
    }
  };
  
  const handleClose = () => setOpen(false);

  const addProductValidationSchema = Yup.object().shape({
    address: Yup.string().required("Must be filled!"),
  });

  const formik = useFormik({
    initialValues: {
      address: "",
    },
    validationSchema: addProductValidationSchema,

    onSubmit: async (values) => {
      handleClose();
      const order = {
        total: total(),
        count: basketItems.length,
        address: values.address,
        items: basketItems.map((item) => ({
          postImage: item.postImage,
          title: item.title,
          price: item.price,
        }
        )),
      };
      // Axios ile isteği gönder
      try {
        const response = await axios.post(`/api/auth/user/${activeUser._id}/orderItems`, order);
        // İsteğin başarılı olduğunu kontrol et ve gerektiğinde işlemler yap
        if (response.status === 200) {
          // Siparişi OrderContext'e ekle
          addOrder(response.data);
          console.log(response.data)
        }
      } catch (error) {
        console.error("Error while sending order:", error);
      }
    },
  });

  return (
    <div className="order-box">
      <div className="order" onClick={handleOpen}>
        Order
      </div>
      <Modal
        open={activeUser ? open : false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Please enter your current address</h3>
          <form onSubmit={formik.handleSubmit}>
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  flexWrap: "wrap",
                  padding: "20px 0",
                }}
              >
                <label
                  htmlFor="address"
                  style={{ minWidth: "150px", display: "inline-block" }}
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  style={{
                    border: "none",
                    width: 340,
                    padding: 10,
                    backgroundColor: "transparent",
                    borderBottom: "1px solid gray",
                  }}
                />
                <p style={{ color: "red" }}>{formik.errors?.address}</p>
              </div>
              <input
                type="submit"
                value="Submit"
                style={{
                  padding: "10px 50px",
                  border: "none",
                  color: "white",
                  backgroundColor: "green",
                  borderRadius: 5,
                  margin: "20px auto",
                  display: "block",
                  cursor: "pointer",
                }}
              />
            </>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Order;

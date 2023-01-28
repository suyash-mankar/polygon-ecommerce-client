import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../styles/orderSuccess.scss";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderAction";

function OrderSuccess() {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  order.paymentInfo = {
    id: "temp_id",
    status: "succeeded",
  };

  useEffect(() => {
    if (user) {
      dispatch(createOrder(order));
    }
  }, []);

  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully </Typography>
    </div>
  );
}

export default OrderSuccess;

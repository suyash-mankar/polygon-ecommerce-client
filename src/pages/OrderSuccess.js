import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../styles/orderSuccess.scss";
import { Typography } from "@mui/material";

function OrderSuccess() {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully </Typography>
    </div>
  );
}

export default OrderSuccess;

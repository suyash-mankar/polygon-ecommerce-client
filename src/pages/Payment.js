import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "../styles/payment.scss";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../actions/orderAction";
import { toast } from "react-toastify";

function Payment() {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [makingPayment, setMakingPayment] = useState(false);

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const navigate = useNavigate();

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    setMakingPayment(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: "true",
      };
      const { data } = await axios.post(
        process.env.REACT_APP_MODE === "production"
          ? `${process.env.REACT_APP_SERVER_URL}/payment/process`
          : `/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("Payment successfully made");

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <div className="checkout_steps_container">
        <CheckoutSteps activeStep={2} />
      </div>

      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <h3
            style={{
              textAlign: "center",
              marginTop: "0",
              marginBottom: "0px",
              borderBottom: "1px solid lightgrey",
              paddingBottom: "10px",
            }}
          >
            Pay with card
          </h3>
          <p
            style={{
              fontSize: "0.8rem",
              color: "grey",
              // borderTop: "1px solid lightgrey",
              borderBottom: "0",
              padding: "0",
              marginTop: "10px",
              marginBottom: "30px",
            }}
          >
            -powered by stripe
          </p>
          <span>Card Number</span>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />

            {/* <div
              class="FormFieldInput-Icons"
            >
              <div style={{ transform: "none", display: "flex" }}>
                <span class="FormFieldInput-IconsIcon is-visible">
                  <img
                    src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg"
                    alt="Visa"
                    className="BrandIcon"
                    style={{ width: "1.5rem", marginLeft: "5px" }}
                  />
                </span>
                <div style={{ transform: "none" }}>
                  <span class="FormFieldInput-IconsIcon is-visible">
                    <img
                      src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg"
                      alt="MasterCard"
                      className="BrandIcon"
                      style={{ width: "1.5rem", marginLeft: "5px" }}
                    />
                  </span>
                </div>
                <div style={{ transform: "none" }}>
                  <span class="FormFieldInput-IconsIcon is-visible">
                    <img
                      src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg"
                      alt="Amex"
                      className="BrandIcon"
                      style={{ width: "1.5rem", marginLeft: "5px" }}
                    />
                  </span>
                </div>
              </div>
            </div> */}
          </div>
          <span>Expiry</span>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <span>CVC</span>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={
              makingPayment
                ? "Making Payment..."
                : `Pay - $${orderInfo && orderInfo.totalPrice}`
            }
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
}

export default Payment;

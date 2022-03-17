import React, { Fragment,useEffect,useState} from "react";
import {Redirect} from "react-router-dom";
//import "./Cart.css";
import OrderDetails from "./OrderDetails";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails} from "../../actions/orderAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

export const Mypurchases = ({history}) =>
{
    const {user} = useSelector((state)=> state.auth);
    const {orderItems} = useSelector((state) => state.getorder);
    const email = user && user.length && user[0].email;
    const dispatch = useDispatch();
    const alert = useAlert();
    useEffect(() => {
        dispatch(getOrderDetails(email));
      }, [dispatch,email]);

      const orderHandler = () => {
    
        history.push("/products");
      };
return (
    <Fragment>
        {orderItems && orderItems.length === 0  ?(
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No orders placed yet</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ): (<Fragment>
        <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            </div>
            {orderItems &&
              orderItems.map((item) => (
            <div className="cartContainer" key={item.productid}>
                  <OrderDetails item={item}/>
                  <span>{item.quantity}</span>
                <p className="cartSubtotal">{
                    item.currency
                  } {`${
                    item.price * item.quantity
                  }`} </p>
                </div>
                 ))}
                <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`${orderItems && orderItems.length && orderItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`} </p>
              </div>
              <div></div>
              <div className="checkOutBtn">
              <button type="submit" onClick={orderHandler}>Continue Shopping</button>
              </div>
              </div>
    </Fragment>)
    }
    </Fragment>
    );
}

export default Mypurchases;
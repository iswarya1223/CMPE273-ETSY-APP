import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart,removeItemsFromCart} from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

const Cart = () =>{
 const dispatch = useDispatch();
 const increaseQuantity = (productid, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(productid, newQty));
  };

  const decreaseQuantity = (productid, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(productid, newQty));
  };

  const deleteCartItems = (productid) => {
    dispatch(removeItemsFromCart(productid));
  };

  const { cartItems } = useSelector((state) => state.cart);
    return (
    <Fragment>
        {cartItems.length === 0 ?(
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
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
            {cartItems &&
              cartItems.map((item) => (
            <div className="cartContainer" key={item.productid}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
                  <div className="cartInput">
                  <button onClick={() =>
                        decreaseQuantity(item.productid, item.quantity)
                      }>
                      -
                </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() =>
                        increaseQuantity(
                          item.productid,
                          item.quantity,
                          item.stock
                        )
                      }>
                      +
                    </button>
                </div>
                <p className="cartSubtotal">{`${
                    item.price * item.quantity
                  }`}</p>
                </div>
                 ))}
                <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>600</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
              <button >Check Out</button>
              </div>
              </div>
    </Fragment>)
    }
    </Fragment>
    );
}
export default Cart;
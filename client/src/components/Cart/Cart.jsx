import React from 'react';
import './Cart.scss';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, resetCart, updateQuantity } from '../../redux/cartReducer';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import CloseIcon from '@mui/icons-material/Close';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useAuthContext } from '../../context/AuthContext';

const Cart = ({ setOpenCart }) => {
  const { user } = useAuthContext();
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2);
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  const isCartEmpty = products.length === 0 && user;

  return (
    <div className="cartpanel">
      <div className="opctlayer" onClick={() => setOpenCart(false)}></div>
      <div className="cart">
        <h1>Your cart</h1>
        <CloseIcon className="close-btn" onClick={() => setOpenCart(false)} />
        <div className="scrol">
          {products?.length > 0 ? (
            products?.map((item) => (
              <div className="item" key={item.id}>
                <div className="image-container">
                  <img
                    src={process.env.REACT_APP_UPLOAD_URL + item.img}
                    alt=""
                  />
                </div>
                <div className="details">
                  <h1>{item.title}</h1>
                  <p>{item.desc?.substring(0, 60)} ...</p>
                  <div className="quantity">
                    <IndeterminateCheckBoxIcon
                      fontSize="large"
                      className="cart__button"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    />
                    <div className="price">
                      {item.quantity} x {item.price} د.ت
                    </div>
                    <AddBoxIcon
                      fontSize="large"
                      className="cart__button"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    />
                  </div>
                </div>
                <DeleteOutlinedIcon
                  className="delete"
                  onClick={() => dispatch(removeItem(item.id))}
                />
              </div>
            ))
          ) : (
            <>
              <div className="empty">
                <ProductionQuantityLimitsIcon className="cls_empty" />
                <p>Your cart is empty</p>
              </div>
            </>
          )}
        </div>
        <div className="total">
          <span>SUBTOTAL</span>
          <span>{totalPrice()} د.ت</span>
        </div>
        <div className="btnn">
          <>
            {/* Disable the button if the cart is empty and the user is logged in */}
          {user ? (
            <Button
              className="cart__button"
              variant="contained"
              href="/cartdetails"
              disabled={isCartEmpty}
            >
              {isCartEmpty ? 'YOUR CART IS EMPTY' : 'PROCEED TO CHECKOUT'}
            </Button>
          ) : (
            <Button
              className="cart__button"
              variant="contained"
              href="/signin"
            >
              LOGIN PLEASE
            </Button>
          )}
          </>
          <span className="reset" onClick={() => dispatch(resetCart())}>
            Reset Cart
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cart;

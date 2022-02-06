import React, { useEffect, useState } from 'react';
import { connect } from "react-redux"
import CartItem from './CartItem/CartItem'
import './Cart.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { coupons } from '../../constants/coupons';

function Cart({ cart = [] }) {

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [success, setSuccess] = useState(null);
  const [oldPrice, setOldPrice] = useState(null);

  const getText = (e) => {
    setCoupon(e.target.value);
  }

  const ApplyCoupon = () => {
    console.log(coupon);

    let couponuc = coupon.trim().toUpperCase();
    let obj = coupons[couponuc];

    if (obj == undefined) {
      console.log('Coupon is not applicable');
      setSuccess(false);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      console.log(obj.discount);
      let discount = (totalPrice / 100) * (obj.discount);
      let newPrice = Math.trunc(totalPrice - discount);
      setOldPrice(totalPrice);
      setTotalPrice(newPrice);
    }
  }

  const revert = () => {
    setTotalPrice(oldPrice);
    setOldPrice(null);
    setSuccess(null);
    setLoading(true);
    setCoupon("");
  }

  const tryAgain = () => {
    setSuccess(null);
    setLoading(true);
    setCoupon('');
  }
  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);

  }, [cart]);

  return (
    <>
      {cart.length == 0 ? <><h1>Your cart is empty</h1></> :
        <div className='container-div'>
          <div className='items'>
            <div className='header'>
              <h3 style={{ paddingTop: '2%', paddingLeft: '2%', marginBottom: '3%' }}>Shopping Cart</h3>
            </div>

            <div className='added'>
              {cart.map((item) => {
                return (
                  <CartItem key={item.id} item={item} />
                )
              })
              }
            </div>
          </div>

          <div className='details-c'>
            <div className='detailsc'>

              <h4 style={{ textAlign: 'center', paddingTop: '5%' }}>Cart Summary</h4>
              <div style={{ textAlign: 'center', marginBottom: '5%', marginTop: '5%' }}>
                <span>Subtotal ({totalItems} items) : </span>
                <span style={{ fontWeight: 'bold' }}>₹ {totalPrice}</span>
              </div>

              <>

                {loading == true ? <div className='coupon'>
                  <TextField value={coupon} style={{ marginRight: '2%' }} id="standard-basic" variant= 'standard' label="Enter code" onChange={getText} />
                  <Button variant="outlined" size='small' style={{ color: "black" }} onClick={ApplyCoupon}>
                    Apply
                  </Button></div>

                  : <>

                    {
                      success == true ? <div className='smsg'>
                        <h4>Code applied !</h4>

                        <div className='revert'>
                          <Button onClick={revert} size='small' variant="contained" color="error"
                          >
                            Revert
                          </Button>
                        </div>
                      </div>

                        : <div className='fmsg'>
                          <h4>Not valid !</h4>
                          <div className='revert'>
                            <Button onClick={tryAgain} size='small' variant="contained" color="error"
                            >
                              Try Again
                            </Button>
                          </div>
                        </div>
                    }
                  </>
                }
              </>

              <div className='checkout'>
                <Button variant="contained" color="primary">
                  Proceed To Buy
                </Button>
              </div>

            </div>
          </div>

        </div>

      }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Cart);









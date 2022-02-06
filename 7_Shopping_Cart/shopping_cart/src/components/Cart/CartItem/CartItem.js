import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../redux/actions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import './CartItem.css';


function CartItem({ item, adjustQty, removeFromCart }) {
    const [input, setInput] = useState(item.qty);

    const onChangeHandler = (e) => {
        let val = Number(e.target.value);
        if (val > 0) {
            setInput(val);
            adjustQty(item.id, val);
        }
    }

    return (
        <>
            <hr />
            <div className='itemContainer'>
                <div className='imgc'>
                    <img src={item.image} alt={item.title} />
                </div>
                <div className='desc'>
                    <div className='itemName'>
                        <h3>{item.title}</h3>
                    </div>
                    <div className='itemQuantity'>
                        <label htmlFor='qty'>Qty</label>
                        <input
                            min="1"
                            id='qty'
                            type="number"
                            value={input}
                            name='qty'
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className='itemdesc'>
                        <p style={{ color: '#222f3e', fontFamily: 'cursive', textAlign: 'justify' }}>{item.description}</p>
                    </div>
                    <div className='pc'>
                        <Button variant="contained" color='error'
                            onClick={() => removeFromCart(item.id)}><DeleteIcon />Delete</Button>
                        <h3 style={{ marginTop: '1%', marginLeft: '4%' }}>₹ {item.price}</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        adjustQty: (id, qty) => {
            return dispatch({
                type: actionTypes.UPDATE_QTY,
                payload: { id: id, qty: qty }
            })
        },

        removeFromCart: (id) =>{
            return dispatch({
                type: actionTypes.REMOVE_FROM_CART,
                payload:{id:id}
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(CartItem);


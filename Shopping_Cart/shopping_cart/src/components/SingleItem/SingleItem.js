import React from 'react';
import { connect } from 'react-redux';
import "./SingleItem.css"
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import * as actionTypes from '../../redux/actions'

function SingleItem({ current, addToCart }) {
    // console.log(current)
    return (
        <div className='s-container'>
            <div className='img-container'>
                <img
                    className='img'
                    src={current.image}
                    alt={current.title}
                />
            </div>
            <div className='details'>
                <h1 className='p-name'>{current.title}</h1>
                <p style={{ color: '#d63031', marginBottom: '5%' }}><span style={{ color: 'grey' }}>M.R.P.</span>&nbsp; ₹ {current.price}</p>
                <h4 style={{ color: '#2d3436', marginBottom: '4%' }}>Description</h4>
                <p className='description'>{current.description}</p>

                <Button style={{ backgroundColor: '#e67e22', marginTop: '5%', color: "black" }}
                    onClick={() => { addToCart(current.id) }}
                >
                    <ShoppingCartOutlinedIcon />&nbsp; ADD TO CART
                </Button>

            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        current: state.currentItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => {
            return dispatch({
                type: actionTypes.ADD_TO_CART,
                payload: { id: id }
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);



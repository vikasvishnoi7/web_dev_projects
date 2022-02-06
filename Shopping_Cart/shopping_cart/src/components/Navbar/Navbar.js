import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// npm i @mui/styles @mui/material @emotion/react @emotion/styled
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import "./Navbar.css"
import { connect } from 'react-redux';

function Navbar({ cart }) {

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        let count = 0;

        cart.forEach((item) => {
            count += item.qty;
        })

        setCartCount(count);

    }, [cart, cartCount])

    return (
        <Box >
            <AppBar style={{ backgroundColor: '#badc58' }} position="static">
                <Toolbar style={{ position: "relative" }}>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: '#2f3542' }}>
                            Redux Shopping
                        </Link>
                    </Typography>

                    <Link to='/cart' style={{ color: '#2f3542' }}>
                        <Button color="inherit">Cart<ShoppingCartIcon style={{ marginLeft: '12%', marginRight: '1%' }} /><span className='cartNumber'>{cartCount}</span></Button>
                    </Link>

                </Toolbar>
            </AppBar>
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Navbar);







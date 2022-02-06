import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Product.css'
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

import * as actionTypes from '../../../redux/actions'
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginBottom: '5%'
    },
    midia: {
        height: "40vh"
    }
})

function Product({ product, loadCurrentItem, addToCart }) {

    const classes = useStyles();
    const navigate = useNavigate();

    const handleOnClick = () => {
        loadCurrentItem(product);
        // navigate("/product");
        navigate(`/product/${product.id}`);
    }

    return (
        <Card className={classes.root} >

            <CardMedia
                className={classes.midia}
                image={product.image}
                title={product.title}
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ height: '26vh' }}>
                    {product.description}
                </Typography>
                <br />
                <Typography variant="h5" align='center' color="textPrimary">
                    {product.price}&nbsp;₹
                </Typography>
            </CardContent>

            <CardActions className='cardActions'>
                <Button size="small" color="primary" onClick={handleOnClick}>View Item</Button>
                <Button size="small" color="primary" onClick={() => { addToCart(product.id) }}>Add to Cart</Button>
            </CardActions>

        </Card>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCurrentItem: (item) => {
            return dispatch({
                type: actionTypes.LOAD_CURRENT_ITEM,
                payload: { item: item }
            })
        },
        addToCart: (id) => {
            return dispatch({
                type: actionTypes.ADD_TO_CART,
                payload: { id: id }
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(Product);


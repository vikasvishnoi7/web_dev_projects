import React from 'react';
import { connect } from "react-redux"
import Product from "./Product/Product"
// import products from "./Products.module.css"
import "./Products.css"
function Products({ products}) {
    // console.log(props.products);
    return (
        <div className='products'>
            {products.map((product)=>(
                <Product key={product.id} product = {product}></Product>
            ))}
        </div>
        
    );
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    };
}
export default connect(mapStateToProps)(Products);



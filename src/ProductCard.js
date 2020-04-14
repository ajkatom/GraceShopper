import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <img className='center' src={product.imageUrl} height='200' width='200' />
      <div className='product-name'> {product.name} - ${product.price}</div>
    </Link>
  );

};

export default ProductCard;

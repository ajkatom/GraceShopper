import React from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';

const Category = ({ category, categoryProducts }) => {
  return (
    <div className='category'>
      <h1 className='category-head small-clip'>{category && category.name}</h1>
      <div className='category-products'>
        {categoryProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ categories, products }, { id }) => {
  const category =
    categories && categories.find(category => category.id === id);
  const categoryProducts =
    products && products.filter(product => product.categoryId === category.id);
  return { category, categoryProducts };
};

export default connect(mapStateToProps)(Category);

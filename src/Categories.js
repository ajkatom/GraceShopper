import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Categories = ({ categories }) => {
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {
          categories.map(category => {
            return (
              <li key={category.id}>
                <Link to={`/categories/${category.id}`}>
                  {category.name}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(Categories);

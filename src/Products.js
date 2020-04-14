import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from './Category';

class Products extends Component {
  componentDidMount() {
    let id;
    this.props.history.location.state &&
      (this.props.history.location.state.id
        ? ({ id } = this.props.history.location.state)
        : (id = this.props.history.location.state));
    id && document.getElementById(id).scrollIntoView();
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <div className='clip'>PRODUCTS</div>
        <div className='products'>
          <div className='products-grid'>
            {categories.map(category => (
              <div key={category.id} id={category.id}>
                <Category id={category.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(Products);

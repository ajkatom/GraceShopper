import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';

class ProductsDropdown extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onClick(id) {
    if (location.hash === '#/products') {
      const element = document.getElementById(id);
      element && element.scrollIntoView();
    }
  }

  render() {
    const { categories } = this.props;
    return (
      <Dropdown className='nav-link' isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className='remove-all' caret>
          Products
        </DropdownToggle>
        <DropdownMenu>
          {categories.map(category => {
            if (location.hash === '#/products') {
              return (
                <DropdownItem key={category.id} onClick={() => this.onClick(category.id)}>
                  {category.name}
                </DropdownItem>);
            }
            else {
              return (
                <Link key={category.id} className='remove-all' to={{ pathname: '/products', state: { id: category.id } }} >
                  <DropdownItem onClick={() => this.onClick(category.id)}>
                    {category.name}
                  </DropdownItem>
                </Link>
              );
            }
          })}
          <Link className='remove-all' to="/products"><DropdownItem>All</DropdownItem></Link>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(ProductsDropdown);

import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateProduct } from './redux/products';
import { connect } from 'react-redux';
import { RIEInput, RIETextArea, RIENumber } from 'riek';

let setErrors = function(err) {
  this.setState({ errors: err });
};

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: props.id || null,
        name: props.name || '',
        imageUrl: props.imageUrl || '',
        description: props.description || '',
        price: props.price || null,
        quantity: props.quantity || null,
        categoryId: props.categoryId || null,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setErrors = setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.categoryAssign = this.categoryAssign.bind(this);
  }
  clearErrors() {
    this.setState({ errors: '' });
  }

  onChange(value) {
    let { product } = this.state;
    product = Object.assign({}, product, value);
    this.setState({ product });
  }

  categoryAssign(ev) {
    let value = ev.target.value * 1;
    let key = ev.target.name;
    let { product } = this.state;
    product = Object.assign({}, product, { [key]: value });
    this.setState({ product });
  }

  onClick() {
    const { product } = this.state;
    this.props.createOrUpdateProduct(product);
    this.props.hide();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product) {
      const { id, name, imageUrl, description, price, quantity, categoryId } = nextProps.product;
      this.setState({
        product: {
          id,
          name,
          imageUrl,
          description,
          price,
          quantity,
          categoryId,
        },
      });
    } else {
      this.setState({
        product: {
          id: null,
          name: '',
          imageUrl: '',
          description: '',
          price: null,
          quantity: null,
          CategoryId: null,
        },
      });
    }
  }

  componentDidMount() {
    if (this.props.product) {
      const { id, name, imageUrl, description, price, quantity, categoryId } = this.props.product;
      this.setState({
        product: {
          id,
          name,
          imageUrl,
          description,
          price,
          quantity,
          categoryId,
        },
      });
    } else {
      this.setState({
        product: {
          id: null,
          name: '',
          imageUrl: '',
          description: '',
          price: null,
          quantity: null,
          CategoryId: null,
        },
      });
    }
  }

  render() {
    const { name, imageUrl, description, price, quantity, errors, categoryId } = this.state.product;
    const { onChange, onClick } = this;
    const { categories } = this.props;
    return (
      <div>
        {errors ? (
          <Alert color="info" isOpen={!!errors} toggle={this.clearErrors}>
            {errors}
          </Alert>
        ) : null}
        <form>
          <div>Click fields to edit.</div>
          <div>
            <label>
              <b>product name</b>
            </label>
            <br />
            <RIEInput value={name || 'shampoo'} change={onChange} propName="name" />
          </div>
          <div>
            <br />
            <label>
              <b>Image Link</b>
            </label>
            <br />
            <RIEInput value={imageUrl || './image'} change={onChange} propName="imageUrl" />
          </div>
          <div>
            <br />
            <label>
              <b>Description</b>
            </label>
            <br />
            <RIETextArea value={description || 'soft'} change={onChange} propName="description" />
          </div>
          <div>
            <br />
            <label>
              <b>Price</b>
            </label>
            <br />
            <RIENumber value={price || '100'} change={onChange} propName="price" />
          </div>
          <div>
            <br />
            <label>
              <b>Quantity</b>
            </label>
            <br />
            <RIENumber value={quantity || '100'} change={onChange} propName="quantity" />
          </div>
          <select name="categoryId" value={categoryId || '-1'} onChange={this.categoryAssign}>
            {categories &&
              categories.map(category => (
                <option key={category.id} name="categoryId" value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </form>
        <button type="submit" onClick={onClick}>
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ products, categories }, { productId }) => {
  let product = products && products.find(product => product.id === productId);
  return {
    product,
    categories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateProduct: product => {
      dispatch(createOrUpdateProduct(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);

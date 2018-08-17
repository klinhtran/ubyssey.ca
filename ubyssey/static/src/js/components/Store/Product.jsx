import React from 'react'
import SelectInput from './SelectInput.jsx';

const size = [
  'small',
  'med',
  'lg'
]

class Product extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      quantity: 1,
      size: 'small'
    }
  }

  updateInputs(event) {
    console.log(event.target.name)
    console.log(this)
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }

  addToCart() {
    const product = this.props.data
    let newItem = simpleCart.add({
      name: product.name,
      quantity: this.state.quantity,
      size: this.state.size,
      price: product.price,
      description: product.description,
      imageURL: product.image.image.url_thumb
    })

    this.props.showCart()

    console.log(newItem)
  }

  render() {
    const product = this.props.data
    const productImage = { backgroundImage: 'url(' + product.image.image.url + ')'}
    return (
      <div className='c-product-wrapper'>
        <div className='left'>
          <div className='c-product-image' style={productImage} />
        </div>
        <div className='right'>
          <div className='simpleCart_shelfItem'>
            <h1 className="item_name">{product.name}</h1>
            <span className="item_price"><h2>${product.price}</h2></span>
            <p>{product.description}</p>
            <div className='flex-row'>
              {/* { this.props.data.size && <SelectInput title='Size' data={this.props.data.size}/> } */}
              <SelectInput title='Size' data={size}/>

              <label htmlFor='item_quantity'><h3>Quantity</h3></label>
              <input
                id='item_quantity'
                name='quantity'
                type="number"
                value={this.state.quantity}
                onChange={this.updateInputs}
                className="item_quantity" />
            </div>
            <div className='flex-row'>
              <div className="c-button-dark" onClick={() => {this.addToCart()}}> <i className="fa fa-shopping-cart"></i> Add to Cart </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Product

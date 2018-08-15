import React from 'react'
import { Link } from 'react-router-dom'

class Product extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      quantity: 1,
      size: null,
    }
  } 

  updateQuantity(e) {
    console.log(e)
  }

  render() {
    const product = this.props.data
    return (
      <div className='c-store-product-wrapper__full'>
        <Link
          to='/'
          className='c-button c-button--small'>
          Continute Shopping </ Link>
        <div className="simpleCart_shelfItem">
          <h2 className="item_name">{product.name}</h2>
          <input 
            type="number" 
            value={this.state.quantity} 
            onChange={this.updateQuantity} 
            className="item_Quantity" />
          <span className="item_price">{product.price}</span>
          <a className="item_add c-button c-button-small" href="javascript:;"> Add to Cart </a>
        </div>
        <Link
          to={'/cart/' + String(this.props.match.params.value)} 
          className='c-button-outline c-button--small'>
          View Cart </Link>
      </div>
    )
  }
}

export default Product
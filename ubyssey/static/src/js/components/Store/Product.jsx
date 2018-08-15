import React from 'react'
import { Link } from 'react-router-dom'

class Product extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      quantity: 1,
      size: 'medium',
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

  render() {
    const product = this.props.data
    const image = this.props.data.image_url
    return (
      <div className='c-product-wrapper'>
        <Link
          to='/'
          className='c-button c-button--small'>
          Continute Shopping </ Link>
        <div className='left'>
        </div>
        <div className='right'>
          <div className='simpleCart_shelfItem'>
            <h2 className="item_name">{product.name}</h2>

            <label htmlFor='item_size'>Size</label>
            <select 
              name='size' 
              id='item_size' 
              value={this.state.size} 
              onChange={this.updateInputs}>
                <option value="small">Sm</option>
                <option value="medium">Md</option>
                <option value="large">Lg</option>
                <option value="x-large">Xl</option>
            </select>
            
            <label htmlFor='item_quantity'>Quantity</label>
            <input 
              id='item_quantity'
              name='quantity'
              type="number" 
              value={this.state.quantity} 
              onChange={this.updateInputs} 
              className="item_Quantity" />

            <span className="item_price">{product.price}</span>
            <a className="item_add c-button c-button-small" href="javascript:;"> Add to Cart </a>
            <Link
              to={'/cart/' + String(this.props.match.params.value)} 
              className='c-button-outline c-button--small'>
              View Cart </Link>
          </div>

        </div>
      </div>
    )
  }
}

export default Product
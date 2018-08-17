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
    console.log('this.props', this.props)
    const product = this.props.data
    const productImage = { backgroundImage: 'url(' + this.props.data.image.image.url + ')'}
    return (
      <div className='c-product-wrapper'>
        <div className='left'>
          <div className='c-product-image' style={productImage} />
        </div>
        <div className='right'>
          <div className='simpleCart_shelfItem'>
            <h2 className="item_name">{product.name}</h2>
            <div className='flex'>
              <div className='left flex-column'>
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

              <div className='right flex-column'>
                <span className="item_price">{product.price}</span>
                <a className="item_add c-button c-button-small" href="javascript:;"> <i className="fa fa-shopping-cart"></i> Add to Cart </a>
              </div>
              </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Product

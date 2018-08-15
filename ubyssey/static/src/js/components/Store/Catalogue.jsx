import React from 'react'
import { Link } from 'react-router-dom'

const getAbsoluteURL = (imageURL) => {
  let URL = window.location.origin
  imageURL = imageURL ? imageURL : '../images/ubyssey-snapchat-code.png'
  return URL.concat(imageURL)
}

const renderProduct = (product, index) => {
  const productImage = {
    backgroundImage: 'url(' + getAbsoluteURL(product.image_url) + ')',
  }
  return (
    <Link 
      to={'/product/' + String(index)} 
      key={index}
      className='c-product__catalogue-wrapper'>
      <div className='c-product__catalogue-container'>
        <div className='c-product__catalogue-image' style={productImage}/>
        <div className='c-product__catalogue-content' >
          <span>{product.title}</span>
          <span>{product.price}</span>
        </div>
      </div>
    </Link>
  )
}


const Catalogue = (props) => {
  return (
    <div className='c-catalogue-wrapper'>
      { props.products &&
        props.products.map((data, index) => {
          return renderProduct(data, index)
        })
      }
    </div>
  )
}

export default Catalogue

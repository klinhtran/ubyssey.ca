import React, { Component } from 'react'
import DispatchAPI from '../api/dispatch'

class ArticlePreview extends Component{

  goToArticle() {
    DispatchAPI.articles.suggested(this.props.articleId, this.props.currentArticleId)

    window.location = this.props.url
  }

  render() {
    const msec = Date.parse(this.props.publishTime)
    const publishedDate = new Date(msec)
    return (
      <div
        onClick={() => {this.goToArticle()}}
        id={'suggested-article-' + String(this.props.articleId)}
        className='article-preview'>
          <div className='sa-content'>
            {this.props.featuredImageUrl && 
              <div
                className='sa-thumbnail-image'
                style={{backgroundImage: 'url(' + this.props.featuredImageUrl + ')'}}></div>
            }
            {!this.props.featuredImageUrl && 
              <div className='sa-thumbnail-image'>
                No image
              </div>
            }
            <h3>{this.props.headline}</h3>
          </div>
          <div className='sa-subtitle'>
            <span className='sa-date'>{publishedDate.toDateString().slice(4)}</span>
            <span className='sa-author'><em>{this.props.authors[0]}</em></span>
          </div>
      </div>
    )
  }
}

export default ArticlePreview;
import React, { Component } from 'react'
import DispatchAPI from '../api/dispatch'

class ArticlePreview extends Component{

  goToArticle() {
    const payload = {
      'article_id' : this.props.articleId
    }
    DispatchAPI.articles.suggested(this.props.currentArticleId, payload)

    window.location = this.props.url
  }

  renderWithFeature() {
    return <div className='sa-thumbnail-image' style={{backgroundImage: 'url(' + this.props.featuredImageUrl + ')'}}/>
  }

  renderNoFeature() {
    return <div className='sa-thumbnail-image'>No image</div>
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
            {this.props.featuredImageUrl ? this.renderWithFeature() : this.renderNoFeature()}
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

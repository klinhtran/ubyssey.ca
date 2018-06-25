
import React, { Component } from 'react'
import ArticlePreview from './ArticlePreview.jsx'
import DispatchAPI from '../api/dispatch'

class ArticlesSuggested extends Component{
  constructor(props) {
    super(props)

    var articles = props.articles
    articles.unshift(props.currentArticle.id)

    this.state = {
      articles: [props.currentArticle],
    }
  }

  componentDidMount() {
    for (let id of this.props.articles) {
      this.getArticle(id)
    }
  }

  getArticle(id) {
    DispatchAPI.articles.rendered(id)
    .then ( (response) => {
      const articles = [...this.state.articles, response]
      this.setState({articles})
    })
  }

  render() {
    const articles = this.state.articles.map((article, index) => {
      // only show 3 suggested articles
      if (index !== 0 && article.headline !== this.props.currentArticle.headline) {
        return (
          <ArticlePreview 
            currentArticleId={this.props.currentArticle.id}
            articleId={article.id}
            headline={article.headline}
            url={article.url}
            authors={article.authors}
            publishTime={article.published_at}
            featuredImageUrl={article.featured_image}
            key={index} />
        )
      }
    });

    return (
      <div className='sa-container-outer'>
        <div className='u-container'>
          <h2 className='block-title'>Suggested Articles</h2>
          <div className={'sa-container-inner'}>
            {articles.filter((article) => {if (article) {return article}}).slice(0, 3)}
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesSuggested;

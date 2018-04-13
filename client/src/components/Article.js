import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './style.css';

class Article extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ListGroup componentClass="ul" className="Articles" key="article">
        {
          this.props.articles.map((item, index) => <ListGroupItem componentClass="li" key={index}><a href={item.link}>{item.title}</a></ListGroupItem>)
        }
      </ListGroup>
    )
  }
}

export default Article;

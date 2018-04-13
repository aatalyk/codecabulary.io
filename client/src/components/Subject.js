import React, { Component } from 'react';
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import './style.css';
import { API } from '../actions/types';

const Article = props => {
  return(
      <ListGroup componentClass="ul" className="Articles" key="article">

        {
          props.articles.map((item, index) => <ListGroupItem componentClass="li" key={index}><a href={item.link}>{item.title}</a></ListGroupItem>)
        }
      </ListGroup>
  )
}

class Subject extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    fetch(API + '/api/subjects/' + this.props.match.params.subject_name)
      .then(response => {
        response.json()
          .then(data => {
            console.log(data);
            this.setState({
              articles: data
            })
          })
      })
  }

  render() {
    return (
      <div>
        <h1 class="Title">
          {this.props.match.params.subject_name}
        </h1>
        <hr className="Subject"/>
        <Article articles={this.state.articles}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    letter: state.letter
  };
};

export default Subject;

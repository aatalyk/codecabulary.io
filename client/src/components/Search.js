import React, {Component} from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import Article from './Article.js';
import { API } from '../actions/types';

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }

    this.searchArticlesOnChange = this.searchArticlesOnChange.bind(this)
  }

  searchArticlesOnChange = (e) => {
    e.preventDefault();
    var text = e.target.value;
    if(!text) {
      return;
    }
    fetch(API + '/api/subject/' + e.target.value, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
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
      <div className="Search">
        <form onSubmit={this.searchArticlesOnChange}>
          <FormGroup controlId="formBasicText">
            <FormControl
              type="text"
              label="Text"
              placeholder="e.g. ReactJS"
              onChange={this.searchArticlesOnChange}
            className="SearchInput"/>
            <Button className="SearchButton"><i className="fa fa-search"></i></Button>
          </FormGroup>
        </form>
        <Article articles={this.state.articles}/>
      </div>
    )
  }
}

export default Search;

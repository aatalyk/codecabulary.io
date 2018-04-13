import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Alert } from 'react-bootstrap';
import './style.css';
import { API } from '../actions/types';

class Write extends Component {

  constructor() {
    super()
    this.state = {
      isSent: false
    }
  }

  writeArticle = () => {
    if(!this.subjectInput.value || !this.titleInput.value) {
      return;
    }
    fetch(API + '/api/write', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify ({
        subject: this.subjectInput.value,
        title: this.titleInput.value
      })
    })
    .then(response => {
      if(response.ok) {
        console.log('ok');
        this.setState({
          isSent: true
        })
      }
    })
  };

  render() {
    return (
      <div className="Write">
        <form>
          <FormGroup
            controlId="formBasicText">
            <FormControl
              id="formControlsText"
              type="text"
              label="Text"
              placeholder="e.g. Algorithms"
              onChange={this.searchArticlesOnChange}
              className="title"
              inputRef={ref => { this.subjectInput = ref;}}
            />
            <Button bsStyle="success" className="SubmitButton" onClick={this.writeArticle}>Submit</Button>
            <FormControl
              componentClass="textarea"
              placeholder="e.g. Node with React: Full-Stack Web Development"
              className="linkarea"
              inputRef={ref => { this.titleInput = ref;}}
            />
          </FormGroup>
        </form>
      </div>
    )
  }
}

export default Write;

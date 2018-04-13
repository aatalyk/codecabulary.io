import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Alert, Modal } from 'react-bootstrap';
import './style.css';
import { API } from '../actions/types';

class Write extends Component {

  constructor() {
    super()

    this.handleHide = this.handleHide.bind(this);

    this.state = {
      isSent: false,
      show: false
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
        this.setState({
          isSent: true,
          show: true
        })
      }
    })
  };

  handleHide() {
    this.setState({
      isSent: false,
      show: false
    });
  }

  render() {
    return (
      <div className="Write">
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              It's on its way 🚲
            </Modal.Title>
          </Modal.Header>
        </Modal>
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

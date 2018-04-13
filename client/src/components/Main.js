import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';
import { ClimbingBoxLoader } from 'react-spinners';
import { API } from '../actions/types';

const aplhabet = ['A', 'B']

const Letter = props => {
  return (
    <ListGroup componentClass="ul" className="letter">
      {
        props.list.map(([key, value]) => <Subject letter={key} item={value}/>)
      }
    </ListGroup>
  )
}

const Subject = props => {
  return (
    <ListGroupItem componentClass="li" className="letter" key={props.item.index}>
      {props.letter}
      <hr/>
      <ListGroup componentClass="ul" className="subject">
        {
          props.item.map((item, index) => {
            return <Link to={`/subjects/${item.name}`} className="subject"><ListGroupItem componentClass="li" key={item.index}>{item.name}</ListGroupItem></Link>
          })
        }
      </ListGroup>
    </ListGroupItem>
  )
}

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      subjects: {},
      loading: true
    }
  }

  componentDidMount() {
    fetch(API + '/api/subjects')
      .then(response => {
        response.json()
          .then(data => {
            this.mapArray(data)
          })
      })
  }

  mapArray(subjects) {
    var map = {}
    for(var i = 0; i<subjects.length; i++) {
      var letter = subjects[i].name.charAt(0).toUpperCase()
      if(!map[letter]) {
        map[letter] = []
      }
      map[letter].push({name: subjects[i].name, index: i})
    }
    this.setState({
      subjects: map,
      loading: false
    })
  }

  render() {
    let subjects = Object.entries(this.state.subjects)
    return (
      <div className="Main">
        <ClimbingBoxLoader
          color={'#f1c40f'}
          loading={this.state.loading}
        />
        <Letter list={subjects}/>
      </div>
    )
  }
}

export default Main;

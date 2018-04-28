import React, { Component } from 'react';
import { Navbar, Nav, NavItem, OverlayTrigger, Tooltip, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';
import ReactDOM from 'react-dom';
import codecabulary from '../images/codecabulary.svg';
import logo from '../images/logo.png';
import { API } from '../actions/types';

class Header extends Component {

  constructor() {
    super()

    this.getTarget = this.getTarget.bind(this);

    this.state = {
      claps: '1',
      show: true
    }
  }

  componentDidMount() {
    this.refs.overlayTrigger.show();
    this.countClaps();
  }

  countClaps = () => {
    fetch(API + '/api/count_claps')
      .then(response => {
        response.json()
          .then(data => {
            if(data[0]['exact_count']) {
              this.setState({
                claps: `${data[0]['exact_count']}`
              })
            }
          })
      })
  }

  updateClaps = () => {
    fetch(API + '/api/clap', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: {},
    })
    .then(response => {
      if(response.ok) {
        this.countClaps()
      }
    })
  };

  getTarget() {
    return ReactDOM.findDOMNode(this.target)
  }

  render() {

    return(
      <div className="Header">
        <Navbar fluid>
          <Navbar.Header>
            <Link to={"/"} className="codecabulary"><Image src={codecabulary} responsive/></Link>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={2} href="/search" componentClass={Link} to="/search"> Search </NavItem>
              <NavItem eventKey={3} href="/write" componentClass={Link} to="/write"> Write </NavItem>
              <NavItem eventKey={1} href="https://github.com/aatalyk"> Developer </NavItem>
              <NavItem eventKey={1} onClick={this.updateClaps} href="#">
                <OverlayTrigger placement="right" ref="overlayTrigger" trigger={null} overlay={<Tooltip placement="right" className="in" id="tooltip-right"><strong>{this.state.claps}</strong></Tooltip>}>
                  <p className="like"><i className="fa fa-star" ref={item => {this.target = item;}}></i></p>
                </OverlayTrigger>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header;

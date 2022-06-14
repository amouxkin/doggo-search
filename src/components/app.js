import React from 'react'
import { Col, Row } from 'antd'
import doggoImage from '../images/doggo.jpg'
import '../stylesheets/app.css'

function App () {
  return (
    <div className="app">
      <nav>
        <Row>
          <Col>
            <img src={doggoImage} width="64" alt=""/>
          </Col>
          <Col>
            <h1>Doggo Search</h1>
          </Col>
          <Col flex={'auto'}/>
          <Col>
            <Row align={'bottom'}>
              <a>Search</a>
              <a>My Saved Dogs</a>
            </Row>
          </Col>
        </Row>
      </nav>
      <p>All great things have small beginnings.</p>
    </div>
  )
}

export default App

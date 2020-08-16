import React from 'react';
import './App.css';
import NavBar from './components/Header-Footer/NavBar.jsx';
import {Container, Row, Col} from 'react-bootstrap';
import Welcome from './components/Header-Footer/Welcome';
import Footer from './components/Header-Footer/Footer';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const marginTop = {
    marginTop:"20px"
  };
  return (
    <Router>
      <NavBar/>
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
          <Switch>
            <Route path="/" exact component={Welcome}/>
            <Route path="/list" exact component={EmployeeList}/>
            <Route path="/edit/:id" exact component={AddEmployee}/>
            <Route path="/add" exact component={AddEmployee}/>
          </Switch>
          </Col>
        </Row>
        </Container>
        <Footer/>
     
    </Router>
  );
}

export default App;
